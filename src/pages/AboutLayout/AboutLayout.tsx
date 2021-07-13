import React from 'react';

import GreetingView from '../../components/custom/GreetingView/GreetingView';

import styles from './AboutLayout.less';

const AboutLayout: React.FC = () => {
    return (
        <div className={styles.about}>
            <GreetingView />
        </div>
    );
};

export default AboutLayout;
