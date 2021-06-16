import React from 'react';
import AuthForm from '../../components/AuthForm/AuthForm';
import styles from './LogInLayout.less';
import { useDispatch } from 'react-redux';
import { succesLogIn } from '../../redux/slice';
import firebase from 'firebase';

// import { Button } from 'antd';

interface LoginI {
    password: string;
    username: string;
}

const LogInLayout: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    //LogIn handler
    const onFinish = (values: LoginI) => {
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleAuthProvider);
    };
    // const onFinish = async (values: LoginI) => {
    //     await fetch(
    //         'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAgTJyexl3AhXyoRfnB6LSyv0ZBoaP3Nm8',
    //         {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 email: values.username,
    //                 password: values.password,
    //                 returnSecureToken: true,
    //             }),
    //         },
    //     )
    //         .then((response) => {
    //             if (response.status !== 200) return Promise.reject(new Error('Wrong username or password'));
    //             return Promise.resolve(response);
    //         })
    //         .then((response) => response.json())
    //         .then((response) => {
    //             idT = response.idToken;
    //             dispatch(succesLogIn('SUCCES'));
    //         })
    //         .catch((error) => alert(error));
    // };

    // const logOut = async () => {
    //     await fetch('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signOutUser', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             instanceId: 'AIzaSyAgTJyexl3AhXyoRfnB6LSyv0ZBoaP3Nm8',
    //             localId: 'RvpOXOPvvvWOJfLNHMxw22K9ZxM2',
    //         }),
    //     })
    //         .then((response) => response.json())
    //         .then((response) => console.log(response));
    // };

    return (
        <section className={styles.LogInLayout}>
            <h1>Welcome!</h1>
            <AuthForm handler={onFinish} textOnButton={'Sign In'} />
        </section>
    );
};

export default LogInLayout;
