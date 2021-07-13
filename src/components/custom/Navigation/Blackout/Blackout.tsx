import React from 'react';

import { Iblackout } from './interfaces';

import styles from './Blackout.less';

const Blackout = (props: Iblackout): React.ReactElement => {
    return <div className={styles.blackout} onClick={props.onClick} />;
};

export default Blackout;
