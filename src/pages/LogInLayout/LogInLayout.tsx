import React from 'react';
//component
import AuthForm from '../../components/custom/AuthForm/AuthForm';
import SignInUpform from '../../containers/SignInUpform/SignInUpform';
//styles
import styles from './LogInLayout.less';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../redux/slice';
import { Redirect } from 'react-router-dom';
import { RootState } from '../../redux/store';
//interfaces
import { LoginI } from './interfaces';

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
