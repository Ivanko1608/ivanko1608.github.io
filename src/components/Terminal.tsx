import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  type LineType, type OutputLine, type CmdCallbacks,
  mkLine, getSuggestions, processCommand,
  BOOT_LINES, GRUB_COUNTDOWN_START, BOX_W, GRUB_ENTRIES, SL_ART,
} from '../lib/terminal';

type Phase = 'grub' | 'boot' | 'shell';

interface TerminalProps {
  onBack: () => void;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function Terminal({ onBack }: TerminalProps) {
  const [phase,      setPhase]      = useState<Phase>('grub');
  const [countdown,  setCountdown]  = useState(GRUB_COUNTDOWN_START);
  const [bootLines,  setBootLines]  = useState<string[]>([]);
  const [history,    setHistory]    = useState<OutputLine[]>([]);
  const [input,      setInput]      = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [showSl,     setShowSl]     = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => getSuggestions(input), [input]);

  // ── GRUB ────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (phase !== 'grub') return;
    if (countdown <= 0) { setPhase('boot'); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, countdown]);

  useEffect(() => {
    if (phase !== 'grub') return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') { e.preventDefault(); setPhase('boot'); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [phase]);

  // ── Boot ─────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (phase !== 'boot') return;
    let cancelled = false;
    let i = 0;
    const next = () => {
      if (cancelled || i >= BOOT_LINES.length) {
        if (!cancelled) setPhase('shell');
        return;
      }
      const { text, delay } = BOOT_LINES[i++];
      setBootLines(prev => [...prev, text]);
      setTimeout(next, delay);
    };
    next();
    return () => { cancelled = true; };
  }, [phase]);

  // ── Auto-scroll ──────────────────────────────────────────────────────────────

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [bootLines, history, phase]);

  useEffect(() => {
    if (phase === 'shell') inputRef.current?.focus();
  }, [phase]);

  // ── SL ───────────────────────────────────────────────────────────────────────

  const handleSl = useCallback(() => {
    setShowSl(true);
    setTimeout(() => setShowSl(false), 6500);
  }, []);

  // ── Commands ─────────────────────────────────────────────────────────────────

  const execCommand = useCallback((raw: string) => {
    const prompt = mkLine(`ivan@portfolio:~$ ${raw}`, 'dim');
    let cleared = false;
    const cbs: CmdCallbacks = {
      onExit:  onBack,
      onSl:    handleSl,
      onClear: () => { cleared = true; setHistory([]); },
    };
    const output = processCommand(raw, cbs);
    if (raw.trim()) setCmdHistory(prev => [raw, ...prev]);
    setHistoryIdx(-1);
    setInput('');
    if (!cleared) setHistory(prev => [...prev, prompt, ...output]);
  }, [onBack, handleSl]);

  // ── Autocomplete ─────────────────────────────────────────────────────────────

  const applyCompletion = useCallback((suggestion: string, execute = false) => {
    const hasTrail = input.endsWith(' ');
    const parts    = input.trimStart().split(/\s+/);
    let completed: string;
    if (parts.length <= 1 && !hasTrail) {
      completed = suggestion;
    } else {
      parts[parts.length - 1] = suggestion;
      completed = parts.join(' ');
    }

    if (execute) {
      execCommand(completed);
    } else {
      setInput(completed + ' ');
    }
    inputRef.current?.focus();
  }, [input, execCommand]);

  const handleSubmit = useCallback(() => {
    execCommand(input);
  }, [input, execCommand]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length === 1) applyCompletion(suggestions[0]);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHistoryIdx(prev => {
        const next = Math.min(prev + 1, cmdHistory.length - 1);
        setInput(cmdHistory[next] ?? '');
        return next;
      });
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHistoryIdx(prev => {
        const next = Math.max(prev - 1, -1);
        setInput(next === -1 ? '' : (cmdHistory[next] ?? ''));
        return next;
      });
    }
  }, [handleSubmit, applyCompletion, suggestions, cmdHistory]);

  // ── Helpers ───────────────────────────────────────────────────────────────────

  const lineColor = (type?: LineType): string => {
    switch (type) {
      case 'rust':    return '#66ff33';     // bright phosphor
      case 'success': return '#66ff33';
      case 'error':   return '#ff4444';
      case 'muted':   return '#33bb11';     // dim phosphor
      case 'dim':     return '#2eaa1e';     // very dim
      default:        return '#33ff00';     // standard phosphor green
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div className="crt" style={styles.root} onClick={() => {
      if (!window.getSelection()?.toString()) inputRef.current?.focus();
    }}>
      <div className="crt-content">

      {/* ── SL overlay ───────────────────────────────────────────────────── */}
      {showSl && (
        <pre style={styles.slPre}>{SL_ART}</pre>
      )}

      {/* ── GRUB ─────────────────────────────────────────────────────────── */}
      {phase === 'grub' && (
        <div style={styles.grubScreen}>
          <div style={styles.mono}>GNU GRUB  version 2.12</div>
          <div style={styles.mono}>&nbsp;</div>

          {/* top border */}
          <div style={styles.mono}>{' ┌' + '─'.repeat(BOX_W) + '┐'}</div>

          {/* selected entry — same │·space prefix as others */}
          <div style={styles.mono}>
            {' │ '}
            <span style={styles.grubSelected}>{GRUB_ENTRIES[0].padEnd(BOX_W - 2)}</span>
            {' │'}
          </div>

          {/* non-selected entries — identical prefix structure */}
          {GRUB_ENTRIES.slice(1).map((entry, i) => (
            <div key={i} style={styles.mono}>
              {' │ ' + entry.padEnd(BOX_W - 2) + ' │'}
            </div>
          ))}

          {/* bottom border */}
          <div style={styles.mono}>{' └' + '─'.repeat(BOX_W) + '┘'}</div>

          <div style={styles.mono}>&nbsp;</div>
          <div style={styles.grubHint}>Use the ↑ and ↓ keys to change the selection.</div>
          <div style={styles.grubHint}>Press enter to boot the selected OS, 'e' to edit the commands</div>
          <div style={styles.grubHint}>before booting or 'c' for a command-line.</div>
          <div style={styles.mono}>&nbsp;</div>
          <div style={styles.grubHint}>
            The highlighted entry will be executed automatically in{' '}
            <span style={{ color: '#66ff33' }}>{countdown}s</span>
          </div>
        </div>
      )}

      {/* ── Boot ─────────────────────────────────────────────────────────── */}
      {phase === 'boot' && (
        <div style={styles.bootScreen}>
          {bootLines.map((text, i) => (
            <div key={i} style={styles.bootLine}>{text || '\u00a0'}</div>
          ))}
          <div ref={bottomRef} />
        </div>
      )}

      {/* ── Shell ────────────────────────────────────────────────────────── */}
      {phase === 'shell' && (
        <div style={styles.shell}>
          <button style={styles.backBtn} onClick={onBack}>← back to landing</button>

          {history.map(l => (
            <div
              key={l.id}
              onClick={l.action ? () => execCommand(l.action!) : undefined}
              style={{
                ...styles.shellLine,
                color:      lineColor(l.type),
                opacity:    l.type === 'dim' ? 0.55 : 1,
                fontWeight: l.type === 'rust' ? 600 : 400,
                ...(l.action ? styles.clickableLine : undefined),
              }}
            >
              {l.text || '\u00a0'}
            </div>
          ))}

          {/* Suggestion pills (visible on all devices, essential on mobile) */}
          {suggestions.length > 0 && (
            <div style={styles.pillRow}>
              {suggestions.map(s => (
                <button key={s} style={styles.pill} onClick={() => applyCompletion(s, true)}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input line */}
          <div style={styles.inputRow}>
            <span style={styles.prompt}>ivan@portfolio:~$&nbsp;</span>
            <span style={styles.inputMirror}>{input}</span>
            <span style={styles.caret}>▋</span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => { setInput(e.target.value); setHistoryIdx(-1); }}
              onKeyDown={handleKeyDown}
              style={styles.hiddenInput}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
            />
          </div>

          <div ref={bottomRef} />
        </div>
      )}
      </div>{/* end crt-content */}
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const MONO: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize:   '13px',
  lineHeight: 1.55,
};

const styles = {
  root: {
    minHeight:  '100dvh',
    background: '#0a0a0a',
    color:      '#33ff00',
    overflowX:  'hidden',
    cursor:     'text',
    ...MONO,
  } as React.CSSProperties,

  // ── GRUB ──────────────────────────────────────────────────────────────────
  grubScreen: {
    padding: '3rem 2rem',
    ...MONO,
  } as React.CSSProperties,

  mono: {
    ...MONO,
    color:      '#33ff00',
    whiteSpace: 'pre',
  } as React.CSSProperties,

  grubHint: {
    ...MONO,
    color: '#33bb11',
  } as React.CSSProperties,

  grubSelected: {
    background: '#33ff00',
    color:      '#000',
    whiteSpace: 'pre',
  } as React.CSSProperties,

  // ── Boot ──────────────────────────────────────────────────────────────────
  bootScreen: {
    padding: '1rem 1.5rem',
    ...MONO,
    color: '#33ff00',
  } as React.CSSProperties,

  bootLine: {
    ...MONO,
    whiteSpace: 'pre-wrap',
    lineHeight: 1.4,
  } as React.CSSProperties,

  // ── Shell ─────────────────────────────────────────────────────────────────
  shell: {
    padding:       '1.5rem',
    display:       'flex',
    flexDirection: 'column',
    minHeight:     '100dvh',
    ...MONO,
  } as React.CSSProperties,

  backBtn: {
    background:    'none',
    border:        'none',
    color:         '#2eaa1e',
    cursor:        'pointer',
    ...MONO,
    fontSize:      '0.72rem',
    letterSpacing: '0.08em',
    textAlign:     'left',
    padding:       '0 0 1.5rem 0',
    transition:    'color 0.2s',
  } as React.CSSProperties,

  shellLine: {
    ...MONO,
    lineHeight: 1.5,
    whiteSpace: 'pre-wrap',
    wordBreak:  'break-word',
  } as React.CSSProperties,

  clickableLine: {
    cursor:       'pointer',
    borderRadius: '2px',
    transition:   'background 0.15s',
  } as React.CSSProperties,

  pillRow: {
    display:    'flex',
    flexWrap:   'wrap',
    gap:        '0.4rem',
    padding:    '0.5rem 0',
  } as React.CSSProperties,

  pill: {
    background:    'transparent',
    border:        '1px solid #33bb11',
    borderRadius:  '3px',
    color:         '#33bb11',
    cursor:        'pointer',
    padding:       '0.15rem 0.5rem',
    ...MONO,
    fontSize:      '0.72rem',
    transition:    'border-color 0.15s, color 0.15s',
  } as React.CSSProperties,

  inputRow: {
    display:    'flex',
    alignItems: 'center',
    marginTop:  '0.1rem',
    position:   'relative',
  } as React.CSSProperties,

  prompt: {
    color:      '#66ff33',
    flexShrink: 0,
    ...MONO,
  } as React.CSSProperties,

  inputMirror: {
    color:      '#44ff11',
    whiteSpace: 'pre',
    ...MONO,
  } as React.CSSProperties,

  caret: {
    color:     '#33ff00',
    animation: 'blink 1.1s step-end infinite',
    ...MONO,
  } as React.CSSProperties,

  hiddenInput: {
    position:   'absolute',
    opacity:    0,
    width:      '100%',
    height:     '100%',
    top:        0,
    left:       0,
    cursor:     'text',
    border:     'none',
    background: 'transparent',
    outline:    'none',
    ...MONO,
  } as React.CSSProperties,

  slPre: {
    position:      'fixed',
    bottom:        '120px',
    left:          0,
    color:         '#33ff00',
    ...MONO,
    lineHeight:    1.35,
    whiteSpace:    'pre',
    animation:     'sl-move 6s linear forwards',
    pointerEvents: 'none',
    zIndex:        200,
  } as React.CSSProperties,
} as const;
