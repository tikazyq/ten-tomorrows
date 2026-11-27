import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Astro runs from the site directory, including when Vercel builds the project.
export const repoRoot = resolve(process.cwd(), '..');

export function readRepoFile(path: string) {
  return readFile(resolve(repoRoot, path), 'utf8');
}

export async function readBranchFile({ path, branch }: { path: string; branch: string }) {
  try {
    return await readRepoFile(path);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
  }

  for (const ref of [`origin/${branch}`, branch]) {
    try {
      return execFileSync('git', ['show', `${ref}:${path}`], {
        cwd: repoRoot,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      });
    } catch {
      // Vercel clones may lack Git or the review refs.
    }
  }

  const encodedPath = path.split('/').map(encodeURIComponent).join('/');
  const token = process.env.GITHUB_TOKEN;
  const response = await fetch(
    `https://raw.githubusercontent.com/tikazyq/ten-tomorrows/${branch}/${encodedPath}`,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      signal: AbortSignal.timeout(5_000),
    },
  );
  if (!response.ok) throw new Error(`HTTP ${response.status} reading ${branch}:${path}`);
  return response.text();
}
