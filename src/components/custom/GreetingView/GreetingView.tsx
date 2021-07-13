import React, { useCallback } from 'react';

import { useHistory } from 'react-router-dom';

import { Button } from 'antd';

import { logOut } from '../../../redux/userSlice/userSlice';
import { useDispatch, useSelector } from 'react-redux';

import indexSelectors from '../../../redux/selectors/indexSelectors';

import { useTranslation } from 'react-i18next';

import styles from './GreetingView.less';

const GreetingView = (): React.ReactElement => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();

    const user: string = useSelector(indexSelectors.user);

    const letSignUp = useCallback(() => {
        history.push('/register');
    }, []);

    const letSignIn = useCallback(() => {
        history.push('/login');
    }, []);

    const logOutHandler = useCallback(() => {
        dispatch(logOut(user));
        history.push('./about');
    }, []);

    return (
        <div className={styles.wrapper}>
            <h1>{t('description.greet')}</h1>
            <span>{t('description.motto')}</span>
            {user !== '' ? (
                <Button className={styles.singleButton} type="primary" onClick={logOutHandler}>
                    {t('description.anotherAcc')}
                </Button>
            ) : (
                <div className={styles.buttonContainer}>
                    <Button type="primary" onClick={letSignIn}>
                        {t('description.signIn')}
                    </Button>
                    <Button type="primary" onClick={letSignUp}>
                        {t('description.signUp')}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default GreetingView;
