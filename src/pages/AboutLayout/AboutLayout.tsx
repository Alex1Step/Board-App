import React from 'react';
import styles from './AboutLayout.less';

import GreetingView from '../../components/custom/GreetingView/GreetingView';

const AboutLayout: React.FC = () => {
    return (
        <div className={styles.about}>
            <GreetingView />
        </div>
    );
};

export default AboutLayout;
