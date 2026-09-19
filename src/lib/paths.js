// Resolves a path under public/ against Vite's configured base URL.
//
// GitHub Pages serves this as a project page — everything lives under
// /3d-viewer-new-ui/, not / — so a hardcoded "/assets/foo.png" would 404
// there even though it resolves fine in local dev. import.meta.env.BASE_URL
// is Vite's own record of that prefix ("/" in dev, "/3d-viewer-new-ui/" in
// this build), so this is the one place that base path is spelled out.
export function asset(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
