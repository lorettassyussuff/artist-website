# Loretta Yussuff Website

Next.js app with an embedded Sanity Studio mounted at `/studio`.

## Local development

```bash
pnpm dev
```

The site runs at `http://localhost:3000` and the Studio is available at:

```text
http://localhost:3000/studio
```

## Environment

Create `.env.local` with:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_WRITE_TOKEN=your_write_token
```

## Seed content

To seed the Sanity dataset:

```bash
pnpm seed
```

Important:
- the seed script still uploads from local files
- the image/PDF source assets must exist in `public/assets/`
- if those files are removed, reseeding will fail until they are restored
