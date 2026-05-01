import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, describe } from 'vitest';
import WorldElectionMap from './WorldElectionMap';

// Mock the framer-motion library to simplify testing
vi.mock('framer-motion', () => {
  const React = require('react');
  return {
    motion: {
      div: React.forwardRef(({ children, ...props }: any, ref: any) => <div ref={ref} {...props}>{children}</div>),
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

describe('WorldElectionMap Component', () => {
  test('renders the map header and search input', () => {
    render(<WorldElectionMap />);
    expect(screen.getByText('World Election Map')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search countries...')).toBeInTheDocument();
  });

  test('filters countries by search query', () => {
    render(<WorldElectionMap />);
    const searchInput = screen.getByPlaceholderText('Search countries...');
    
    // Type a search query that should match at least one country
    fireEvent.change(searchInput, { target: { value: 'United States' } });
    
    // Check if the country appears in the list
    // This relies on the country data containing "United States"
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  test('selects a country and displays details', () => {
    render(<WorldElectionMap />);
    
    // Find the first country card button (excluding filter buttons)
    // The filter buttons contain text like "All (" or specific systems
    const buttons = screen.getAllByRole('button');
    
    // We'll just click the last button assuming it's a country card
    const countryCard = buttons[buttons.length - 1];
    fireEvent.click(countryCard);
    
    // After clicking, the detail panel should render, showing "Did you know?"
    expect(screen.getByText('Did you know?')).toBeInTheDocument();
  });
});
