import React from 'react';
import AuthForm from '../../components/custom/AuthForm/AuthForm';
import styles from './LogInLayout.less';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../redux/slice';
import { Redirect } from 'react-router-dom';
import SignInUpform from '../../containers/SignInUpform/SignInUpform';
import { RootState } from '../../redux/store';

export interface LoginI {
    password: string;
    username: string;
}

const LogInLayout: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const user: string = useSelector((state: RootState) => state.globalReducer.userName);

    //LogIn handler
    const onFinish = (values: LoginI) => {
        dispatch(signIn(values));
    };

    return user === '' ? (
        <section className={styles.LogInLayout}>
            <SignInUpform>
                <h1>Welcome back!</h1>
                <AuthForm handler={onFinish} textOnButton={'Sign In'} />
            </SignInUpform>
        </section>
    ) : (
        <Redirect to={'/boards'} />
    );
};

export default LogInLayout;
