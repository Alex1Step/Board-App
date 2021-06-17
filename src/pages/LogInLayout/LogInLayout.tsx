import React from 'react';
import AuthForm from '../../components/custom/AuthForm/AuthForm';
import styles from './LogInLayout.less';
import { useDispatch } from 'react-redux';
import { signIn } from '../../redux/slice';
import firebase from 'firebase';

export interface LoginI {
    password: string;
    username: string;
}

const LogInLayout: React.FunctionComponent = () => {
    const dispatch = useDispatch();

    //LogIn handler
    const onFinish = (values: LoginI) => {
        dispatch(signIn(values));
    };

    return (
        <section className={styles.LogInLayout}>
            <h1>Welcome!</h1>
            <AuthForm handler={onFinish} textOnButton={'Sign In'} />
        </section>
    );
};

export default LogInLayout;
