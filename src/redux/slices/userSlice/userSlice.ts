import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../../initialState';
import deepCopy from '../../../utils/deepCopy';
import { deleteProject } from '../async/deleteProject';
import { addNewAssignee } from '../async/addNewAssignee';
import { refreshBoardPage } from '../async/refreshBoardPage';
import { onLoadPage } from '../async/onLoadPage';
import { signIn } from '../async/signIn';
import { signUp } from '../async/signUp';
import { logOut } from '../async/logOut';

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
        builder.addCase(refreshBoardPage.fulfilled, (state, action) => {
            const tempState = deepCopy(state);
            const key = action.payload !== undefined && Object.keys(action.payload)[0];
            if (key) tempState.listOfProjects[key] = [{}];
            return tempState;
        });
        builder.addCase(addNewAssignee.fulfilled, (state, action) => {
            const tempState = deepCopy(state);
            tempState.assignee[action.payload.email] = action.payload.name;
            return tempState;
        });
        builder.addCase(deleteProject.fulfilled, (state, action) => {
            const tempState = deepCopy(state);
            delete tempState.listOfProjects[action.payload];
            return tempState;
        });
    },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
