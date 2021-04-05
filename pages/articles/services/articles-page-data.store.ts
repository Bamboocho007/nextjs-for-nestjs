import { action, makeObservable, observable } from "mobx"
import { Article } from "../../../api/interfaces"

class ArticlesPageDataStore {
  public articles: Article[] = []

  constructor() {
    makeObservable({
      articles: observable,
      setArticles: action
    })
  }

  public setArticles(articles: Article[]) {
    this.articles = articles
  }

}

export const articlesPageDataStore = new ArticlesPageDataStore()