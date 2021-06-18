import { signInApi } from './SignInApi/SignInApi';
import { signUpApi } from './SignUpApi/SignUpApi';
import { logOutApi } from './LogOutApi/LogOutApi';
import { sendToDatabaseApi } from './SendToDatabaseApi/sendToDatabaseApi';
import { fetchUserDataFromBaseApi } from './fetchUserDataFromBaseApi/fetchUserDataFromBaseApi';

const MyApi = {
    signInApi,
    signUpApi,
    logOutApi,
    sendToDatabaseApi,
    fetchUserDataFromBaseApi,
};

export default MyApi;
