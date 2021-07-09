import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import store, { RootState } from '../../redux/store';
import { useTranslation } from 'react-i18next';
import AdminModalContent from '../../components/custom/AdminModalContent/AdminModalContent';
import AdminButtons from '../../components/custom/AdminButtons/AdminButtons';
import Modal from '../../components/custom/Modal/Modal';
import { addNewAssignee, createNewProject } from '../../redux/slice';
import { IAdminPanel } from './interfaces';

const AdminPanel = (props: IAdminPanel): null | JSX.Element => {
    const dispatch = useDispatch();

    const isAdmin: boolean = useSelector((state: RootState) => state.globalReducer.isAdmin);

    const [projectTitle, setProjectTitle] = useState('');

    const { t } = useTranslation();

    //show or hide modal windows
    const [isModal, setModal] = React.useState(false);
    const onClose = useCallback(() => setModal(false), []);
    const [isModalAssign, setModalAssign] = React.useState(false);
    const onCloseAssign = useCallback(() => setModalAssign(false), []);

    const createProjectHandler = () => {
        store.subscribe(() => {
            props.setData(false);
        });
        dispatch(createNewProject(projectTitle));
        onClose();
    };

    // const addAssignee = (values: { user: IAssignee }) => {
    const addAssignee = (values: { name: string; email: string }) => {
        console.log(values);
        dispatch(
            addNewAssignee({
                name: values.name,
                email: values.email,
            }),
        );
        onCloseAssign();
    };

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
