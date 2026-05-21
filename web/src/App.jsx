import { useMemo, useState } from 'react'
import './App.css'

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

  return (
    <div
      className={`app ${readerMode ? 'reader-mode' : ''} ${
        highContrast ? 'high-contrast' : ''
      }`}
      style={appStyle}
    >
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

              <button type="submit" className="primary-button">
                Submit suggestion
              </button>
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
