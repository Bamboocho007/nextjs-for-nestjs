import { action, makeObservable, observable } from "mobx"
import { Article } from "../../../api/interfaces"
import { INITIAL_STATE } from "../../../core/constants"

type StorParameter<T> = {data: T, loading: boolean, error: string};

class ArticlesStore {
  public articles: StorParameter<Article[]> = {
    data: null, 
    loading: true, 
    error: null
  }

  public articleById: StorParameter<Article> = {
    data: null, 
    loading: true, 
    error: null
  }
  
  constructor(articles?: Article[], articleById?: Article) {
    makeObservable(this, {
      articles: observable,
      articleById: observable,
      loadArticlesById: action,
      setArticleById: action,
      loadAllArticles: action,
      setAllArticles: action
    })
    if(articles) {
      this.articles = {data: articles, loading: false, error: null}
    }
    if(articleById) {
      this.articleById = {data: articleById, loading: false, error: null}
    }
  }

  public loadArticlesById() {
    this.articleById = { ...this.articleById, loading: true }
  }

  public setArticleById(article: Article, error?: string) {
    this.articleById = { data: article, loading: false, error }
  }

  public loadAllArticles() {
    this.articles = { ...this.articles, loading: true }
  }

  public setAllArticles(articles: Article[], error?: string) {
    this.articles = { data: articles, loading: false, error }
  }
}

const articlesStore = new ArticlesStore(INITIAL_STATE.articles)

export { articlesStore }