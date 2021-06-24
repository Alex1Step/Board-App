import React from 'react';
import styles from './Button.less';
import { Button, Tooltip } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { IbuttonProps } from './interfaces';

const ButtonComponent = (props: IbuttonProps): JSX.Element => {
    return (
        <Tooltip title={props.message}>
            <Button
                className={styles.button}
                type="primary"
                shape="circle"
                icon={<CloseOutlined twoToneColor="red" />}
                onClick={props.onClick}
            />
        </Tooltip>
    );
};

export default ButtonComponent;
