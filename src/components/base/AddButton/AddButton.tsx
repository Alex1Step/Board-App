import React from 'react';
import { Button } from 'antd';
import styles from './AddButton.less';
import { IaddButtonProps } from './interfaces';
import cn from 'classnames';

const AddButton = (props: IaddButtonProps): JSX.Element => {
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
