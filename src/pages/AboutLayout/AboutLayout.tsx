import React from 'react';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useHistory } from 'react-router-dom';
import { signIn } from '../../redux/slice';
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
            <h1>Welcome aBOARD!</h1>
            <span>Let&apos;s make you much more efficient!</span>
            {user !== '' ? (
                <Button type="primary" danger onClick={letSignIn}>
                    SignIn
                </Button>
            ) : (
                <>
                    <Button type="primary" danger onClick={letSignIn}>
                        SignIn
                    </Button>
                    <Button type="primary" danger onClick={letSignUp}>
                        SignUp
                    </Button>
                </>
            )}
        </div>
    );
};

export default AboutLayout;
