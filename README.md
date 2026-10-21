# MORAINEX

Concept project. MORAINEX is a fictional Colorado electrician for the Denver metro, built to show what an electrical contractor site can do. It is not a real company. Prices, reviews, the license line, and photos are samples.

Live site: https://milehighpatriot.github.io/morainex/

## Scripts

```bash
npm install
npm run lint
npm run build
```

The build is a Next.js static export in `out/`. GitHub Actions deploys that folder to GitHub Pages from `main` with `actions/deploy-pages`. The site uses `basePath` `/morainex`.
