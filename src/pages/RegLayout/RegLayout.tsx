import React from 'react';
import { Redirect } from 'react-router';
import styles from './RegLayout.less';
import AuthForm from '../../components/custom/AuthForm/AuthForm';
import SignInUpform from '../../containers/SignInUpform/SignInUpform';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../redux/slice';
import { RootState } from '../../redux/store';
import { LoginI } from './interfaces';
import { useTranslation } from 'react-i18next';

const RegLayout: React.FC = () => {
    const dispatch = useDispatch();
    const user: string = useSelector((state: RootState) => state.globalReducer.userName);

    //REGISTER handler
    const onFinish = (values: LoginI) => {
        dispatch(signUp(values));
    };

    const { t } = useTranslation();

    return user === '' ? (
        <section className={styles.regLayout}>
            <SignInUpform>
                <h1>{t('description.register')}</h1>
                <AuthForm handler={onFinish} textOnButton={t('description.signUp')} />
            </SignInUpform>
        </section>
    ) : (
        <Redirect to={'/boards'} />
    );
};

export default RegLayout;