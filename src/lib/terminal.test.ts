import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  mkLine, blank, hr, resetId,
  getSuggestions, processCommand,
  cmdWhoami, cmdExperience, cmdSkills, cmdContact, cmdNeofetch, cmdGitBlame, cmdHelp,
  type CmdCallbacks,
} from './terminal';

beforeEach(() => resetId());

// ── Helpers ──────────────────────────────────────────────────────────────────

describe('mkLine', () => {
  it('creates a line with text and default type', () => {
    const line = mkLine('hello');
    expect(line).toEqual({ id: 0, text: 'hello', type: undefined });
  });

  it('creates a line with a specific type', () => {
    const line = mkLine('error msg', 'error');
    expect(line).toEqual({ id: 0, text: 'error msg', type: 'error' });
  });

  it('auto-increments ids', () => {
    const a = mkLine('a');
    const b = mkLine('b');
    expect(b.id).toBe(a.id + 1);
  });
});

describe('blank', () => {
  it('returns empty text', () => {
    expect(blank().text).toBe('');
  });
});

describe('hr', () => {
  it('without label returns 54-char line of ─', () => {
    const line = hr();
    expect(line.text).toBe('─'.repeat(54));
    expect(line.type).toBe('muted');
  });

  it('with label includes label text', () => {
    const line = hr('Test');
    expect(line.text).toContain('Test');
    expect(line.text).toMatch(/^──/);
  });
});

// ── getSuggestions ────────────────────────────────────────────────────────────

describe('getSuggestions', () => {
  it('returns [] for empty input', () => {
    expect(getSuggestions('')).toEqual([]);
  });

  it('returns matching commands for partial input', () => {
    expect(getSuggestions('e')).toEqual(['experience', 'exit']);
  });

  it('returns [] for exact command match', () => {
    expect(getSuggestions('help')).toEqual([]);
  });

  it('returns all files for "cat "', () => {
    const suggestions = getSuggestions('cat ');
    expect(suggestions).toHaveLength(5);
    expect(suggestions).toContain('about.txt');
    expect(suggestions).toContain('readme.md');
  });

  it('filters files for "cat a"', () => {
    expect(getSuggestions('cat a')).toEqual(['about.txt']);
  });

  it('returns [] for "cat z"', () => {
    expect(getSuggestions('cat z')).toEqual([]);
  });

  it('returns blame for "git "', () => {
    expect(getSuggestions('git ')).toEqual(['blame']);
  });

  it('returns blame for "git b"', () => {
    expect(getSuggestions('git b')).toEqual(['blame']);
  });

  it('returns [] for unknown command prefix', () => {
    expect(getSuggestions('zzz')).toEqual([]);
  });

  it('returns multiple matches for "s"', () => {
    const suggestions = getSuggestions('s');
    expect(suggestions).toContain('skills');
    expect(suggestions).toContain('sl');
    expect(suggestions).toContain('sudo');
  });
});

// ── processCommand ───────────────────────────────────────────────────────────

describe('processCommand', () => {
  const makeCbs = (): CmdCallbacks & { calls: Record<string, number> } => {
    const calls = { onExit: 0, onSl: 0, onClear: 0 };
    return {
      calls,
      onExit:  () => { calls.onExit++; },
      onSl:    () => { calls.onSl++; },
      onClear: () => { calls.onClear++; },
    };
  };

  it('help returns lines including "Available commands"', () => {
    const cbs = makeCbs();
    const lines = processCommand('help', cbs);
    expect(lines.some(l => l.text.includes('Available commands'))).toBe(true);
  });

  it('whoami first line is hero name with rust type', () => {
    const cbs = makeCbs();
    const lines = processCommand('whoami', cbs);
    expect(lines[0].type).toBe('rust');
    expect(lines[0].text).toBeTruthy();
  });

  it('experience contains work history header', () => {
    const cbs = makeCbs();
    const lines = processCommand('experience', cbs);
    expect(lines.some(l => l.text.includes('Work History'))).toBe(true);
  });

  it('skills contains skills header', () => {
    const cbs = makeCbs();
    const lines = processCommand('skills', cbs);
    expect(lines.some(l => l.text.includes('Skills'))).toBe(true);
  });

  it('contact contains contact header', () => {
    const cbs = makeCbs();
    const lines = processCommand('contact', cbs);
    expect(lines.some(l => l.text.includes('Contact'))).toBe(true);
  });

  it('ls lists all 5 files', () => {
    const cbs = makeCbs();
    const lines = processCommand('ls', cbs);
    expect(lines[0].text).toContain('about.txt');
    expect(lines[0].text).toContain('readme.md');
    expect(lines[0].type).toBe('muted');
  });

  it('cat about.txt returns whoami output', () => {
    const cbs = makeCbs();
    const catLines = processCommand('cat about.txt', cbs);
    resetId();
    const whoamiLines = cmdWhoami();
    expect(catLines.map(l => l.text)).toEqual(whoamiLines.map(l => l.text));
  });

  it('cat without arg returns error', () => {
    const cbs = makeCbs();
    const lines = processCommand('cat', cbs);
    expect(lines[0].text).toContain('missing file operand');
    expect(lines[0].type).toBe('error');
  });

  it('cat nonexistent returns error', () => {
    const cbs = makeCbs();
    const lines = processCommand('cat nonexistent', cbs);
    expect(lines[0].text).toContain('No such file or directory');
    expect(lines[0].type).toBe('error');
  });

  it('neofetch contains "Arch Linux btw"', () => {
    const cbs = makeCbs();
    const lines = processCommand('neofetch', cbs);
    expect(lines.some(l => l.text.includes('Arch Linux btw'))).toBe(true);
  });

  it('git blame returns 5 blame lines', () => {
    const cbs = makeCbs();
    const lines = processCommand('git blame', cbs);
    expect(lines).toHaveLength(5);
    expect(lines.every(l => l.type === 'muted')).toBe(true);
  });

  it('sl calls onSl callback and returns choo choo', () => {
    const cbs = makeCbs();
    const lines = processCommand('sl', cbs);
    expect(cbs.calls.onSl).toBe(1);
    expect(lines[0].text).toContain('Choo choo');
  });

  it('sudo rm -rf / returns "Nice try" error', () => {
    const cbs = makeCbs();
    const lines = processCommand('sudo rm -rf /', cbs);
    expect(lines[0].text).toContain('Nice try');
    expect(lines[0].type).toBe('error');
  });

  it('clear calls onClear and returns []', () => {
    const cbs = makeCbs();
    const lines = processCommand('clear', cbs);
    expect(cbs.calls.onClear).toBe(1);
    expect(lines).toEqual([]);
  });

  it('exit calls onExit', () => {
    const cbs = makeCbs();
    processCommand('exit', cbs);
    expect(cbs.calls.onExit).toBe(1);
  });

  it('unknown command returns "command not found"', () => {
    const cbs = makeCbs();
    const lines = processCommand('foobar', cbs);
    expect(lines[0].text).toContain('command not found');
    expect(lines[0].type).toBe('error');
  });

  it('empty string returns []', () => {
    const cbs = makeCbs();
    expect(processCommand('', cbs)).toEqual([]);
  });

  it('whitespace-padded input works', () => {
    const cbs = makeCbs();
    const lines = processCommand('  help  ', cbs);
    expect(lines.some(l => l.text.includes('Available commands'))).toBe(true);
  });

  it('git with unknown subcommand returns error', () => {
    const cbs = makeCbs();
    const lines = processCommand('git push', cbs);
    expect(lines[0].text).toContain('not a git command');
    expect(lines[0].type).toBe('error');
  });

  it('cat readme.md returns portfolio terminal info', () => {
    const cbs = makeCbs();
    const lines = processCommand('cat readme.md', cbs);
    expect(lines[0].text).toContain('Portfolio Terminal');
  });
});

// ── Command output functions ─────────────────────────────────────────────────

describe('command output functions', () => {
  it('cmdHelp includes clickable action lines', () => {
    const lines = cmdHelp();
    const actionLines = lines.filter(l => l.action);
    expect(actionLines.length).toBeGreaterThan(0);
    expect(actionLines.some(l => l.action === 'whoami')).toBe(true);
  });

  it('cmdNeofetch includes ferris art and system info', () => {
    const lines = cmdNeofetch();
    expect(lines.length).toBeGreaterThanOrEqual(6);
    expect(lines.some(l => l.text.includes('ivan@portfolio'))).toBe(true);
  });

  it('cmdGitBlame returns 5 muted lines', () => {
    const lines = cmdGitBlame();
    expect(lines).toHaveLength(5);
    lines.forEach(l => expect(l.type).toBe('muted'));
  });
});
