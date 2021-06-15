import React from 'react';
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

const AuthForm: React.FunctionComponent = () => {
    //LogIn handler
    const onFinish = async (values: LoginI) => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAgTJyexl3AhXyoRfnB6LSyv0ZBoaP3Nm8',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: values.username,
                    password: values.password,
                    returnSecureToken: true,
                }),
            },
        )
            .then((response) => response.json())
            .then((response) => console.log(response));
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
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
                    Log In
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AuthForm;
