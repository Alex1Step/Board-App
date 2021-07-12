import React from 'react';
import styles from './Blackout.less';
import { Iblackout } from './interfaces';

const Blackout = (props: Iblackout): JSX.Element => {
    return <div className={styles.blackout} onClick={props.onClick} />;
};

export default Blackout;
