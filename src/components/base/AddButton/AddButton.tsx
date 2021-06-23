import React from 'react';
//components
import { Button } from 'antd';
//styles
import styles from './AddButton.less';
//interfaces
import { IaddButtonProps } from './interfaces';

const AddButton = (props: IaddButtonProps): JSX.Element => {
    const cls = [styles[props.type]];

    return (
        <Button className={cls.join(' ')} onClick={props.onClick} type="primary">
            {props.text}
        </Button>
    );
};

export default AddButton;
