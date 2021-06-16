import React from 'react';
import styles from './RegLayout.less';
import AuthForm from '../../components/AuthForm/AuthForm';
import { useDispatch } from 'react-redux';
import { succesCreateNewUser } from '../../redux/slice';

interface LoginI {
    password: string;
    username: string;
}

const RegLayout: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    //REGISTER handler
    const onFinish = async (values: LoginI) => {
        await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAgTJyexl3AhXyoRfnB6LSyv0ZBoaP3Nm8',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: values.username,
                    password: values.password,
                    returnSecureToken: true,
                }),
            },
        )
            .then((response) => {
                if (response.status !== 200) return Promise.reject(new Error('Invalid mail format or password length'));
                return Promise.resolve(response);
            })
            .then((response) => response.json())
            .then((response) => {
                dispatch(succesCreateNewUser(response.email));
            })
            .catch((error) => alert(error));
    };

    return (
        <section className={styles.RegLayout}>
            <h1>Let`s register!</h1>
            <AuthForm handler={onFinish} textOnButton={'Sign Up'} />
        </section>
    );
};

export default RegLayout;
