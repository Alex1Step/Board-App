import React from 'react';

import styles from './Preloader.less';

const Preloader = (): React.ReactElement => (
    <div className={styles.center}>
        <div className={styles.ldsFacebook}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
);

export default Preloader;
