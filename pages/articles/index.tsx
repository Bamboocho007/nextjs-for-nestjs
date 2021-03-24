import { observer } from 'mobx-react-lite'
import { GetServerSideProps } from 'next'
import React, { useEffect } from 'react'
import styles from './articles-component.module.scss'
import { deleteArticleApi } from '../../api/fetches'
import { Preloader } from '../../shared/components/preloader/preloader-component'
import { ArticleItemComponent } from './components/article-item/article-item-component'
import { articlesStore } from './store'
import { addClass } from '../../core/utils'
import { ArticlesControlsComponent } from './components/articles-controls/articles-controls-component'
import { userStore } from '../../core/auth/user-store'
import { FETCH_ALL_ARTICLES_ACTION } from './store/articles-store-actions'

export default observer(function articlesComponent() {

  useEffect(() => {
    if(!articlesStore?.articles?.data) {
      FETCH_ALL_ARTICLES_ACTION()
    }
  }, [])

  const onDeleteHandler = (articleId: number) => {
    deleteArticleApi(articleId).then(res => {
      FETCH_ALL_ARTICLES_ACTION()
    })
  }

  return (
    <div>
      <div className={addClass('container', styles['articles-container'])}>
        <ArticlesControlsComponent />
        {
          articlesStore?.articles.loading
            ? <Preloader/>
            : <div className={styles['articles-list']}>
              {articlesStore.articles?.data?.map(article => 
                <ArticleItemComponent 
                  canDelete={article.userId === userStore.currentUser?.id}
                  deleteHandler={onDeleteHandler} 
                  article={article} key={article.id}/>
              )}
            </div>
        }
      </div>
    </div>
  )
})

export const getServerSideProps: GetServerSideProps =  async (context) => {
  await FETCH_ALL_ARTICLES_ACTION()

  return {
    props: {
      initialState: {
        articles: articlesStore.articles.data
      }
    }
  }
}