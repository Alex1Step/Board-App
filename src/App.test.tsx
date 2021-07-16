import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Input from './components/base/forTests/TestInput';
import fetch from 'node-fetch';

const asyncTestFunc = () =>
    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then((response) => response.json())
        .then((json) => json.title);

describe('testing simple component', () => {
    const input = shallow(<Input />);

    test('render root element', () => {
        expect(input.find('div').exists()).toBeTruthy();
    });

    test('render child element', () => {
        expect(input.find('span')).toHaveLength(1);
        expect(input.find('div').children()).toHaveLength(2);
    });

    test('all child has classname "child" ', () => {
        expect(
            input
                .find('div')
                .children()
                .forEach((node) => expect(node.hasClass('child')).toBeTruthy()),
        );
    });

    it('change value in span', () => {
        expect(input.find('span').text()).toBe('hello');
        input.find('span').simulate('click');
        expect(input.find('span').text()).toBe('world');
    });

    //WITH SNAPSHOTS
    it('renders correctly', () => {
        const rend = renderer.create(<Input />).toJSON();
        expect(rend).toMatchSnapshot();
    });

    it('click function work correctly', () => {
        expect(input.childAt(0).prop('onClick')()).toEqual(44);
    });

    it('mock', () => {
        const mockFn = jest.fn(input.childAt(0).prop('onClick')).mockName('mockedFunction');
        mockFn();
        expect(mockFn.mock.calls.length).toBe(1);
    });

    it('mock have been called', () => {
        const mockFn = jest.fn(input.childAt(0).prop('onClick')).mockName('mockedFunction');
        mockFn();
        expect(mockFn).toHaveBeenCalled();
    });

    it('mock returned value', () => {
        const mock = jest.fn();
        mock.mockReturnValue(42);
        mock();
        expect(mock()).toBe(42);
    });
});

describe('async request', () => {
    test('recive responce', async () => {
        await expect(asyncTestFunc()).resolves.toBe('delectus aut autem');
        // await expect(Promise.resolve('lemon')).resolves.toBe('lemon');
        // await expect(Promise.resolve('lemon')).resolves.not.toBe('octopus');
    });
});
