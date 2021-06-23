import React from 'react';
//styles
import styles from './Modal.less';
//interfaces
import { ImodalProps } from './interfaces';
//components
import { Button } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

const Modal = ({ visible = false, title = '', onClose, children }: ImodalProps): JSX.Element | null => {
    const onKeydown = ({ key }: KeyboardEvent) => {
        switch (key) {
            case 'Enter':
                onClose();
                break;
        }
    };

    React.useEffect(() => {
        document.addEventListener('keydown', onKeydown);
        return () => document.removeEventListener('keydown', onKeydown);
    });

    if (!visible) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.modalDialog} onClick={(e) => e.stopPropagation()}>
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
