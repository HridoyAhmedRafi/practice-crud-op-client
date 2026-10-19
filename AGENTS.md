<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

Next.js 16.4.2 (App Router, Turbopack) + React 19. **JavaScript only** — no TypeScript, no `tsconfig.json`; pages/components are `.js`/`.jsx` and types are unchecked. Import alias `@/*` → `src/*` is declared in `jsconfig.json`.

- `src/app/` — routes (`page.js` = `/`, `add-user/page.jsx` = `/add-user`), `layout.js`, global styles.
- `src/components/ui/` — shadcn components.
- `src/lib/utils.js` — re-exports `cn`.

## Commands

- `npm run dev` — dev server on port 3000.
- `npm run lint` — ESLint 9 flat config (`eslint.config.mjs`).
- `npm run build` / `npm start` — production build/serve.

No test runner, no typecheck script, and no CI config exist. Do not invent `npm test`/`tsc` commands.

## Gotchas

- **`cn` comes from the bare `cn` npm package**, not from clsx/tailwind-merge. `src/lib/utils.js` is just `export { cn } from "cn"`, and `src/components/ui/button.jsx` imports `cn` from `"cn"` directly. Keep that convention when adding components.
- **Tailwind v4, CSS-first**: there is no `tailwind.config.js`/`postcss.config.*`. Tailwind runs via the `@tailwindcss/turbopack` loader in `next.config.mjs`, and design tokens live in `src/app/globals.css` (`@theme inline`, `:root`, `.dark`). Add tokens/theme values there, not in a JS config.
- **shadcn is configured for `.jsx` + Base UI**, not the usual defaults: `components.json` sets `tsx: false`, `style: "base-nova"`, and components use `@base-ui/react` primitives (see `src/components/ui/button.jsx`) rather than Radix. Generate components as `.jsx` and expect Base UI imports.
- **React Compiler is enabled** (`reactCompiler: true` + `babel-plugin-react-compiler`). Don't add manual `useMemo`/`useCallback` purely for optimization.
- The `nextjs-agent-rules` block above is rewritten by `next dev` (also for the `next` package itself). Leave it in place and commit it so the tree stays clean.
