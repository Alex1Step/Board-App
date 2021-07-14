import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAssignee } from '../../../containers/AdminPanel/interfaces';
import indexApi from '../../../api/indexApi';
import replacer from '../../../utils/replacer';

export const addNewAssignee = createAsyncThunk('user/addNewAssignee', async (user: IAssignee) => {
    const changedAssignee = {
        email: replacer(user.email),
        name: user.name,
    };
    indexApi.newAssigneeToDBApi(changedAssignee);
    return changedAssignee;
});
