import { signInApi } from './signInApi/signInApi';
import { signUpApi } from './signUpApi/signUpApi';
import { logOutApi } from './logOutApi/logOutApi';
import { sendToDatabaseApi } from './sendToDatabaseApi/sendToDatabaseApi';
import { fetchUserDataFromBaseApi } from './fetchUserDataFromBaseApi/fetchUserDataFromBaseApi';
import { currentUserApi } from './currentUserApi/currentUserApi';
import { fetchListOfProjectsApi } from './fetchListOfProjectsApi/fetchListOfProjectsApi';
import { fetchListOfAdminsApi } from './fetchListOfAdminsApi/fetchListOfAdminsApi';
import { fetchListOfAssigneeApi } from './fetchListOfAssigneeApi/fetchListOfAssigneeApi';
import { newAssigneeToDBApi } from './newAssigneeToDBApi/newAssigneeToDBApi';
import { deleteProjectFromDBApi } from './deleteProjectFromDBApi/deleteProjectFromDBApi';

const indexApi = {
    signInApi,
    signUpApi,
    logOutApi,
    sendToDatabaseApi,
    fetchUserDataFromBaseApi,
    currentUserApi,
    fetchListOfProjectsApi,
    fetchListOfAdminsApi,
    fetchListOfAssigneeApi,
    newAssigneeToDBApi,
    deleteProjectFromDBApi,
};

export default indexApi;
