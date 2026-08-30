# Contributing to semantic-space-3d

First off, thank you for considering contributing to `semantic-space-3d`! It's people like you that make it a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Development Setup

This project uses [pnpm workspaces](https://pnpm.io/workspaces).

### Prerequisites

- Node.js 18+ or 20+
- `pnpm` (version 9 or above recommended)

### 1. Clone the repository

```bash
git clone https://github.com/NaoyaRuike/semantic-space-3d.git
cd semantic-space-3d
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Run development mode

To watch and build library changes:
```bash
pnpm dev
```

To run the interactive playground concurrently in another terminal:
```bash
pnpm dev:playground
```

### 4. Build and Typecheck

```bash
# Typecheck
pnpm typecheck

# Build library
pnpm build

# Build playground
pnpm build:playground
```

## Pull Request Guidelines

1. **Fork the repo** and create your branch from `main`:
   ```bash
   git checkout -b feature/my-new-feature
   ```
2. **Make your changes** cleanly with appropriate TypeScript types and comments.
3. Ensure the project builds and passes type checks:
   ```bash
   pnpm typecheck
   pnpm build
   ```
4. **Commit your changes**:
   Use clear and concise commit messages (e.g., following [Conventional Commits](https://www.conventionalcommits.org/)).
5. **Push to your fork** and submit a Pull Request.

## Reporting Bugs and Feature Requests

- Please search existing issues before opening a new one.
- Use our [Issue Templates](https://github.com/NaoyaRuike/semantic-space-3d/issues/new/choose) for reporting bugs or suggesting features.
- Provide minimal reproduction steps and code snippets whenever possible.

Thank you for contributing!
