import React from 'react';
import AuthForm from '../../components/AuthForm/AuthForm';
import styles from './LogInLayout.less';

const LogInLayout: React.FunctionComponent = () => {
    return (
        <section className={styles.LogInLayout}>
            <h1>Welcome!</h1>
            <AuthForm />
        </section>
    );
};

export default LogInLayout;
