import axios from "axios"
import { environment } from "../../env/environment"
import { Article } from "../interfaces"

export const fetchArticleApi = (id: number) => axios.get<Article>(environment.apiUrl + 'articles/' + id)
export const fetchAllArticlesApi = () => axios.get<Article[]>(environment.apiUrl + 'articles/')