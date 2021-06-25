import React from 'react';
import styles from './Pull.less';
import Blackout from '../Blackout/Blackout';
import { NavLink } from 'react-router-dom';
import { IpullProps } from './interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import cn from 'classnames';

const Pull = ({ isOpen, onClick, listOfLinks }: IpullProps): JSX.Element => {
    const user: string = useSelector((state: RootState) => state.globalReducer.userName);

    return (
        <>
            <nav
                className={cn({
                    [styles.pull]: true,
                    [styles.close]: !isOpen,
                })}
            >
                <ul className={styles.linksInNav}>
                    {listOfLinks.map((link, index) => {
                        if (
                            (user !== '' && link.to === '/register') ||
                            (user === '' && link.to === '/boards') ||
                            (user !== '' && link.to === '/login')
                        )
                            return null;
                        return (
                            <li key={index}>
                                <NavLink to={link.to} exact={link.exact} onClick={onClick}>
                                    {link.text}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            {isOpen ? <Blackout isOpen={isOpen} onClick={onClick} /> : null}
        </>
    );
};

export default Pull;
