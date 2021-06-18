import React from 'react';
import styles from './RegLayout.less';
import AuthForm from '../../components/custom/AuthForm/AuthForm';
import { useDispatch } from 'react-redux';
import { signUp } from '../../redux/slice';
import firebase from 'firebase';

interface LoginI {
    password: string;
    username: string;
}

const RegLayout: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    //REGISTER handler
    const onFinish = (values: LoginI) => {
        dispatch(signUp(values));
    };

    return (
        <section className={styles.RegLayout}>
            <h1>Let`s register!</h1>
            <AuthForm handler={onFinish} textOnButton={'Sign Up'} />
        </section>
    );
};

export default RegLayout;
