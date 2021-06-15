import React from 'react';
import styles from './Button.less';
import { Button, Tooltip } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

interface ButtonI {
    classes?: string;
    onClick: () => void;
    message?: string;
}

const ButtonComponent = (props: ButtonI) => {
    const cls = [styles.Button];

    return (
        <Tooltip title={props.message} style={{ zIndex: 5 }}>
            <Button
                className={cls.join(' ')}
                type="primary"
                shape="circle"
                icon={<CloseOutlined twoToneColor="red" />}
                onClick={props.onClick}
            />
        </Tooltip>
    );
};

export default ButtonComponent;
