import { promises as fs } from 'fs';
import path from 'path';

export const revalidate = 3600;

export default async function sitemap() {
  const dir = path.join(process.cwd(), 'content', 'posts');
  let posts: { url: string; lastModified: string }[] = [];
  try {
    const files = await fs.readdir(dir);
    posts = files.filter(f => f.endsWith('.md')).map(f => {
      const m = f.match(/^(\d{4}-\d{2}-\d{2})-/);
      return {
        url: `https://orbit3c.xingdeng.tw/posts/${f.replace(/\.md$/, '')}`,
        lastModified: m ? new Date(m[1]) : new Date(),
      };
    });
  } catch {}
  const base = { lastModified: new Date(), changeFrequency: 'daily' as const };
  return [
    { url: 'https://orbit3c.xingdeng.tw/', ...base },
    ...posts.map(p => ({ ...p, changeFrequency: 'weekly' as const })),
  ];
}
