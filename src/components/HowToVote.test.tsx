
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, describe } from 'vitest';
import HowToVote from './HowToVote';

// Mock the framer-motion library to simplify testing
vi.mock('framer-motion', () => {
  const React = require('react');
  return {
    motion: {
      div: React.forwardRef(({ children, ...props }: any, ref: any) => <div ref={ref} {...props}>{children}</div>),
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
    useInView: () => true,
  };
});

describe('HowToVote Component', () => {
  test('renders the main heading', () => {
    render(<HowToVote />);
    expect(screen.getByText('How to Vote')).toBeInTheDocument();
  });

  test('renders the dropdown instruction text', () => {
    render(<HowToVote />);
    expect(screen.getByText('Select your country to get a tailored, step-by-step guide on how voting works where you live.')).toBeInTheDocument();
  });

  test('opens dropdown on click', () => {
    render(<HowToVote />);
    
    // Check initial state
    expect(screen.getByText('Select your country...')).toBeInTheDocument();

    // Click the dropdown trigger
    const dropdownTrigger = screen.getByText('Select your country...');
    fireEvent.click(dropdownTrigger);
    
    // Search input should appear
    expect(screen.getByPlaceholderText('Search countries...')).toBeInTheDocument();
  });
});
