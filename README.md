# AL Company Architects

Frontend web site for AL Company Valjevo. 

https://alcompany.vercel.app/

## Local development

```bash
npm install
npm run dev
```

## Environment variables

Copy `.env.example` to `.env.local` for local development. The same variables must be set in Vercel (Project Settings > Environment Variables).

| Variable | Purpose |
| --- | --- |
| `VITE_FORMSPREE_ENDPOINT` | Formspree endpoint (`https://formspree.io/f/<id>`) that receives `/kontakt` form submissions. Without it the form shows an error and does not send. |

## Scripts

```bash
npm run build
npm run preview
npm run lint
npm test
```

## Tech stack

- Vite
- TypeScript
- React
- React Router
- Tailwind CSS
- shadcn/ui


## Disabled features

The floating AI Assistant widget is disabled and kept in `_disabled/ai-assistant/` (excluded from build, tsconfig and ESLint). See the README in that folder for restore steps.
