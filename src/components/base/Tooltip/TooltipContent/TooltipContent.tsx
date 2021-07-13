import React from 'react';

import { NavLink } from 'react-router-dom';

import { Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { ITooltipContent } from './interfaces';

import cn from 'classnames';

import styles from './TooltipContent.less';

const TooltipContent = (props: ITooltipContent): React.ReactElement => {
    return (
        <div className={styles.tooltipContent}>
            <NavLink to={props.link} onClick={() => props.loadThisBoard(props.proj)}>
                <div
                    className={cn({
                        [styles.controlBtn]: true,
                        [styles.editButton]: true,
                    })}
                >
                    <EditOutlined />
                </div>
            </NavLink>
            <Button
                className={styles.controlBtn}
                type="primary"
                shape="circle"
                danger
                onClick={() => props.deleteCurrentProject!(props.proj)}
            >
                <DeleteOutlined />
            </Button>
        </div>
    );
};

export default TooltipContent;
