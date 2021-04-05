import { observer } from 'mobx-react-lite'
import { GetServerSideProps } from 'next'
import React, { FunctionComponent, useEffect, useState } from 'react'
import styles from './articles-component.module.scss'
import { Preloader } from '../../shared/components/preloader/preloader-component'
import { ArticleItemComponent } from './components/article-item/article-item-component'
import { addClass } from '../../core/utils'
import { userStore } from '../../core/auth/user-store'
import { fetchAllArticlesApi } from '../../api/fetches'
import { Article } from '../../api/interfaces'
import { useRouter } from 'next/router'

const articlesComponent: FunctionComponent<{articles: Article[]}> = function articlesComponent({ articles }) {
  const [articlesList, setArticles] = useState({data: articles, loading: false, error: null})
  const router = useRouter()
  
  const goToEditPage = (id: number) => {
    if(userStore.currentUser) {
      router.push('./create-edit' + '?articleId=' + id)
    }
  }

  return (
    <div>
      <div className={addClass('container', styles['articles-container'])}>
        {
          articlesList?.loading
            ? <Preloader/>
            : <div className={styles['articles-list']}>
              {articlesList.data?.map(article => 
                <ArticleItemComponent 
                  onclickHandler={() => goToEditPage(article.id)}
                  canDelete={article.userId === userStore.currentUser?.id}
                  deleteHandler={() => {}} 
                  article={article} key={article.id}/>
              )}
            </div>
        }
      </div>
    </div>
  )
}

export default observer(articlesComponent)

export const getServerSideProps: GetServerSideProps =  async (context) => {
  const articles = await fetchAllArticlesApi()

  return {
    props: {
      articles: articles.data
    }
  }
}