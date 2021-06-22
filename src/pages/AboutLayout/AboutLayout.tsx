import React from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useHistory } from 'react-router-dom';
import styles from './AboutLayout.less';
import { logOut } from '../../redux/slice';

const AboutLayout: React.FunctionComponent = () => {
    const user: string = useSelector((state: RootState) => state.globalReducer.userName);

    const history = useHistory();
    const letSignUp = () => {
        history.push('/register');
    };

    const letSignIn = () => {
        history.push('/login');
    };
    const dispatch = useDispatch();
    const logOutHandler = () => {
        dispatch(logOut(user));
        setTimeout(() => history.push('/login'), 1000);
    };

    return (
        <div className={styles.About}>
            <div className={styles.wrapper}>
                <h1>Welcome aBOARD!</h1>
                <span>Let&apos;s make you much more efficient!</span>
                {user !== '' ? (
                    <Button className={styles.singleButton} type="primary" onClick={logOutHandler}>
                        SignIn to another account
                    </Button>
                ) : (
                    <div className={styles.buttonContainer}>
                        <Button type="primary" onClick={letSignIn}>
                            SignIn
                        </Button>
                        <Button type="primary" onClick={letSignUp}>
                            SignUp
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AboutLayout;
