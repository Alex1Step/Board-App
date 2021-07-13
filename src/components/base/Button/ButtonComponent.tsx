import React from 'react';

import { Button, Tooltip } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import { IbuttonProps } from './interfaces';

import styles from './Button.less';

const ButtonComponent = (props: IbuttonProps): React.ReactElement => {
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
