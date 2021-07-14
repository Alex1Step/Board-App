import React, { useCallback } from 'react';

import { Redirect } from 'react-router';

import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../redux/slices/async/signUp';
import { LoginI } from './interfaces';

import { useTranslation } from 'react-i18next';

import CustomForm from '../../components/custom/CustomForm/CustomForm';

import indexValidation from '../../validation/indexValidation';
import indexSelectors from '../../redux/selectors/indexSelectors';

import styles from './RegLayout.less';

const RegLayout: React.FC = () => {
    const dispatch = useDispatch();
    const user: string = useSelector(indexSelectors.user);

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
                <CustomForm
                    validation={indexValidation.authSchema}
                    formSettings={{ submit: onFinish }}
                    itemsSettings={[
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

export default RegLayout;
