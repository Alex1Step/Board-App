import React from 'react';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useHistory } from 'react-router-dom';
import styles from './AboutLayout.less';

const AboutLayout: React.FunctionComponent = () => {
    const user: string = useSelector((state: RootState) => state.globalReducer.userName);

    const history = useHistory();
    const letSignUp = () => {
        history.push('/register');
    };

    const letSignIn = () => {
        history.push('/login');
    };

    return (
        <div className={styles.About}>
            <div className={styles.wrapper}>
                <h1>Welcome aBOARD!</h1>
                <span>Let&apos;s make you much more efficient!</span>
                {user !== '' ? (
                    <Button type="primary" onClick={letSignIn}>
                        SignIn
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
