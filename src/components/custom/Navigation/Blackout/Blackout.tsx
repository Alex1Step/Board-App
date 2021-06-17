import React from 'react';
import styles from './Blackout.less';
import { Iblackout } from './interfaces';

const Blackout = (props: Iblackout): JSX.Element => {
    return <div className={styles.Blackout} onClick={props.onClick}></div>;
};

export default Blackout;
