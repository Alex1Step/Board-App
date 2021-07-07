import React from 'react';
import styles from './AdminButtons.less';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { IAdminsButton } from './interfaces';

const AdminButtons = (props: IAdminsButton): JSX.Element => {
    const { setModal, setModalAssign } = props;

    const { t } = useTranslation();

    return (
        <section className={styles.adminButtons}>
            <Button type="primary" shape="round" icon={<PlusOutlined />} size="large" onClick={() => setModal(true)}>
                {t('description.addProject')}
            </Button>
            <Button
                type="primary"
                shape="round"
                icon={<PlusOutlined />}
                size="large"
                onClick={() => setModalAssign(true)}
            >
                {t('description.addAssignee')}
            </Button>
        </section>
    );
};

export default AdminButtons;
