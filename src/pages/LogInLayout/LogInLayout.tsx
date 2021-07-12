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
                    validation={indexValidation.authSchema}
                    formSettings={{ submit: onFinish }}
                    itemsSettings={[
                        {
                            type: 'checkbox',
                            label: 'checkbox',
                            name: 'chkbx',
                            defaultValue: 'true',
                        },
                        {
                            type: 'select',
                            label: 'select',
                            name: 'select',
                            optionsForSelect: [
                                { value: '1', label: 'one' },
                                { value: '2', label: 'two' },
                                { value: '3', label: 'three' },
                            ],
                        },
                        {
                            type: 'date',
                            label: 'date',
                            name: 'date',
                            dateFormat: 'YYYY/MM/DD',
                        },
                        {
                            type: 'input',
                            label: t('description.mail'),
                            name: 'username',
                            inputType: 'input',
                        },
                        {
                            type: 'input',
                            label: t('description.password'),
                            name: 'password',
                            inputType: 'password',
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
