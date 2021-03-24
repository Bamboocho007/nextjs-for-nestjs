import { articlesStore } from "."
import { fetchAllArticlesApi } from "../../../api/fetches"

export const FETCH_ALL_ARTICLES_ACTION = async () => {
  articlesStore.loadAllArticles();
  await fetchAllArticlesApi().then(res => {
    articlesStore.setAllArticles(res.data)
  }).catch(err => {
    articlesStore.setAllArticles(null, err)
  })
}