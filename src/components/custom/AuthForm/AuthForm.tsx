import React from 'react';
//components
import { Form, Input, Button } from 'antd';
//styles
import styles from './AuthForm.less';
//interfaces
import { Iprops } from './interfaces';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const AuthForm = (props: Iprops): JSX.Element => {
    return (
        <Form
            className={styles.AuthForm}
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={props.handler}
        >
            <Form.Item
                label="Mail"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    {props.textOnButton}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AuthForm;
