Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import CustomForm from './components/custom/CustomForm/CustomForm';
import indexValidation from './validation/indexValidation';
import { Button, Input } from 'antd';
// import Password from 'antd/lib/input/Password';

describe('form', () => {
    it('renders correctly', () => {
        const onFinish = jest.fn();

        const rend = renderer
            .create(
                <CustomForm
                    validation={indexValidation.authSchema}
                    formSettings={{ submit: onFinish }}
                    itemsSettings={[
                        {
                            type: 'input',
                            label: 'mail',
                            name: 'username',
                            inputType: 'input',
                        },
                        {
                            type: 'input',
                            label: 'password',
                            name: 'password',
                            inputType: 'password',
                        },
                        {
                            type: 'button',
                            label: 'signin',
                            name: 'signin',
                            defaultValue: 'signIn',
                            htmlType: 'submit',
                        },
                    ]}
                />,
            )
            .toJSON();
        expect(rend).toMatchSnapshot();
    });

    it('submitting', () => {
        const onFinish = jest.fn((values) => console.log(values));
        const form = mount(
            <CustomForm
                validation={indexValidation.authSchema}
                formSettings={{ submit: onFinish }}
                itemsSettings={[
                    {
                        type: 'input',
                        label: 'mail',
                        name: 'username',
                        inputType: 'input',
                    },
                    {
                        type: 'input',
                        label: 'password',
                        name: 'password',
                        inputType: 'password',
                    },
                    {
                        type: 'button',
                        label: 'signin',
                        name: 'signin',
                        defaultValue: 'signIn',
                        htmlType: 'submit',
                    },
                ]}
            />,
        );
        form.find('button').forEach((item) => item.prop('onClick'));

        expect(onFinish.mock.calls.length).toBe(1);
        expect(onFinish).toHaveBeenCalled();
    });

    it('submitting', () => {
        const onFinish = jest.fn(() => console.log('hello'));
        const form = mount(
            <CustomForm
                validation={indexValidation.authSchema}
                formSettings={{ submit: onFinish }}
                itemsSettings={[
                    {
                        type: 'input',
                        label: 'mail',
                        name: 'username',
                        inputType: 'input',
                        defaultValue: 'first',
                    },
                    {
                        type: 'input',
                        label: 'password',
                        name: 'password',
                        inputType: 'password',
                        defaultValue: 'second',
                    },
                    {
                        type: 'button',
                        label: 'signin',
                        name: 'signin',
                        defaultValue: 'signIn',
                        htmlType: 'submit',
                    },
                ]}
            />,
        );
        // console.log(form.debug());
        // console.log(form.find('input').debug());
        form.find('input').forEach((item) => item.simulate('change', { target: { value: 100 } }));
        form.find('input').forEach((item) => console.log(item.prop('name')));
    });
});
