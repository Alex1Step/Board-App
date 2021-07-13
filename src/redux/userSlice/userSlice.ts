import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { BoardI } from '../interfaces';
import { LoginI } from '../../pages/LogInLayout/interfaces';
import { IAssignee } from '../../containers/AdminPanel/interfaces';
import { initialState } from '../initialState';
import indexApi from '../../api/indexApi';
import deepCopy from '../../utils/deepCopy';
import replacer from '../../utils/replacer';

export const addNewAssignee = createAsyncThunk('user/addNewAssignee', async (user: IAssignee) => {
    const changedAssignee = {
        email: replacer(user.email),
        name: user.name,
    };
    indexApi.newAssigneeToDBApi(changedAssignee);
    return changedAssignee;
});

export const refreshBoardPage = createAsyncThunk<void, string, { state: RootState }>(
    'user/refreshPage',
    async (user: string, thunkApi) => {
        indexApi.sendToDatabaseApi(
            thunkApi.getState().userReducer.boards,
            thunkApi.getState().userReducer.currentProject,
        );
    },
);

export const onLoadPage = createAsyncThunk(
    'user/pageLoad',
    async (setData: React.Dispatch<React.SetStateAction<boolean>>) => {
        const user = localStorage.getItem('user');
        let listOfProjects: { [key: string]: BoardI[] } = {};
        let listOfAssignee: { [key: string]: string } = {};
        let isAdmin = false;
        let userName = '';
        if (user) {
            userName = user;
            listOfProjects = await indexApi.fetchListOfProjectsApi();
            listOfAssignee = await indexApi.fetchListOfAssigneeApi();
            const admins = await indexApi.fetchListOfAdminsApi();
            if (replacer(user) in admins) isAdmin = true;
        }
        setData(true);
        return { listOfProjects, listOfAssignee, isAdmin, userName };
    },
);

export const signIn = createAsyncThunk('user/signIn', async (userData: LoginI) => {
    let listOfProjects: { [key: string]: BoardI[] } = {};
    let listOfAssignee: { [key: string]: string } = {};
    let isAdmin = false;
    const userName = userData.username;
    const response = await indexApi.signInApi(userData.username, userData.password);
    if (response) {
        listOfProjects = await indexApi.fetchListOfProjectsApi();
        listOfAssignee = await indexApi.fetchListOfAssigneeApi();
        const admins = await indexApi.fetchListOfAdminsApi();
        if (replacer(userData.username) in admins) isAdmin = true;
    }
    return { listOfProjects, isAdmin, userName, listOfAssignee };
});

export const signUp = createAsyncThunk('user/signUp', async (userData: LoginI) => {
    let listOfProjects: { [key: string]: BoardI[] } = {};
    let isAdmin = false;
    const userName = userData.username;
    const response = await indexApi.signUpApi(userData.username, userData.password);
    if (response) {
        listOfProjects = await indexApi.fetchListOfProjectsApi();
        const admins = await indexApi.fetchListOfAdminsApi();
        if (replacer(userData.username) in admins) isAdmin = true;
    }
    return { listOfProjects, isAdmin, userName };
});

export const logOut = createAsyncThunk<void, string, { state: RootState }>(
    'user/logOut',
    async (user: string, thunkApi) => {
        indexApi.sendToDatabaseApi(
            thunkApi.getState().userReducer.boards,
            thunkApi.getState().userReducer.currentProject,
        );
        indexApi.logOutApi();
    },
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.listOfProjects = action.payload.listOfProjects;
            state.assignee = action.payload.listOfAssignee;
            state.isAdmin = action.payload.isAdmin;
            state.userName = action.payload.userName;
        });
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.listOfProjects = action.payload.listOfProjects;
            state.isAdmin = action.payload.isAdmin;
            state.userName = action.payload.userName;
        });
        builder.addCase(logOut.fulfilled, () => {
            return initialState;
        });
        builder.addCase(onLoadPage.fulfilled, (state, action) => {
            state.listOfProjects = action.payload.listOfProjects;
            state.assignee = action.payload.listOfAssignee;
            state.isAdmin = action.payload.isAdmin;
            state.userName = action.payload.userName;
        });
        builder.addCase(refreshBoardPage.fulfilled, (state) => {
            return state;
        });
        builder.addCase(addNewAssignee.fulfilled, (state, action) => {
            const tempState = deepCopy(state);
            console.log(tempState);
            tempState.assignee[action.payload.email] = action.payload.name;
            return tempState;
        });
    },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
