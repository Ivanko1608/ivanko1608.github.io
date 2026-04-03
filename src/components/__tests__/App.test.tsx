import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../App';

beforeAll(() => {
  // jsdom doesn't implement matchMedia or IntersectionObserver
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  class MockIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

  class MockResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  vi.stubGlobal('ResizeObserver', MockResizeObserver);
});

describe('App', () => {
  beforeEach(() => {
    window.location.hash = '';
  });

  it('default view is landing page', () => {
    render(<App />);
    expect(screen.getByText('Ivan Kramarenko')).toBeInTheDocument();
    expect(screen.getByText(/View Resume/)).toBeInTheDocument();
    expect(screen.getByText(/Go Deeper/)).toBeInTheDocument();
  });

  it('clicking "Go Deeper" switches to terminal view', () => {
    vi.useFakeTimers();
    render(<App />);
    fireEvent.click(screen.getByText(/Go Deeper/));
    expect(screen.getByText(/GNU GRUB/)).toBeInTheDocument();
    expect(screen.queryByText(/View Resume/)).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it('clicking "View Resume" switches to HR view', () => {
    render(<App />);
    fireEvent.click(screen.getByText(/View Resume/));
    // Landing should be gone
    expect(screen.queryByText(/Go Deeper/)).not.toBeInTheDocument();
    // HR view should have rendered real content
    expect(screen.getByText('← back')).toBeInTheDocument();
    expect(screen.getByText(/Available for EU remote roles/)).toBeInTheDocument();
  });
});
