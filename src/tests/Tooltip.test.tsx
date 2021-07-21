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

//with React-Testing-Library

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Tooltip from '../components/base/Tooltip/Tooltip';

describe('Tooltip', () => {
    it('Rendering correctly', () => {
        const spy = jest.fn(() => <span>tooltip</span>);
        const children = <span>show tooltip</span>;
        render(<Tooltip content={spy}>{children}</Tooltip>);
        expect(screen).toMatchSnapshot();
    });

    it('Rendering Tooltip component`s children without tooltip', () => {
        const spy = jest.fn(() => <span>tooltip</span>);
        const children = <button>show tooltip</button>;
        render(<Tooltip content={spy}>{children}</Tooltip>);
        expect(screen.getByText('show tooltip')).toBeInTheDocument();
    });

    it('Appeared when children on hover', () => {
        const spy = jest.fn(() => <span>tooltip</span>);
        const children = <button>show tooltip</button>;
        render(<Tooltip content={spy}>{children}</Tooltip>);
        userEvent.hover(screen.getByText('show tooltip'));
        expect(document.getElementsByClassName('tooltipBox')[0]).toHaveClass('visible');
    });

    it('Hide when children on unhover', () => {
        const spy = jest.fn(() => <span>tooltip</span>);
        const children = <button>show tooltip</button>;
        render(<Tooltip content={spy}>{children}</Tooltip>);
        userEvent.hover(screen.getByText('show tooltip'));
        expect(document.getElementsByClassName('tooltipBox')[0]).toHaveClass('visible');
        userEvent.unhover(screen.getByText('show tooltip'));
        expect(document.getElementsByClassName('tooltipBox')[0]).not.toHaveClass('visible');
    });
});
