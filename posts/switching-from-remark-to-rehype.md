---
title: 'Switching from Raw Remark to Unified ecosystem'
date: '2021-10-03'
---

# Better Styling Blog Styling

## Overall Approach
As mentioned last week, my goal this week is to get the blog to play nicely with [Tailwind](https://tailwindcss.com), which means figuring out how I can apply Tailwind's utility classes to the html generated from the markdown files that make up each blog post. 

As it turns out, it's fairly straightforward, we just need change the code in `lib/getPostData.ts` to change from using remark to using the unified ecosystem and some pre-existing rehype plugins.

## Switching From Remark To Unified

The first step is changing from Remark html to the Unified ecosystem and changing how we parse the markdown.

1. Install `unified`, `remark-parse`, `remark-rehype`, `rehype-format` and `rehype-stringify` using NPM or Yarn.
2. Change the `getPostData` function to use the `unified` ecosystem, and chain each plugin, then end with a `process` of the content that we retrieved from the Markdown blog post.
3. Install the `rehype-add-classes` plugin [Rehype Add Classes](https://github.com/martypdx/rehype-add-classes)
4. Create an object that maps the html elements to css classes, and add a final `use`, passing the `rehype-add-classes` plugin and the object to the call
5. Update the `purge` option in `tailwind.config.js` to look in `lib/posts.ts` for Tailwind classes that are being used
