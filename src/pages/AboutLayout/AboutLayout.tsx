import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import styles from './AboutLayout.less';
import { logOut } from '../../redux/slice';
import { useTranslation } from 'react-i18next';

const AboutLayout: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user: string = useSelector((state: RootState) => state.globalReducer.userName);

    const letSignUp = () => {
        history.push('/register');
    };

    const letSignIn = () => {
        history.push('/login');
    };

    const logOutHandler = () => {
        dispatch(logOut(user));
        history.push('./about');
    };

    const { t } = useTranslation();

    return (
        <div className={styles.about}>
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
        </div>
    );
};

export default AboutLayout;
