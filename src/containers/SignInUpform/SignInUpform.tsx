import React from 'react';
import { ISignProps } from './interfaces';
import styles from './SignInUpform.less';

const SignInUpform = ({ children }: ISignProps): JSX.Element | null => {
    return <div className={styles.signInUpform}>{children}</div>;
};

export default SignInUpform;