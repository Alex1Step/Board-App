import React from 'react';
import styles from './Button.less';
import { Button, Tooltip } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

interface ButtonI {
    classes?: string;
    onClick: () => void;
    message?: string;
}

const ButtonComponent = (props: ButtonI): JSX.Element => {
    const cls = [styles.Button];

    return (
        <Tooltip title={props.message}>
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
