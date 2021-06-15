import React from 'react';
import styles from './Pull.less';
import Blackout from '../Blackout/Blackout';

interface linkI {
    to: string;
    text: string;
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
                            <a href={link.to}>{link.text}</a>
                        </li>
                    ))}
                </ul>
            </nav>
            {props.isOpen ? <Blackout isOpen={props.isOpen} onClick={props.onClick} /> : null}
        </>
    );
};

export default Pull;
