# MORAINEX

Concept project. MORAINEX is a fictional Colorado electrician for the Denver metro, built to show what an electrical contractor site can do. It is not a real company. Prices, reviews, the license line, and photos are samples.

Live site: https://milehighpatriot.github.io/morainex/

## Hero

The home hero starts with the house dark and switches its lights on zone by zone. `scripts/hero_layers.py` builds `house-off` plus four additive light layers (`soffit`, `upper`, `interior`, `wash`) from `hero-2048.webp`; the page stacks them with `mix-blend-mode: plus-lighter`, so all four at full opacity reproduce the original photo. Rerun the script if the hero photo changes.

## Scripts

```bash
npm install
npm run lint
npm run build
```

The build is a Next.js static export in `out/`. GitHub Actions deploys that folder to GitHub Pages from `main` with `actions/deploy-pages`. The site uses `basePath` `/morainex`.
