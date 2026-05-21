import { useMemo, useState } from 'react'
import './App.css'

const POSITIVE_WORDS = new Set([
  'adore',
  'amazing',
  'beloved',
  'bright',
  'care',
  'cherish',
  'dear',
  'gentle',
  'grace',
  'heart',
  'joy',
  'kind',
  'love',
  'radiant',
  'sweet',
  'warm',
])

const NEGATIVE_WORDS = new Set([
  'afraid',
  'alone',
  'cold',
  'distant',
  'doubt',
  'empty',
  'fear',
  'forget',
  'grief',
  'hurt',
  'lost',
  'pain',
  'regret',
  'sad',
  'silence',
  'sorry',
])

const STOP_WORDS = new Set([
  'a',
  'an',
  'and',
  'are',
  'as',
  'at',
  'be',
  'but',
  'by',
  'for',
  'from',
  'if',
  'in',
  'is',
  'it',
  'my',
  'of',
  'on',
  'or',
  'our',
  'that',
  'the',
  'their',
  'this',
  'to',
  'we',
  'with',
  'you',
  'your',
])

function tokenize(text) {
  return (text.toLowerCase().match(/[a-z']+/g) ?? []).filter(Boolean)
}

function getTopKeywords(tokens) {
  const frequencies = new Map()

  for (const token of tokens) {
    if (STOP_WORDS.has(token)) continue
    frequencies.set(token, (frequencies.get(token) ?? 0) + 1)
  }

  return [...frequencies.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 4)
    .map(([word]) => word)
}

function computeSentiment(tokens) {
  let score = 0

  for (const token of tokens) {
    if (POSITIVE_WORDS.has(token)) score += 1
    if (NEGATIVE_WORDS.has(token)) score -= 1
  }

  return score
}

function estimateReadability(text) {
  const sentenceCount = Math.max(1, (text.match(/[.!?]/g) ?? []).length)
  const words = tokenize(text)
  const wordsPerSentence = words.length / sentenceCount

  if (wordsPerSentence <= 12) return 'Easy'
  if (wordsPerSentence <= 20) return 'Moderate'
  return 'Dense'
}

function computeQuantumTone(tokens) {
  if (tokens.length === 0) return 0

  const bucketCount = 8
  const amplitudes = new Array(bucketCount).fill(0)

  for (const token of tokens) {
    let hash = 0
    for (let i = 0; i < token.length; i += 1) {
      hash = (hash * 31 + token.charCodeAt(i)) % bucketCount
    }
    amplitudes[hash] += 1
  }

  const magnitude = Math.sqrt(amplitudes.reduce((sum, value) => sum + value * value, 0))
  return Number((magnitude / tokens.length).toFixed(2))
}

function buildRuleBasedSuggestion({ selectedText, draft }) {
  const base = selectedText.trim() || draft.trim()
  if (!base) return ''

  const normalized = base
    .replace(/\s+/g, ' ')
    .replace(/\bi\b/g, 'I')
    .replace(/\s([,.!?;:])/g, '$1')
    .trim()

  if (!/[.!?]$/.test(normalized)) {
    return `${normalized}.`
  }

  return normalized
}

function App() {
  const [showPanel, setShowPanel] = useState(false)
  const [readerMode, setReaderMode] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [fontScale, setFontScale] = useState(100)
  const [draft, setDraft] = useState(
    'My dearest,\n\nWhen the morning light touches your name in my thoughts, the whole day becomes kinder.\n\nWith love,\nYours always'
  )
  const [selectedText, setSelectedText] = useState('')
  const [suggestion, setSuggestion] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const appStyle = useMemo(
    () => ({
      fontSize: `${fontScale}%`,
    }),
    [fontScale]
  )

  const analysis = useMemo(() => {
    const tokens = tokenize(draft)
    const sentiment = computeSentiment(tokens)
    const sentimentLabel = sentiment > 1 ? 'Warm' : sentiment < -1 ? 'Somber' : 'Neutral'

    return {
      words: tokens.length,
      readability: estimateReadability(draft),
      keywords: getTopKeywords(tokens),
      sentiment,
      sentimentLabel,
      quantumTone: computeQuantumTone(tokens),
    }
  }, [draft])

  function handleSelection(event) {
    const textarea = event.currentTarget
    const picked = textarea.value.slice(textarea.selectionStart, textarea.selectionEnd)
    setSelectedText(picked)
  }

  function handleSuggestionSubmit(event) {
    event.preventDefault()
    if (!suggestion.trim()) return

    setSuggestions((current) => [
      {
        id: crypto.randomUUID(),
        selectedText: selectedText.trim(),
        suggestion: suggestion.trim(),
      },
      ...current,
    ])
    setSuggestion('')
  }

  function handleDraftSuggestion() {
    const proposal = buildRuleBasedSuggestion({ selectedText, draft })
    if (!proposal) return
    setSuggestion(proposal)
  }

  return (
    <div
      className={`app ${readerMode ? 'reader-mode' : ''} ${
        highContrast ? 'high-contrast' : ''
      }`}
      style={appStyle}
    >
      {/* Claude instruction: keep this implementation deterministic and non-LLM, preserving NLP + quantum-inspired analytics. */}
      <a className="skip-link" href="#letter">
        Skip to letter
      </a>
      <header className="top-bar">
        <h1>LoveLetter Studio</h1>
        <button
          type="button"
          className="panel-toggle"
          aria-expanded={showPanel}
          aria-controls="accessibility-panel"
          onClick={() => setShowPanel((open) => !open)}
        >
          Accessibility
        </button>
      </header>

      <main className="layout">
        <aside
          id="accessibility-panel"
          className={`side-panel ${showPanel ? 'open' : ''}`}
          aria-label="Accessibility controls"
        >
          <h2>Reader Controls</h2>
          <label className="control">
            <span>Reader mode</span>
            <input
              type="checkbox"
              checked={readerMode}
              onChange={(event) => setReaderMode(event.target.checked)}
            />
          </label>
          <label className="control">
            <span>High contrast</span>
            <input
              type="checkbox"
              checked={highContrast}
              onChange={(event) => setHighContrast(event.target.checked)}
            />
          </label>
          <label className="control">
            <span>Font size ({fontScale}%)</span>
            <input
              type="range"
              min="90"
              max="130"
              step="5"
              value={fontScale}
              onChange={(event) => setFontScale(Number(event.target.value))}
            />
          </label>
        </aside>

        <section className="content">
          <article className="card">
            <h2 id="letter">Letter draft</h2>
            <p className="help">
              Select any text in the draft to include context in your suggestion.
            </p>
            <label htmlFor="draft" className="visually-hidden">
              Love letter draft
            </label>
            <textarea
              id="draft"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onSelect={handleSelection}
              rows={12}
            />
          </article>

          <article className="card">
            <h2>Non-LLM NLP analysis</h2>
            <dl className="analysis-grid">
              <div>
                <dt>Word count</dt>
                <dd>{analysis.words}</dd>
              </div>
              <div>
                <dt>Readability</dt>
                <dd>{analysis.readability}</dd>
              </div>
              <div>
                <dt>Sentiment</dt>
                <dd>
                  {analysis.sentimentLabel} ({analysis.sentiment})
                </dd>
              </div>
              <div>
                <dt>Quantum tone index</dt>
                <dd>{analysis.quantumTone}</dd>
              </div>
            </dl>
            <p>
              <strong>Keywords:</strong>{' '}
              {analysis.keywords.length > 0 ? analysis.keywords.join(', ') : 'None yet'}
            </p>
            <p className="help">
              Quantum tone index uses deterministic amplitude-style token encoding.
            </p>
          </article>

          <article className="card">
            <h2>Suggest edits</h2>
            <form onSubmit={handleSuggestionSubmit} className="suggest-form">
              <label htmlFor="selected">Selected text (optional)</label>
              <textarea
                id="selected"
                value={selectedText}
                onChange={(event) => setSelectedText(event.target.value)}
                rows={3}
                placeholder="Selected part of the letter..."
              />

              <label htmlFor="suggestion">Your suggested edit</label>
              <textarea
                id="suggestion"
                value={suggestion}
                onChange={(event) => setSuggestion(event.target.value)}
                rows={4}
                placeholder="Share your improvement..."
                required
              />

              <div className="button-row">
                <button type="button" className="panel-toggle" onClick={handleDraftSuggestion}>
                  Draft with NLP rules
                </button>
                <button type="submit" className="primary-button">
                  Submit suggestion
                </button>
              </div>
            </form>

            <h3>Recent suggestions</h3>
            <ul className="suggestion-list" aria-live="polite">
              {suggestions.length === 0 ? (
                <li>No suggestions yet.</li>
              ) : (
                suggestions.map((item) => (
                  <li key={item.id}>
                    {item.selectedText ? (
                      <p>
                        <strong>Context:</strong> {item.selectedText}
                      </p>
                    ) : null}
                    <p>
                      <strong>Suggestion:</strong> {item.suggestion}
                    </p>
                  </li>
                ))
              )}
            </ul>
          </article>
        </section>
      </main>
    </div>
  )
}

export default App
