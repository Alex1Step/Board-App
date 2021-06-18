import React from 'react';
import AuthForm from '../../components/custom/AuthForm/AuthForm';
import styles from './LogInLayout.less';
import { useDispatch } from 'react-redux';
import { signIn } from '../../redux/slice';
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';

export interface LoginI {
    password: string;
    username: string;
}

const LogInLayout: React.FunctionComponent = () => {
    const dispatch = useDispatch();

    const history = useHistory();

    //LogIn handler
    const onFinish = (values: LoginI) => {
        dispatch(signIn(values));
        history.push('/boards');
    };

    return (
        <section className={styles.LogInLayout}>
            <h1>Welcome!</h1>
            <AuthForm handler={onFinish} textOnButton={'Sign In'} />
        </section>
    );
};

export default LogInLayout;
