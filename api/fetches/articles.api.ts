import axios from "axios"
import { environment } from "../../env/environment"
import { NewArticleForm } from "../../pages/articles/interfaces/new-article-form.interface"
import { Article } from "../interfaces"

export const fetchArticleApi = (id: number) => axios.get<Article>(environment.apiUrl + 'articles/' + id)
export const fetchAllArticlesApi = () => axios.get<Article[]>(environment.apiUrl + 'articles/')
export const deleteArticleApi = (id: number) => axios.delete<any>(environment.apiUrl + 'articles/' + id)
export const addArticleApi = (formData: NewArticleForm) => {
  const data = new FormData()
  Object.entries(formData).forEach(([key, value]) => {
    if(key === 'image') {
      data.append(key, value[0])
    }
    else {
      data.append(key, value)
    }
  })
  
  return axios.post<any>(environment.apiUrl + 'articles/create', data)
}