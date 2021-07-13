import React from 'react';

import ListOfProjects from '../../components/custom/ListOfPojects/ListOfProjects';
import AdminPanel from '../AdminPanel/AdminPanel';

import styles from './UserContent.less';

const UserContent = (): React.ReactElement => {
    return (
        <section className={styles.userPage}>
            <AdminPanel />
            <ListOfProjects />
        </section>
    );
};

export default UserContent;
