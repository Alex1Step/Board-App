import React, { useCallback, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styles from './UserPage.less';
import { useDispatch, useSelector } from 'react-redux';
import store, { RootState } from '../../redux/store';
import Modal from '../../components/custom/Modal/Modal';
import ListOfProjects from '../../components/custom/ListOfPojects/ListOfProjects';
import { addNewAssignee, createNewProject } from '../../redux/slice';
import { useTranslation } from 'react-i18next';
import { IAssignee } from './interfaces';
import AdminModalContent from '../../components/custom/AdminModalContent/AdminModalContent';
import AdminButtons from '../../components/custom/AdminButtons/AdminButtons';
import Header from '../../components/custom/Header/Header';

const UserPage: React.FC = () => {
    const dispatch = useDispatch();

    const [data, setData] = useState(true);

    const isAdmin: boolean | undefined = useSelector((state: RootState) => state.globalReducer.isAdmin);

    const [projectTitle, setProjectTitle] = useState('');

    const { t } = useTranslation();

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

    return data ? (
        <div className={styles.wrapper}>
            <Header />
            <section className={styles.userPage}>
                {isAdmin && (
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
                )}
                <ListOfProjects />
            </section>
        </div>
    ) : (
        <Redirect to={'/boards'} />
    );
};

export default UserPage;
