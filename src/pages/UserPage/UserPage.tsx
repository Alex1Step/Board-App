import React from 'react';
import { Redirect } from 'react-router-dom';
import styles from './UserPage.less';

import Header from '../../components/custom/Header/Header';
import UserContent from '../../containers/UserContent/UserContent';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const UserPage: React.FC = () => {
    const projectCreated: boolean = useSelector((state: RootState) => state.globalReducer.projectCreated);

    return !projectCreated ? (
        <div className={styles.wrapper}>
            <Header />
            <UserContent />
        </div>
    ) : (
        <Redirect to={'/boards'} />
    );
};

export default UserPage;
