import React, { useCallback, useState } from 'react';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import styles from './UserPage.less';
import { useDispatch, useSelector } from 'react-redux';
import store, { RootState } from '../../redux/store';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Modal from '../../components/custom/Modal/Modal';
import InputComponent from '../../components/base/Input/InputComponent';
import { createNewProject, logOut } from '../../redux/slice';
import { loadBoard } from '../../redux/slice';
import { useTranslation } from 'react-i18next';

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

    const history = useHistory();

    const createProjectHandler = () => {
        store.subscribe(() => {
            console.log('log');
            setData(false);
        });
        dispatch(createNewProject(projectTitle));
        onClose;
    };

    const loadThisBoard = (proj: string) => {
        dispatch(loadBoard(proj));
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
                            <Button type="primary" shape="round" icon={<PlusOutlined />} size="large">
                                Add assignee
                            </Button>
                        </section>
                        <Modal visible={isModal} title="New Project Title" onClose={createProjectHandler}>
                            <InputComponent
                                type={'text'}
                                label={''}
                                value={projectTitle}
                                onChange={(event) => {
                                    setProjectTitle(event.target.value);
                                }}
                                withoutSubstitution={true}
                            />
                        </Modal>
                    </>
                ) : null}
                <h1>Projects</h1>
                <ul className={styles.linksToProjects}>
                    {projectsList
                        ? Object.keys(projectsList).map((proj, index) => {
                              const link = `/boards/${proj}`;
                              return (
                                  <li key={index}>
                                      <NavLink to={link} onClick={() => loadThisBoard(proj)}>
                                          <div className={styles.link}>{proj}</div>
                                      </NavLink>
                                  </li>
                              );
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
