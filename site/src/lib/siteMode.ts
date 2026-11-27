export function isAuthorSiteMode(): boolean {
  if (process.env.AUTHOR_SITE_MODE === 'true') return true;
  if (process.env.VERCEL_ENV === 'production') return false;
  return process.env.AUTHOR_SITE_MODE !== 'false' && import.meta.env.DEV;
}

export function shouldIncludeDrafts(): boolean {
  if (isAuthorSiteMode()) return true;
  if (process.env.VERCEL_ENV === 'production') return false;
  if (process.env.INCLUDE_DRAFTS === 'true') return true;
  if (process.env.INCLUDE_DRAFTS === 'false') return false;
  return process.env.VERCEL_ENV === 'preview' || import.meta.env.DEV;
}

export function shouldIncludeWorkspace(): boolean {
  return isAuthorSiteMode();
}
