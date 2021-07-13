import React from 'react';

import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { IAdminsButton } from './interfaces';

import { useTranslation } from 'react-i18next';

import styles from './AdminButtons.less';

const AdminButtons = (props: IAdminsButton): React.ReactElement => {
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
