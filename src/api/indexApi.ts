import { signInApi } from './signInApi/signInApi';
import { signUpApi } from './signUpApi/signUpApi';
import { logOutApi } from './logOutApi/logOutApi';
import { sendToDatabaseApi } from './sendToDatabaseApi/sendToDatabaseApi';
import { fetchUserDataFromBaseApi } from './fetchUserDataFromBaseApi/fetchUserDataFromBaseApi';
import { currentUserApi } from './currentUserApi/currentUserApi';
import { fetchListOfProjectsApi } from './fetchListOfProjectsApi/fetchListOfProjectsApi';
import { fetchListOfAdminsApi } from './fetchListOfAdminsApi/fetchListOfAdminsApi';
import { fetchListOfAssigneeApi } from './fetchListOfAssigneeApi/fetchListOfAssigneeApi';

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
};

export default indexApi;
