# LoveLetter

LoveLetter is a Vite + React interface for writing and improving love letters with deterministic (non-LLM) NLP techniques.

## Scope implemented now (Big Bang delivery)

- Vite React UI for drafting love letters.
- Accessibility controls for reader mode, high contrast, and font sizing.
- Deterministic NLP analytics (word count, readability, keyword extraction, sentiment).
- Quantum-inspired token amplitude index to surface tonal stability.
- Rule-based suggestion drafting without LLM calls.

## Inspiration and credits

Inspired by **Violet Evergarden**.[^1]

## Future implementation ideas (issue-ready)

- **Issue: Add Keras training pipeline for tone classification**
  - Build a reproducible Python pipeline in `resources/` for supervised tone scoring.
- **Issue: Add quantum ML experiment notebook**
  - Prototype QML embeddings and compare against classical embeddings.
- **Issue: Persist suggestions**
  - Store edit suggestions with versioning and restore history.
- **Issue: Add end-to-end UI tests**
  - Cover accessibility controls, NLP analysis, and suggestion workflows.

## Validation

Run from `/home/runner/work/LoveLetter/LoveLetter/web`:

- `npm run lint`
- `npm run build`

[^1]: Violet Evergarden is based on the light novel by **Kana Akatsuki**.
