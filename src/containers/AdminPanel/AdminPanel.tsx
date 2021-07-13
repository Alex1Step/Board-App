import React, { useCallback, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addNewAssignee } from '../../redux/userSlice/userSlice';
import { createNewProject } from '../../redux/projectSlice/projectSlice';

import AdminModalContent from '../../components/custom/AdminModalContent/AdminModalContent';
import AdminButtons from '../../components/custom/AdminButtons/AdminButtons';
import Modal from '../../components/custom/Modal/Modal';

import indexSelectors from '../../redux/selectors/indexSelectors';

import { useTranslation } from 'react-i18next';

const AdminPanel = (): null | React.ReactElement => {
    const dispatch = useDispatch();

    const isAdmin: boolean = useSelector(indexSelectors.isAdmin);

    const [projectTitle, setProjectTitle] = useState('');

    const { t } = useTranslation();

    //show or hide modal windows
    const [isModal, setModal] = React.useState(false);
    const onClose = useCallback(() => setModal(false), []);
    const [isModalAssign, setModalAssign] = React.useState(false);
    const onCloseAssign = useCallback(() => setModalAssign(false), []);

    const createProjectHandler = () => {
        dispatch(createNewProject(projectTitle));
        onClose();
    };

    const addAssignee = useCallback((values: { name: string; email: string }) => {
        dispatch(
            addNewAssignee({
                name: values.name,
                email: values.email,
            }),
        );
        onCloseAssign();
    }, []);

    return isAdmin ? (
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
    ) : null;
};

export default AdminPanel;
