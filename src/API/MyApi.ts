import { signInApi } from './SignInApi/SignInApi';
import { signUpApi } from './SignUpApi/SignUpApi';
import { logOutApi } from './LogOutApi/LogOutApi';
import { sendToDatabaseApi } from './sendToDatabaseApi/sendToDatabaseApi';

const MyApi = {
    signInApi,
    signUpApi,
    logOutApi,
    sendToDatabaseApi,
};

export default MyApi;
