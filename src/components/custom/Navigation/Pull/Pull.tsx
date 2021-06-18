import React from 'react';
import styles from './Pull.less';
import Blackout from '../Blackout/Blackout';
import { NavLink } from 'react-router-dom';
import { IpullProps } from './interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';

const Pull = (props: IpullProps): JSX.Element => {
    const user: string = useSelector((state: RootState) => state.globalReducer.userName);
    const cls = [styles.Pull];

    if (!props.isOpen) {
        cls.push(styles.close);
    }

    return (
        <>
            <nav className={cls.join(' ')}>
                <ul className={styles.linksInNav}>
                    {props.listOfLinks.map((link, index) => {
                        if (user !== '' && link.to === '/register') return null;
                        return (
                            <li key={index}>
                                <NavLink to={link.to} exact={link.exact} onClick={props.onClick}>
                                    {link.text}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            {props.isOpen ? <Blackout isOpen={props.isOpen} onClick={props.onClick} /> : null}
        </>
    );
};

export default Pull;
