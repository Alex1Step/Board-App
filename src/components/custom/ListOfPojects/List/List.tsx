import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './List.less';
import { Ilist } from './intefaces';
import Tooltip from '../../../base/Tooltip/Tooltip';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

const List = (props: Ilist): React.ReactElement => {
    const { loadThisBoard, deleteCurrentProject, checkRole, projectsList, isAdmin } = { ...props };
    const { t } = useTranslation();
    const list = isAdmin
        ? Object.keys(projectsList).map((proj, index) => {
              const link = `/boards/${proj}`;
              return (
                  <li key={index} className={styles.projectItem}>
                      <Tooltip
                          content={
                              <div>
                                  <NavLink to={link} onClick={() => loadThisBoard(proj)}>
                                      <div
                                          className={cn({
                                              [styles.controlBtn]: true,
                                              [styles.editButton]: true,
                                          })}
                                      >
                                          {t('description.editProject')}
                                      </div>
                                  </NavLink>
                                  <Button
                                      className={styles.controlBtn}
                                      type="primary"
                                      danger
                                      onClick={() => deleteCurrentProject!(proj)}
                                  >
                                      {t('description.deleteProject')}
                                  </Button>
                              </div>
                          }
                      >
                          <NavLink to={link} onClick={() => props.loadThisBoard(proj)}>
                              <div className={styles.link}>{proj}</div>
                          </NavLink>
                      </Tooltip>
                  </li>
              );
          })
        : Object.keys(projectsList).map((proj, index) => {
              if (checkRole!(proj)) {
                  const link = `/boards/${proj}`;
                  return (
                      <li key={index} className={styles.projectItem}>
                          <NavLink to={link} onClick={() => loadThisBoard(proj)}>
                              <div className={styles.link}>{proj}</div>
                          </NavLink>
                      </li>
                  );
              }
          });
    return <ul className={styles.linksToProjects}>{list}</ul>;
};

export default List;
