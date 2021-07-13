import React from 'react';

import { NavLink } from 'react-router-dom';

import Blackout from '../Blackout/Blackout';

import { IpullProps } from './interfaces';
import { useSelector } from 'react-redux';

import indexSelectors from '../../../../redux/selectors/indexSelectors';

import cn from 'classnames';

import styles from './Pull.less';

const Pull = ({ isOpen, onClick, listOfLinks }: IpullProps): React.ReactElement => {
    const user: string = useSelector(indexSelectors.user);

    return (
        <>
            <nav
                className={cn({
                    [styles.pull]: true,
                    [styles.close]: !isOpen,
                })}
            >
                <ul className={styles.linksInNav}>
                    {listOfLinks.map(
                        (link, index) =>
                            !(
                                (user !== '' && link.to === '/register') ||
                                (user === '' && link.to === '/user') ||
                                (user !== '' && link.to === '/login')
                            ) && (
                                <li key={index}>
                                    <NavLink to={link.to} exact={link.exact} onClick={onClick}>
                                        {link.text}
                                    </NavLink>
                                </li>
                            ),
                    )}
                </ul>
            </nav>
            {isOpen && <Blackout isOpen={isOpen} onClick={onClick} />}
        </>
    );
};

export default Pull;
