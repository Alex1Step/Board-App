import React from 'react';
import { Redirect } from 'react-router';
//STYLES
import styles from './RegLayout.less';
//COMPONENTS
import AuthForm from '../../components/custom/AuthForm/AuthForm';
import SignInUpform from '../../containers/SignInUpform/SignInUpform';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../redux/slice';
import { RootState } from '../../redux/store';
//INTERFACES
import { LoginI } from './interfaces';

const RegLayout: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const user: string = useSelector((state: RootState) => state.globalReducer.userName);

    //REGISTER handler
    const onFinish = (values: LoginI) => {
        dispatch(signUp(values));
    };

    return user === '' ? (
        <section className={styles.RegLayout}>
            <SignInUpform>
                <h1>Let`s register!</h1>
                <AuthForm handler={onFinish} textOnButton={'Sign Up'} />
            </SignInUpform>
        </section>
    ) : (
        <Redirect to={'/boards'} />
    );
};

export default RegLayout;
