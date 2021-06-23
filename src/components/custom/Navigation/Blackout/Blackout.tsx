import React from 'react';
//styles
import styles from './Blackout.less';
//interfaces
import { Iblackout } from './interfaces';

const Blackout = (props: Iblackout): JSX.Element => {
    return <div className={styles.Blackout} onClick={props.onClick}></div>;
};

export default Blackout;
