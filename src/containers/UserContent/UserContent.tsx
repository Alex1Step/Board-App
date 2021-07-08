import React from 'react';
import styles from './UserContent.less';
import { IUserContent } from './interfaces';
import ListOfProjects from '../../components/custom/ListOfPojects/ListOfProjects';
import AdminPanel from '../AdminPanel/AdminPanel';

const UserContent = (props: IUserContent): JSX.Element => {
    return (
        <section className={styles.userPage}>
            <AdminPanel setData={props.setData} />
            <ListOfProjects />
        </section>
    );
};

export default UserContent;
