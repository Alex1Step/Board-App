import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import styles from './UserPage.less';

import Header from '../../components/custom/Header/Header';
import UserContent from '../../containers/UserContent/UserContent';

const UserPage: React.FC = () => {
    const [data, setData] = useState(true);

    return data ? (
        <div className={styles.wrapper}>
            <Header />
            <UserContent setData={setData} />
        </div>
    ) : (
        <Redirect to={'/boards'} />
    );
};

export default UserPage;
