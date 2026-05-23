# Claude Instructions

## Core constraints
- Keep this project deterministic and non-LLM.
- Preserve and extend the existing NLP analytics pipeline (word count, readability, keyword extraction, sentiment).
- Preserve and extend the quantum-inspired token amplitude index behavior.
- Use NLP, Keras, and quantum machine learning (QML) tools and techniques for future model experiments.

## Product focus
- Maintain LoveLetter as a Vite + React interface for writing and improving love letters.
- Keep accessibility controls (reader mode, high contrast, font sizing) first-class when changing UI behavior.
- Keep the experience inspired by Violet Evergarden, and credit any referenced films or quotes in footnotes with the original author.

## Delivery method
- Implement features in a Big Bang delivery style when requested.
- Validate each change with frontend checks before finalizing.
- Suggest additional improvements as future GitHub issues when closing work.

## Claude usage guidance
- Claude models may be used for implementation planning and code authoring support.
- Do not add runtime LLM dependencies to the user-facing application.
- When asked in PR feedback, post updated Claude instruction summaries in PR comments.

## Validation
- Run frontend checks from `/tmp/workspace/darkmastermindz/LoveLetter/web`:
  - `npm run lint`
  - `npm run build`
