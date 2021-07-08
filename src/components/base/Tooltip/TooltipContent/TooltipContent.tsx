import React from 'react';
import styles from './TooltipContent.less';
import cn from 'classnames';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { ITooltipContent } from './interfaces';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const TooltipContent = (props: ITooltipContent): JSX.Element => {
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
