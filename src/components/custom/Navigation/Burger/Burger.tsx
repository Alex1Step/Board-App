import React from 'react';
//styles
import styles from './Burger.less';
//components
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
//interfaces
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
