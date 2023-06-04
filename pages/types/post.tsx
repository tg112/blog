type PostType = {
  title: string;
  description: string;
  date: string;
  tag: string;
  slug: string
}

type TagType = {
  id: string;
  name: string;
  color: string;
}

export type {
  PostType,
  TagType
}