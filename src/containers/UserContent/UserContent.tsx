import React from 'react';
import styles from './UserContent.less';
import ListOfProjects from '../../components/custom/ListOfPojects/ListOfProjects';
import AdminPanel from '../AdminPanel/AdminPanel';

const UserContent = (): JSX.Element => {
    return (
        <section className={styles.userPage}>
            <AdminPanel />
            <ListOfProjects />
        </section>
    );
};

export default UserContent;
