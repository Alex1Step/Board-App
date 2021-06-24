import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import styles from './AboutLayout.less';
import { logOut } from '../../redux/slice';

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

    return (
        <div className={styles.about}>
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
