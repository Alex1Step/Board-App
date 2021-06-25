import React from 'react';
import { Form, Input, Button } from 'antd';
import styles from './AuthForm.less';
import { Iprops } from './interfaces';
import { useTranslation } from 'react-i18next';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const AuthForm = ({ handler, textOnButton }: Iprops): JSX.Element => {
    const { t } = useTranslation();

    return (
        <Form
            className={styles.authForm}
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={handler}
        >
            <Form.Item
                label={t('description.mail')}
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label={t('description.password')}
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    {textOnButton}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AuthForm;
