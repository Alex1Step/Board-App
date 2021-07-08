import React from 'react';
import InputComponent from '../../base/Input/InputComponent';
import styles from './AdminModalContent.less';
import { Form, Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { IAdminModalContent } from './interfaces';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
    },
};

const AdminModalContent = (props: IAdminModalContent): JSX.Element => {
    const { isModal, title, setProjectTitle, addAssignee } = props;
    const { t } = useTranslation();

    return (
        <div className={styles.forModal}>
            {isModal ? (
                <InputComponent
                    type={'text'}
                    label={''}
                    value={title}
                    onChange={(event) => {
                        setProjectTitle(event.target.value);
                    }}
                    withoutSubstitution={true}
                />
            ) : (
                <Form {...layout} name="nest-messages" onFinish={addAssignee} validateMessages={validateMessages}>
                    <Form.Item name={['user', 'name']} label={t('description.name')} rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'email']} label={t('description.mail')} rules={[{ type: 'email' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            {t('description.add')}
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </div>
    );
};

export default AdminModalContent;
