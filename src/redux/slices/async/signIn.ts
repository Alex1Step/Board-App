import { createAsyncThunk } from '@reduxjs/toolkit';
import { BoardI } from '../../interfaces';
import { LoginI } from '../../../pages/LogInLayout/interfaces';
import indexApi from '../../../api/indexApi';
import replacer from '../../../utils/replacer';

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
