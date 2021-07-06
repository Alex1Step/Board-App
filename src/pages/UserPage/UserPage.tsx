import React, { useCallback, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import styles from './UserPage.less';
import { useDispatch, useSelector } from 'react-redux';
import store, { RootState } from '../../redux/store';
import { Form, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Modal from '../../components/custom/Modal/Modal';
import InputComponent from '../../components/base/Input/InputComponent';
import ListOfProjects from '../../components/custom/ListOfPojects/ListOfProjects';
import { addNewAssignee, createNewProject, logOut } from '../../redux/slice';
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

    const logOutHandler = () => {
        localStorage.removeItem('user');
        dispatch(logOut(user));
        history.push('/about');
    };

    const { t } = useTranslation();

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
                <ListOfProjects />
            </div>
        </div>
    ) : (
        <Redirect to={'/boards'} />
    );
};

export default UserPage;
