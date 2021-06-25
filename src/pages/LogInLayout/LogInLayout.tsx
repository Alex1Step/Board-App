import React from 'react';
import AuthForm from '../../components/custom/AuthForm/AuthForm';
import SignInUpform from '../../containers/SignInUpform/SignInUpform';
import styles from './LogInLayout.less';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../redux/slice';
import { Redirect } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { LoginI } from './interfaces';
import { useTranslation } from 'react-i18next';

const LogInLayout: React.FC = () => {
    const dispatch = useDispatch();
    const user: string = useSelector((state: RootState) => state.globalReducer.userName);

    //LogIn handler
    const onFinish = (values: LoginI) => {
        dispatch(signIn(values));
    };

    const { t } = useTranslation();

    return user === '' ? (
        <section className={styles.logInLayout}>
            <SignInUpform>
                <h1>{t('description.welcome')}</h1>
                <AuthForm handler={onFinish} textOnButton={t('description.signIn')} />
            </SignInUpform>
        </section>
    ) : (
        <Redirect to={'/boards'} />
    );
};

export default LogInLayout;
