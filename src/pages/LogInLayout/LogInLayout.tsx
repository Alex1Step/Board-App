import React, { useCallback } from 'react';
import styles from './LogInLayout.less';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../redux/slice';
import { Redirect } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { LoginI } from './interfaces';
import { useTranslation } from 'react-i18next';
import CustomForm from '../../components/custom/CustomForm/CustomForm';
import indexValidation from '../../validation/indexValidation';

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
                <CustomForm
                    formSettings={{ submit: onFinish }}
                    itemsSettings={[
                        {
                            type: 'input',
                            label: t('description.mail'),
                            name: 'username',
                            inputType: 'input',
                            rules: [{ required: true }],
                        },
                        {
                            type: 'input',
                            label: t('description.password'),
                            name: 'password',
                            inputType: 'password',
                            rules: [{ required: true }],
                        },
                        {
                            type: 'button',
                            label: 'signin',
                            name: 'signin',
                            defaultValue: t('description.signIn'),
                            htmlType: 'submit',
                        },
                    ]}
                />
            </section>
        </section>
    ) : (
        <Redirect to="/user" />
    );
};

export default LogInLayout;
