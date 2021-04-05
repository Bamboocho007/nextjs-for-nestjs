import axios from "axios";
import { environment } from "../../env/environment";
import { ArticleTopic } from "../interfaces/article-topic.model";

export const fetchArticleTopicsApi = () => axios.get<ArticleTopic[]>(environment.apiUrl + 'article-topics/')