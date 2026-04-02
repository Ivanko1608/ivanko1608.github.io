import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Landing } from '../Landing';

describe('Landing', () => {
  it('renders name', () => {
    render(<Landing onResume={vi.fn()} onTerminal={vi.fn()} />);
    expect(screen.getByText('Ivan Kramarenko')).toBeInTheDocument();
  });

  it('renders both buttons', () => {
    render(<Landing onResume={vi.fn()} onTerminal={vi.fn()} />);
    expect(screen.getByText(/View Resume/)).toBeInTheDocument();
    expect(screen.getByText(/Go Deeper/)).toBeInTheDocument();
  });

  it('clicking View Resume calls onResume', () => {
    const onResume = vi.fn();
    render(<Landing onResume={onResume} onTerminal={vi.fn()} />);
    fireEvent.click(screen.getByText(/View Resume/));
    expect(onResume).toHaveBeenCalledOnce();
  });

  it('clicking Go Deeper calls onTerminal', () => {
    const onTerminal = vi.fn();
    render(<Landing onResume={vi.fn()} onTerminal={onTerminal} />);
    fireEvent.click(screen.getByText(/Go Deeper/));
    expect(onTerminal).toHaveBeenCalledOnce();
  });
});
