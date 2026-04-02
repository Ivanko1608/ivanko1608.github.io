import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Terminal } from '../Terminal';

// Skip GRUB by pressing Enter, then flush boot sequence timers
async function skipToShell() {
  // Press Enter to skip GRUB countdown → boot phase
  await act(async () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
  });
  // Flush all boot sequence timers (sequential setTimeout chain)
  for (let i = 0; i < 30; i++) {
    await act(async () => {
      vi.advanceTimersByTime(200);
    });
  }
}

function getInput(): HTMLInputElement {
  const input = document.querySelector('input');
  if (!input) throw new Error('Input not found — shell phase not reached');
  return input;
}

describe('Terminal component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts in GRUB phase', () => {
    const { container } = render(<Terminal onBack={vi.fn()} />);
    expect(container.textContent).toContain('GNU GRUB');
  });

  it('transitions to shell after boot', async () => {
    render(<Terminal onBack={vi.fn()} />);
    await skipToShell();
    const input = document.querySelector('input');
    expect(input).toBeTruthy();
  });

  it('typing and pressing Enter runs a command', async () => {
    render(<Terminal onBack={vi.fn()} />);
    await skipToShell();

    const input = getInput();
    await act(async () => {
      fireEvent.change(input, { target: { value: 'help' } });
    });
    await act(async () => {
      fireEvent.keyDown(input, { key: 'Enter' });
    });

    expect(screen.getByText(/Available commands/)).toBeInTheDocument();
  });

  it('clear command empties all history', async () => {
    render(<Terminal onBack={vi.fn()} />);
    await skipToShell();

    const input = getInput();

    // Run a command first
    await act(async () => {
      fireEvent.change(input, { target: { value: 'help' } });
    });
    await act(async () => {
      fireEvent.keyDown(input, { key: 'Enter' });
    });
    expect(screen.getByText(/Available commands/)).toBeInTheDocument();

    // Now clear
    const inputAfter = getInput();
    await act(async () => {
      fireEvent.change(inputAfter, { target: { value: 'clear' } });
    });
    await act(async () => {
      fireEvent.keyDown(inputAfter, { key: 'Enter' });
    });

    expect(screen.queryByText(/Available commands/)).not.toBeInTheDocument();
    expect(screen.queryByText(/ivan@portfolio:~\$ help/)).not.toBeInTheDocument();
  });

  it('exit calls onBack', async () => {
    const onBack = vi.fn();
    render(<Terminal onBack={onBack} />);
    await skipToShell();

    const input = getInput();
    await act(async () => {
      fireEvent.change(input, { target: { value: 'exit' } });
    });
    await act(async () => {
      fireEvent.keyDown(input, { key: 'Enter' });
    });

    expect(onBack).toHaveBeenCalledOnce();
  });

  it('clicking a suggestion pill auto-executes the command', async () => {
    render(<Terminal onBack={vi.fn()} />);
    await skipToShell();

    const input = getInput();

    // Type partial command to get suggestions
    await act(async () => {
      fireEvent.change(input, { target: { value: 'hel' } });
    });

    // Find and click the "help" pill
    const pill = screen.getByRole('button', { name: 'help' });
    await act(async () => {
      fireEvent.click(pill);
    });

    expect(screen.getByText(/Available commands/)).toBeInTheDocument();
  });

  it('clicking a help line with action executes that command', async () => {
    render(<Terminal onBack={vi.fn()} />);
    await skipToShell();

    const input = getInput();

    // First run help
    await act(async () => {
      fireEvent.change(input, { target: { value: 'help' } });
    });
    await act(async () => {
      fireEvent.keyDown(input, { key: 'Enter' });
    });

    // Click the "whoami" line
    const whoamiLine = screen.getByText(/whoami\s+about me/);
    await act(async () => {
      fireEvent.click(whoamiLine);
    });

    expect(screen.getByText(/Backend Engineer/)).toBeInTheDocument();
  });
});
