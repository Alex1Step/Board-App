import { signInApi } from './signInApi/signInApi';
import { signUpApi } from './signUpApi/signUpApi';
import { logOutApi } from './logOutApi/logOutApi';
import { sendToDatabaseApi } from './sendToDatabaseApi/sendToDatabaseApi';
import { fetchUserDataFromBaseApi } from './fetchUserDataFromBaseApi/fetchUserDataFromBaseApi';
import { currentUserApi } from './currentUserApi/currentUserApi';

const indexApi = {
    signInApi,
    signUpApi,
    logOutApi,
    sendToDatabaseApi,
    fetchUserDataFromBaseApi,
    currentUserApi,
};

export default indexApi;
