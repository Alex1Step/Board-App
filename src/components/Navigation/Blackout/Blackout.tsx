import React from 'react';
import styles from './Blackout.less';

interface BlackoutI {
    onClick: () => void;
    isOpen: boolean;
}

const Blackout = (props: BlackoutI): JSX.Element => {
    return <div className={styles.Blackout} onClick={props.onClick}></div>;
};

export default Blackout;
