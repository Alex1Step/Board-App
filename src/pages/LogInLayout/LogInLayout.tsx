import React from 'react';
import AuthForm from '../../components/custom/AuthForm/AuthForm';
import styles from './LogInLayout.less';
import { useDispatch } from 'react-redux';
import { signIn } from '../../redux/slice';
import { useHistory } from 'react-router-dom';
import SignInUpform from '../../containers/SignInUpform/SignInUpform';

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
            <SignInUpform>
                <h1>Welcome back!</h1>
                <AuthForm handler={onFinish} textOnButton={'Sign In'} />
            </SignInUpform>
        </section>
    );
};

export default LogInLayout;
