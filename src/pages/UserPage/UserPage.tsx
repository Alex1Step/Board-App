import React, { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './UserPage.less';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Modal from '../../components/custom/Modal/Modal';
import InputComponent from '../../components/base/Input/InputComponent';
import { createNewProject } from '../../redux/slice';
import { loadBoard } from '../../redux/slice';

const UserPage = () => {
    const dispatch = useDispatch();

    const projectsList: { [key: string]: string } | undefined = useSelector(
        (state: RootState) => state.globalReducer.listOfProjects,
    );
    const isAdmin: boolean | undefined = useSelector((state: RootState) => state.globalReducer.isAdmin);

    const [projectTitle, setProjectTitle] = useState('');

    //show or hide modal window
    const [isModal, setModal] = React.useState(false);
    const onClose = useCallback(() => setModal(false), []);

    const createProjectHandler = () => {
        dispatch(createNewProject(projectTitle));
        setModal(false);
    };

    const loadThisBoard = (proj: string) => {
        dispatch(loadBoard(proj));
    };

    return (
        <div className={styles.userPage}>
            <h1>Projects</h1>
            <ul className={styles.linksToProjects}>
                {projectsList
                    ? Object.keys(projectsList).map((proj, index) => {
                          const link = `/boards/${proj}`;
                          return (
                              <li key={index}>
                                  <NavLink to={link} onClick={() => loadThisBoard(proj)}>
                                      {proj}
                                  </NavLink>
                              </li>
                          );
                      })
                    : null}
            </ul>
            {isAdmin ? (
                <>
                    <Button
                        type="primary"
                        shape="round"
                        icon={<PlusOutlined />}
                        size="large"
                        onClick={() => setModal(true)}
                    >
                        Add
                    </Button>
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
        </div>
    );
};

export default UserPage;
