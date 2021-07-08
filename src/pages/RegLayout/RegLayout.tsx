import React, { useCallback } from 'react';
import { Redirect } from 'react-router';
import styles from './RegLayout.less';
import AuthForm from '../../components/custom/AuthForm/AuthForm';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../redux/slice';
import { RootState } from '../../redux/store';
import { LoginI } from './interfaces';
import { useTranslation } from 'react-i18next';

const RegLayout: React.FC = () => {
    const dispatch = useDispatch();
    const user: string = useSelector((state: RootState) => state.globalReducer.userName);

    //REGISTER handler
    const onFinish = useCallback((values: LoginI) => {
        localStorage.setItem('user', values.username);
        dispatch(signUp(values));
    }, []);

    const { t } = useTranslation();

    return user === '' ? (
        <section className={styles.regLayout}>
            <section className={styles.signInUpform}>
                <h1>{t('description.register')}</h1>
                <AuthForm handler={onFinish} textOnButton={t('description.signUp')} />
            </section>
        </section>
    ) : (
        <Redirect to={'/user'} />
    );
};

export default RegLayout;
