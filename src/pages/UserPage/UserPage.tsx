import React, { useCallback, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import styles from './UserPage.less';
import { useDispatch, useSelector } from 'react-redux';
import store, { RootState } from '../../redux/store';
import { Button } from 'antd';
import Modal from '../../components/custom/Modal/Modal';
import ListOfProjects from '../../components/custom/ListOfPojects/ListOfProjects';
import { addNewAssignee, createNewProject, logOut } from '../../redux/slice';
import { useTranslation } from 'react-i18next';
import { IAssignee } from './interfaces';
import AdminModalContent from '../../components/custom/AdminModalContent/AdminModalContent';
import AdminButtons from '../../components/custom/AdminButtons/AdminButtons';

const UserPage: React.FC = () => {
    const dispatch = useDispatch();

    const user: string = useSelector((state: RootState) => state.globalReducer.userName);

    const [data, setData] = useState(true);

    const isAdmin: boolean | undefined = useSelector((state: RootState) => state.globalReducer.isAdmin);

    const [projectTitle, setProjectTitle] = useState('');

    const { t } = useTranslation();

    const history = useHistory();

    //show or hide modal windows
    const [isModal, setModal] = React.useState(false);
    const onClose = useCallback(() => setModal(false), []);
    const [isModalAssign, setModalAssign] = React.useState(false);
    const onCloseAssign = useCallback(() => setModalAssign(false), []);

    const createProjectHandler = () => {
        store.subscribe(() => {
            setData(false);
        });
        dispatch(createNewProject(projectTitle));
        onClose();
    };

    const addAssignee = (values: { user: IAssignee }) => {
        dispatch(
            addNewAssignee({
                name: values.user.name,
                email: values.user.email,
            }),
        );
        onCloseAssign();
    };

    const logOutHandler = () => {
        localStorage.removeItem('user');
        dispatch(logOut(user));
        history.push('/about');
    };

    return data ? (
        <div className={styles.wrapper}>
            <section className={styles.onUserPage}>
                <div className={styles.userName}>
                    <p>{store.getState().globalReducer.userName}</p>
                </div>
                <Button className={styles.logoutBtn} type="primary" danger onClick={logOutHandler}>
                    {t('description.logout')}
                </Button>
            </section>
            <div className={styles.userPage}>
                {isAdmin ? (
                    <>
                        <AdminButtons setModal={setModal} setModalAssign={setModalAssign} />
                        <Modal
                            visible={isModal || isModalAssign}
                            title={isModal ? t('description.newProject') : t('description.newAssignee')}
                            onClose={isModal ? createProjectHandler : onCloseAssign}
                        >
                            <AdminModalContent
                                isModal={isModal}
                                title={projectTitle}
                                setProjectTitle={setProjectTitle}
                                addAssignee={addAssignee}
                            />
                        </Modal>
                    </>
                ) : null}
                <ListOfProjects />
            </div>
        </div>
    ) : (
        <Redirect to={'/boards'} />
    );
};

export default UserPage;
