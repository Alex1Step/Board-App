import React, { useCallback } from 'react';
import { Redirect } from 'react-router';
import styles from './RegLayout.less';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../redux/slice';
import { RootState } from '../../redux/store';
import { LoginI } from './interfaces';
import { useTranslation } from 'react-i18next';
import CustomForm from '../../components/custom/CustomForm/CustomForm';

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
                <CustomForm
                    formSettings={{ formName: 'register', submit: onFinish }}
                    itemsSettings={[
                        {
                            type: 'input',
                            label: t('description.mail'),
                            name: 'username',
                            rules: [{ required: true }],
                        },
                        {
                            type: 'input',
                            label: t('description.password'),
                            name: 'password',
                            flag: 'password',
                            rules: [{ required: true }],
                        },
                        {
                            type: 'button',
                            label: 'signup',
                            name: 'signup',
                            defaultValue: t('description.signUp'),
                            htmlType: 'submit',
                        },
                    ]}
                />
            </section>
        </section>
    ) : (
        <Redirect to={'/user'} />
    );
};

export default RegLayout;
