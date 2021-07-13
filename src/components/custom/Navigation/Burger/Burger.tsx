import React from 'react';

import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { IburgerProps } from './interfaces';

import cn from 'classnames';

import styles from './Burger.less';

const Burger = ({ isOpen, onClick }: IburgerProps): React.ReactElement => {
    return isOpen ? (
        <CloseOutlined className={cn({ [styles.burger]: true, [styles.open]: isOpen })} onClick={onClick} />
    ) : (
        <MenuOutlined className={cn({ [styles.burger]: true })} onClick={onClick} />
    );
};
export default Burger;
