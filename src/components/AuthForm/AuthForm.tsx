import React, { Props } from 'react';
import styles from './AuthForm.less';

import { Form, Input, Button } from 'antd';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

interface LoginI {
    password: string;
    username: string;
}

interface PropsI {
    handler: (values: LoginI) => void;
    textOnButton: string;
}

const AuthForm = (props: PropsI) => {
    return (
        <Form {...layout} name="basic" initialValues={{ remember: true }} onFinish={props.handler}>
            <Form.Item
                label="Username"
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
