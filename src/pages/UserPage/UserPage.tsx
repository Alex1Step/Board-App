import React, { useCallback, useState } from 'react';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import styles from './UserPage.less';
import { useDispatch, useSelector } from 'react-redux';
import store, { RootState } from '../../redux/store';
import { Form, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Modal from '../../components/custom/Modal/Modal';
import InputComponent from '../../components/base/Input/InputComponent';
import { addNewAssignee, createNewProject, logOut } from '../../redux/slice';
import { loadBoard } from '../../redux/slice';
import { useTranslation } from 'react-i18next';
import { IAssignee } from './interfaces';

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

    const projectsList: { [key: string]: string } | undefined = useSelector(
        (state: RootState) => state.globalReducer.listOfProjects,
    );

    const user: string = useSelector((state: RootState) => state.globalReducer.userName);

    const [data, setData] = useState(true);

    const isAdmin: boolean | undefined = useSelector((state: RootState) => state.globalReducer.isAdmin);

    const [projectTitle, setProjectTitle] = useState('');

    //show or hide modal window
    const [isModal, setModal] = React.useState(false);
    const onClose = useCallback(() => setModal(false), []);
    const [isModalAssign, setModalAssign] = React.useState(false);
    const onCloseAssign = useCallback(() => setModalAssign(false), []);

    const history = useHistory();

    const createProjectHandler = () => {
        store.subscribe(() => {
            console.log('log');
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
                (board as any).tasks.forEach((element: any) => {
                    if (element.assignee === currentAssignee) flag = true;
                });
            });
        }
        return flag;
    };

    const { t } = useTranslation();

    return data ? (
        <div className={styles.wrapper}>
            <section className={styles.onUserPage}>
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
                                Add project
                            </Button>
                            <Button
                                type="primary"
                                shape="round"
                                icon={<PlusOutlined />}
                                size="large"
                                onClick={() => setModalAssign(true)}
                            >
                                Add assignee
                            </Button>
                        </section>
                        <Modal
                            visible={isModal || isModalAssign}
                            title={isModal ? 'New Project Title' : 'Add new assignee'}
                            onClose={isModal ? createProjectHandler : onCloseAssign}
                        >
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
                                    <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                        <Button type="primary" htmlType="submit">
                                            Add
                                        </Button>
                                    </Form.Item>
                                </Form>
                            )}
                        </Modal>
                    </>
                ) : null}
                <h1>Projects</h1>
                <ul className={styles.linksToProjects}>
                    {projectsList
                        ? Object.keys(projectsList).map((proj, index) => {
                              if (store.getState().globalReducer.isAdmin) {
                                  const link = `/boards/${proj}`;
                                  return (
                                      <li key={index}>
                                          <NavLink to={link} onClick={() => loadThisBoard(proj)}>
                                              <div className={styles.link}>{proj}</div>
                                          </NavLink>
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
                        : null}
                </ul>
            </div>
        </div>
    ) : (
        <Redirect to={'/boards'} />
    );
};

export default UserPage;
