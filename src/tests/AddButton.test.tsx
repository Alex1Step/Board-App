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

//with ENZYME

import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import AddButton from '../components/base/AddButton/AddButton';
import { Button } from 'antd';

describe('Button for adding components', () => {
    it('Rendering correctly', () => {
        const spy = jest.fn();
        const rend = renderer
            .create(<AddButton className="addBoard" text="text" type="primary" onClick={spy} />)
            .toJSON();
        expect(rend).toMatchSnapshot();
    });

    it('On click function works', () => {
        const spy = jest.fn();
        const btnElement = shallow(<AddButton className="addBoard" text="text" type="primary" onClick={spy} />);
        btnElement.find(Button).simulate('click');
        btnElement.find(Button).simulate('click');
        btnElement.find(Button).simulate('click');
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.calls.length).toEqual(3);
    });
    //CLASSES
    it('Has classes', () => {
        const spy = jest.fn();
        const btnElement = shallow(<AddButton className="addBoard" text="text" type="primary" onClick={spy} />);
        // console.log(btnElement.find(Button).debug());
        // expect(btnElement.find(Button).hasClass('addButton')).toBeTruthy();
    });

    it('Has label text', () => {
        const spy = jest.fn();
        const btnElement = mount(<AddButton className="addBoard" text="text" type="primary" onClick={spy} />);
        expect(btnElement.find(Button).text()).toBe('text');
    });
});
