import React, { useCallback, useEffect } from 'react';

import { Button } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

import { ImodalProps } from './interfaces';

import styles from './Modal.less';

const Modal = (props: ImodalProps): React.ReactElement | null => {
    const { visible = false, title = '', onClose, children } = props;

    const onKeydown = useCallback(({ key }: KeyboardEvent) => {
        switch (key) {
            case 'Enter':
                onClose();
                break;
            case 'Escape':
                onClose();
                break;
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', onKeydown);
        return () => document.removeEventListener('keydown', onKeydown);
    }, []);

    return !visible ? null : (
        <div className={styles.modal}>
            <div className={styles.modalDialog}>
                <div className={styles.modalHeader}>
                    <h3 className={styles.modalTitle}>{title}</h3>
                    <Button type="primary" shape="circle" icon={<CheckOutlined />} onClick={onClose} />
                </div>
                <div className={styles.modalBody}>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
