import React from 'react';
import styles from './RegLayout.less';
import AuthForm from '../../components/AuthForm/AuthForm';
import { useDispatch } from 'react-redux';
import { succesCreateNewUser } from '../../redux/slice';
import firebase from 'firebase';

interface LoginI {
    password: string;
    username: string;
}

const RegLayout: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    //REGISTER handler
    const onFinish = (values: LoginI) => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(values.username, values.password)
            .then(() => {
                console.log('SUCCES');
                dispatch(succesCreateNewUser(values.username));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <section className={styles.RegLayout}>
            <h1>Let`s register!</h1>
            <AuthForm handler={onFinish} textOnButton={'Sign Up'} />
        </section>
    );
};

export default RegLayout;
