Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import ButtonComponent from '../components/base/Button/ButtonComponent';
import { Button } from 'antd';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Button for deleting components', () => {
    it('Rendering correctly', () => {
        const spy = jest.fn();
        const rend = renderer.create(<ButtonComponent classes="test" message="message" onClick={spy} />).toJSON();
        expect(rend).toMatchSnapshot();
    });

    it('On click function works', () => {
        const spy = jest.fn();
        const btnElement = shallow(<ButtonComponent classes="test" message="message" onClick={spy} />);
        btnElement.find(Button).simulate('click');
        btnElement.find(Button).simulate('click');
        btnElement.find(Button).simulate('click');
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.calls.length).toEqual(3);
    });

    it('Has inner content and own view', () => {
        const spy = jest.fn();
        const btnElement = mount(<ButtonComponent classes="test" message="message" onClick={spy} />);
        expect(btnElement.find('svg').exists()).toBeTruthy();
    });

    //with TESTING-LIBRARY
    it('Tooltip appears', async () => {
        render(
            <ButtonComponent
                classes="test"
                message="message!!!"
                onClick={() => {
                    'test';
                }}
            />,
        );
        const btn = screen.getByTestId('btnWithTooltip');
        fireEvent.mouseEnter(btn);
        await waitFor(() => expect(screen.queryByText('message!!!')).not.toBeNull());
    });
});
