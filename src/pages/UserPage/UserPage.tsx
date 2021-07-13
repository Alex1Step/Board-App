import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../../components/custom/Header/Header';
import UserContent from '../../containers/UserContent/UserContent';
import { useSelector } from 'react-redux';
import indexSelectors from '../../redux/selectors/indexSelectors';
import styles from './UserPage.less';

const UserPage: React.FC = () => {
    const projectCreated: boolean = useSelector(indexSelectors.projectCreated);

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
