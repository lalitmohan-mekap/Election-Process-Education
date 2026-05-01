import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, describe } from 'vitest';
import Infographics from './Infographics';

// Mock the framer-motion library to simplify testing
vi.mock('framer-motion', () => {
  const React = require('react');
  return {
    motion: {
      div: React.forwardRef(({ children, ...props }: any, ref: any) => <div ref={ref} {...props}>{children}</div>),
      button: React.forwardRef(({ children, whileTap, ...props }: any, ref: any) => <button ref={ref} {...props}>{children}</button>),
    },
    useInView: () => true,
  };
});

describe('Infographics Component', () => {
  beforeAll(() => {
    // jsdom doesn't implement scrollBy
    window.HTMLElement.prototype.scrollBy = vi.fn();
    window.HTMLElement.prototype.scrollTo = vi.fn();
  });

  test('renders the main heading', () => {
    render(<Infographics />);
    expect(screen.getByText('Election Facts')).toBeInTheDocument();
  });

  test('renders infographic cards', () => {
    render(<Infographics />);
    // Verify that at least one card is rendered by checking for buttons (download/share buttons)
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  test('can click next navigation button', () => {
    render(<Infographics />);
    
    const nextButton = screen.getByLabelText('Next');
    expect(nextButton).toBeInTheDocument();
    
    // Click the button
    fireEvent.click(nextButton);
    
    // Smoke test: component should not crash
    expect(screen.getByText('Election Facts')).toBeInTheDocument();
  });
});
