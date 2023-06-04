import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN
});

export const getAllPosts = async () => {
  const posts = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    page_size: 100
  });
  return posts.results.map(post => {
    return getPageMetaData(post);
  });
};

const getTags = (tags) => {
  const allTags = tags.map(tag => tag.name);
  return allTags
}

const getPageMetaData = (post) => {
  console.log(post.properties.Tags.multi_select)
  return {
    id: post.id,
    title: post.properties.Name.title[0].plain_text,
    description: post.properties.Description.rich_text[0].plain_text,
    data: post.properties.Date.date.start,
    slug: post.properties.Slug.rich_text[0].plain_text,
    tags: getTags(post.properties.Tags.multi_select),
  }
}