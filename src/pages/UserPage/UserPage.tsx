import React, { useCallback, useState } from 'react';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import styles from './UserPage.less';
import { useDispatch, useSelector } from 'react-redux';
import store, { RootState } from '../../redux/store';
import { Form, Input, Button, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Modal from '../../components/custom/Modal/Modal';
import InputComponent from '../../components/base/Input/InputComponent';
import { addNewAssignee, createNewProject, logOut, deleteProject } from '../../redux/slice';
import { loadBoard } from '../../redux/slice';
import { useTranslation } from 'react-i18next';
import { IAssignee } from './interfaces';
import { BoardI } from '../../redux/interfaces';
import { CloseOutlined } from '@ant-design/icons';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
    },
};

const UserPage: React.FC = () => {
    const dispatch = useDispatch();

    const projectsList: { [key: string]: BoardI[] } | undefined = useSelector(
        (state: RootState) => state.globalReducer.listOfProjects,
    );

    const user: string = useSelector((state: RootState) => state.globalReducer.userName);

    const [data, setData] = useState(true);

    const isAdmin: boolean | undefined = useSelector((state: RootState) => state.globalReducer.isAdmin);

    const [projectTitle, setProjectTitle] = useState('');

    //show or hide modal windows
    const [isModal, setModal] = React.useState(false);
    const onClose = useCallback(() => setModal(false), []);
    const [isModalAssign, setModalAssign] = React.useState(false);
    const onCloseAssign = useCallback(() => setModalAssign(false), []);

    const history = useHistory();

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

    const loadThisBoard = (proj: string) => {
        dispatch(loadBoard(proj));
    };

    const logOutHandler = () => {
        localStorage.removeItem('user');
        dispatch(logOut(user));
        history.push('/about');
    };

    //check role of user
    const stateForCheckRole = store.getState().globalReducer;
    const currentUser = stateForCheckRole.userName.replace(/[\s.,%]/g, '');
    let currentAssignee = '';
    if (stateForCheckRole.assignee) currentAssignee = stateForCheckRole.assignee[currentUser];

    const checkRole = (project: string): boolean => {
        let flag = false;
        if (stateForCheckRole.listOfProjects) {
            Object.values(stateForCheckRole.listOfProjects[project]).forEach((board) => {
                board.tasks.forEach((element) => {
                    if (element.assignee === currentAssignee) flag = true;
                });
            });
        }
        return flag;
    };

    const deleteCurrentProject = (proj: string) => {
        dispatch(deleteProject(proj));
    };

    const { t } = useTranslation();

    return data ? (
        <div className={styles.wrapper}>
            <section className={styles.onUserPage}>
                <div className={styles.userName}>
                    <p>{stateForCheckRole.userName}</p>
                </div>
                <Button className={styles.logoutBtn} type="primary" danger onClick={logOutHandler}>
                    {t('description.logout')}
                </Button>
            </section>
            <div className={styles.userPage}>
                {isAdmin ? (
                    <>
                        <section className={styles.adminButtons}>
                            <Button
                                type="primary"
                                shape="round"
                                icon={<PlusOutlined />}
                                size="large"
                                onClick={() => setModal(true)}
                            >
                                {t('description.addProject')}
                            </Button>
                            <Button
                                type="primary"
                                shape="round"
                                icon={<PlusOutlined />}
                                size="large"
                                onClick={() => setModalAssign(true)}
                            >
                                {t('description.addAssignee')}
                            </Button>
                        </section>
                        <Modal
                            visible={isModal || isModalAssign}
                            title={isModal ? t('description.newProject') : t('description.newAssignee')}
                            onClose={isModal ? createProjectHandler : onCloseAssign}
                        >
                            <div className={styles.forModal}>
                                {isModal ? (
                                    <InputComponent
                                        type={'text'}
                                        label={''}
                                        value={projectTitle}
                                        onChange={(event) => {
                                            setProjectTitle(event.target.value);
                                        }}
                                        withoutSubstitution={true}
                                    />
                                ) : (
                                    <Form
                                        {...layout}
                                        name="nest-messages"
                                        onFinish={addAssignee}
                                        validateMessages={validateMessages}
                                    >
                                        <Form.Item
                                            name={['user', 'name']}
                                            label={t('description.name')}
                                            rules={[{ required: true }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name={['user', 'email']}
                                            label={t('description.mail')}
                                            rules={[{ type: 'email' }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                            <Button type="primary" htmlType="submit">
                                                {t('description.add')}
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                )}
                            </div>
                        </Modal>
                    </>
                ) : null}
                <h1>{t('description.projects')}</h1>
                <ul className={styles.linksToProjects}>
                    {projectsList ? (
                        Object.keys(projectsList).map((proj, index) => {
                            if (store.getState().globalReducer.isAdmin) {
                                const link = `/boards/${proj}`;
                                return (
                                    <li key={index} className={styles.projectItem}>
                                        <NavLink to={link} onClick={() => loadThisBoard(proj)}>
                                            <div className={styles.link}>{proj}</div>
                                        </NavLink>
                                        <div className={styles.linkBtn}>
                                            <Tooltip title={t('description.deleteProject') + proj}>
                                                <Button
                                                    type="primary"
                                                    danger
                                                    shape="circle"
                                                    className={styles.deleteProjectButton}
                                                    icon={<CloseOutlined />}
                                                    onClick={() => deleteCurrentProject(proj)}
                                                />
                                            </Tooltip>
                                        </div>
                                    </li>
                                );
                            } else {
                                if (checkRole(proj)) {
                                    const link = `/boards/${proj}`;
                                    return (
                                        <li key={index}>
                                            <NavLink to={link} onClick={() => loadThisBoard(proj)}>
                                                <div className={styles.link}>{proj}</div>
                                            </NavLink>
                                        </li>
                                    );
                                }
                            }
                        })
                    ) : (
                        <h2>{t('description.noProjects')}</h2>
                    )}
                </ul>
            </div>
        </div>
    ) : (
        <Redirect to={'/boards'} />
    );
};

export default UserPage;
