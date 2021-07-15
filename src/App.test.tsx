import React from 'react';
import { shallow } from 'enzyme';
import Input from './components/base/forTests/TestInput';

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

    test('change value in span', () => {
        expect(input.find('span').text()).toBe('hello');
        input.find('span').simulate('click');
        expect(input.find('span').text()).toBe('world');
    });
});
