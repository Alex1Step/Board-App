import React from 'react';
import styles from './Burger.less';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { IburgerProps } from './interfaces';
import cn from 'classnames';

const Burger = ({ isOpen, onClick }: IburgerProps): JSX.Element => {
    return isOpen ? (
        <CloseOutlined className={cn({ [styles.burger]: true, [styles.open]: isOpen })} onClick={onClick} />
    ) : (
        <MenuOutlined className={cn({ [styles.burger]: true })} onClick={onClick} />
    );
};
export default Burger;
