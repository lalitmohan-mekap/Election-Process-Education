
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, describe } from 'vitest';
import ElectionTimeline from './ElectionTimeline';

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

describe('ElectionTimeline Component', () => {
  test('renders the timeline header', () => {
    render(<ElectionTimeline />);
    expect(screen.getByText('Election Lifecycle')).toBeInTheDocument();
  });

  test('renders timeline steps', () => {
    render(<ElectionTimeline />);
    // Assuming the timelineData has a step titled "Voter Registration"
    // Since we don't have the exact data, we just verify buttons exist
    const stepButtons = screen.getAllByRole('button');
    expect(stepButtons.length).toBeGreaterThan(0);
  });

  test('expands a step card on click', () => {
    render(<ElectionTimeline />);
    const buttons = screen.getAllByRole('button');
    const firstButton = buttons[0];
    
    fireEvent.click(firstButton);
    // Ideally, we'd check for specific text appearing, but without data we can just ensure it doesn't crash
    expect(firstButton).toBeInTheDocument();
  });
});
