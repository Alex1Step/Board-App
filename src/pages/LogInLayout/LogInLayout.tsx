import React, { useCallback } from 'react';
import AuthForm from '../../components/custom/AuthForm/AuthForm';
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
    const onFinish = useCallback((values: LoginI) => {
        localStorage.setItem('user', values.username);
        dispatch(signIn(values));
    }, []);

    const { t } = useTranslation();

    return user === '' ? (
        <section className={styles.logInLayout}>
            <section className={styles.signInUpform}>
                <h1>{t('description.welcome')}</h1>
                <AuthForm handler={onFinish} textOnButton={t('description.signIn')} />
            </section>
        </section>
    ) : (
        <Redirect to={'/user'} />
    );
};

export default LogInLayout;
