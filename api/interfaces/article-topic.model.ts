import { Article } from "./article.model";

export type ArticleTopic = {
  id: number,
  label: string,
  sub: string,
  articles?: Article[]
}

export interface CreateUpdateArticleInput {
  title: string,
  text: string,
  topicId: number,
  image: File
}