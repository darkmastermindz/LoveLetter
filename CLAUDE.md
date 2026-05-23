# Claude Instructions

## Core constraints
- Keep this project deterministic and non-LLM.
- Preserve and extend the existing NLP analytics pipeline (word count, readability, keyword extraction, sentiment).
- Preserve and extend the quantum-inspired token amplitude index behavior.

## Product focus
- Maintain LoveLetter as a Vite + React interface for writing and improving love letters.
- Keep accessibility controls (reader mode, high contrast, font sizing) first-class when changing UI behavior.

## Validation
- Run frontend checks from `/tmp/workspace/darkmastermindz/LoveLetter/web`:
  - `npm run lint`
  - `npm run build`
