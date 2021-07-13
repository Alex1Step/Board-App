import React from 'react';

import { NavLink } from 'react-router-dom';

import { Ilist } from './intefaces';

import Tooltip from '../../../base/Tooltip/Tooltip';
import TooltipContent from '../../../base/Tooltip/TooltipContent/TooltipContent';

import styles from './List.less';

const List = (props: Ilist): React.ReactElement => {
    const { loadThisBoard, deleteCurrentProject, checkRole, projectsList, isAdmin } = { ...props };

    const list = isAdmin
        ? Object.keys(projectsList).map((proj, index) => {
              const link = `/boards/${proj}`;
              return (
                  <li key={index} className={styles.projectItem}>
                      <Tooltip
                          content={() => (
                              <TooltipContent
                                  link={link}
                                  proj={proj}
                                  loadThisBoard={loadThisBoard}
                                  deleteCurrentProject={deleteCurrentProject}
                              />
                          )}
                      >
                          <div className={styles.link}>{proj}</div>
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
