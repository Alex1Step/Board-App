import React from 'react';

import { Button } from 'antd';

import { IaddButtonProps } from './interfaces';

import cn from 'classnames';

import styles from './AddButton.less';

const AddButton = (props: IaddButtonProps): React.ReactElement => {
    return (
        <Button
            className={cn({
                [styles.addButton]: true,
                [styles.addBoard]: props.className === 'addBoard',
                [styles.addCard]: props.className === 'addCard',
            })}
            onClick={props.onClick}
            type="primary"
        >
            {props.text}
        </Button>
    );
};

export default AddButton;
