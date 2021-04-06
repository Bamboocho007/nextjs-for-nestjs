import axios from "axios"
import { environment } from "../../env/environment"
import { Article } from "../interfaces"
import { CreateUpdateArticleInput } from "../interfaces/article-topic.model"

export const fetchArticleApi = (id: number) => axios.get<Article>(environment.apiUrl + 'articles/' + id)
export const fetchAllArticlesApi = () => axios.get<Article[]>(environment.apiUrl + 'articles/')
export const deleteArticleApi = (id: number) => axios.delete<any>(environment.apiUrl + 'articles/' + id)
export const createArticleApi = (formData: CreateUpdateArticleInput) => {
  const data = new FormData()
  Object.entries(formData).forEach(([key, value]) => {
    data.append(key, value)
  })
  
  return axios.post<Article>(environment.apiUrl + 'articles/create', data)
}

export const updateArticleApi = (formData: CreateUpdateArticleInput, articleId: number) => {
  const data = new FormData()
  Object.entries(formData).forEach(([key, val]) => {
    if(!val) delete formData[key]
  })
  Object.entries(formData).forEach(([key, value]) => {
    data.append(key, value)
  })
  
  return axios.put<Article>(environment.apiUrl + 'articles/update/' + articleId, data)
}