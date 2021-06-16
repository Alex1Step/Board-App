import React from 'react';
import styles from './Pull.less';
import Blackout from '../Blackout/Blackout';
import { NavLink } from 'react-router-dom';

interface linkI {
    to: string;
    text: string;
    exact: boolean;
}

interface PullPropsI {
    isOpen: boolean;
    onClick: () => void;
    listOfLinks: linkI[];
}

const Pull = (props: PullPropsI) => {
    const cls = [styles.Pull];

    if (!props.isOpen) {
        cls.push(styles.close);
    }

    return (
        <>
            <nav className={cls.join(' ')}>
                <ul className={styles.linksInNav}>
                    {props.listOfLinks.map((link, index) => (
                        <li key={index}>
                            <NavLink to={link.to} exact={link.exact} onClick={props.onClick}>
                                {link.text}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            {props.isOpen ? <Blackout isOpen={props.isOpen} onClick={props.onClick} /> : null}
        </>
    );
};

export default Pull;
