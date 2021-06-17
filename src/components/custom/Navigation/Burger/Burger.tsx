import React from 'react';
import styles from './Burger.less';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { IburgerProps } from './interfaces';

const Burger = (props: IburgerProps): JSX.Element => {
    const cls = [styles.Burger];

    if (props.isOpen) cls.push(styles.open);

    return props.isOpen ? (
        <CloseOutlined className={cls.join(' ')} onClick={props.onClick} />
    ) : (
        <MenuOutlined className={cls.join(' ')} onClick={props.onClick} />
    );
};

export default Burger;
