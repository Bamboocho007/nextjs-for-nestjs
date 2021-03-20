import { action, makeObservable, observable } from "mobx"
import { Article } from "../../../api/interfaces"
import { INITIAL_STATE } from "../../../core/constants"

class ArticlesStore {
  public articles: Article[] = []
  public articleById: Article = null
  
  constructor(articles?: Article[], articleById?: Article) {
    makeObservable(this, {
      articles: observable,
      articleById: observable,
      setArticleById: action,
      setAllArticles: action
    })
    this.articles = articles || []
    this.articleById = articleById || null
  }

  public async setArticleById(article: Article) {
    this.articleById = article || null
  }

  public async setAllArticles(articles: Article[]) {
    this.articles = articles || []
  }
}

const articlesStore = new ArticlesStore(INITIAL_STATE.articles)

export { articlesStore }