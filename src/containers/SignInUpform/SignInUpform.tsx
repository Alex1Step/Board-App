import React from 'react';
//interfaces
import { ISignProps } from './interfaces';
//styles
import styles from './SignInUpform.less';

const SignInUpform = ({ children }: ISignProps): JSX.Element | null => {
    return <div className={styles.SignInUpform}>{children}</div>;
};

export default SignInUpform;
