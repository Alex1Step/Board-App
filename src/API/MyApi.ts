import { signInApi } from './SignInApi/SignInApi';
import { signUpApi } from './SignUpApi/SignUpApi';
import { logOutApi } from './LogOutApi/LogOutApi';
import { sendToDatabaseApi } from './SendToDatabaseApi/sendToDatabaseApi';
import { fetchUserDataFromBaseApi } from './fetchUserDataFromBaseApi/fetchUserDataFromBaseApi';
import { currentUserApi } from './currentUserApi/currentUserApi';

const MyApi = {
    signInApi,
    signUpApi,
    logOutApi,
    sendToDatabaseApi,
    fetchUserDataFromBaseApi,
    currentUserApi,
};

export default MyApi;
