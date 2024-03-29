import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import rehypeAddClasses from 'rehype-add-classes';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostData {
  id: string;
  title: string;
  date: string;
  contentHtml: string;
}

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data: { title, date } } = matter(fileContents);
    return {
      id,
      title,
      date,
    };
  });

  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } if (a > b) {
      return -1;
    }

    return 0;
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.md$/, ''),
    },
  }));
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data: { title, date }, content } = matter(fileContents);

  const tagsToClasses = {
    h1: 'mb-4 text-2xl font-bold',
    h2: 'mb-2 text-xl',
    a: 'underline text-blue-600 hover:text-blue-800 visited:text-purple-600',
    p: 'my-2',
    ol: 'list-inside',
    li: 'list-decimal',
  };

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeFormat)
    .use(rehypeAddClasses, tagsToClasses)
    .use(rehypeStringify)
    .process(content);
  const contentHtml = processedContent.toString();
  return {
    id,
    title,
    date,
    contentHtml,
  };
}
