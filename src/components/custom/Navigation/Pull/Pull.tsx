import React from 'react';
//styles
import styles from './Pull.less';
//components
import Blackout from '../Blackout/Blackout';
import { NavLink } from 'react-router-dom';
//interfaces
import { IpullProps } from './interfaces';
//redux
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
                        if (
                            (user !== '' && link.to === '/register') ||
                            (user === '' && link.to === '/boards') ||
                            (user !== '' && link.to === '/login')
                        )
                            return null;
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
