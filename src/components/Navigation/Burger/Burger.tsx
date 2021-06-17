import React from 'react';
import styles from './Burger.less';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';

interface burgerPropsI {
    isOpen: boolean;
    onClick: () => void;
}

const Burger = (props: burgerPropsI): JSX.Element => {
    const cls = [styles.Burger];

    if (props.isOpen) cls.push(styles.open);

    return props.isOpen ? (
        <CloseOutlined className={cls.join(' ')} onClick={props.onClick} />
    ) : (
        <MenuOutlined className={cls.join(' ')} onClick={props.onClick} />
    );
};

export default Burger;
