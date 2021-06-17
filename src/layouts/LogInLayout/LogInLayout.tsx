import React from 'react';
import AuthForm from '../../components/AuthForm/AuthForm';
import styles from './LogInLayout.less';
import { useDispatch } from 'react-redux';
import { succesLogIn } from '../../redux/slice';
import firebase from 'firebase';

interface LoginI {
    password: string;
    username: string;
}

const LogInLayout: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    //LogIn handler
    const onFinish = (values: LoginI) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(values.username, values.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('SUCCES');
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    return (
        <section className={styles.LogInLayout}>
            <h1>Welcome!</h1>
            <AuthForm handler={onFinish} textOnButton={'Sign In'} />
        </section>
    );
};

export default LogInLayout;
