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
import renderer, { act } from 'react-test-renderer';
import CustomForm from './components/custom/CustomForm/CustomForm';
import indexValidation from './validation/indexValidation';
import { Button, Input } from 'antd';
import { waitFor } from '@testing-library/react';
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

    it('submitting', async () => {
        const spy = jest.fn((values) => {
            values;
        });
        const form = mount(
            <CustomForm
                validation={indexValidation.authSchema}
                formSettings={{ submit: spy }}
                itemsSettings={[
                    {
                        type: 'input',
                        label: 'mail',
                        name: 'username',
                        inputType: 'input',
                        defaultValue: 'uni-omni@mail.ru',
                    },
                    {
                        type: 'input',
                        label: 'password',
                        name: 'password',
                        inputType: 'password',
                        defaultValue: '123123123',
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
        form.find('form').simulate('submit');

        await waitFor(() => {
            expect(spy.mock.calls.length).toBe(1);
            expect(spy).toHaveBeenCalled();
        });
    });

    it('submitting', async () => {
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

        form.find('input[name="username"]').forEach((item) => {
            item.simulate('change', { target: { name: 'username', value: 'qweasdzxc@qweasdzxc.ru' } });
        });

        await waitFor(() => {
            form.find('input[name="username"]').forEach((item) =>
                expect(item.prop('value')).toEqual('qweasdzxc@qweasdzxc.ru'),
            );
        });
    });
});
