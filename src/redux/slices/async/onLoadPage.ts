import { createAsyncThunk } from '@reduxjs/toolkit';
import { BoardI } from '../../interfaces';
import indexApi from '../../../api/indexApi';
import replacer from '../../../utils/replacer';

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
