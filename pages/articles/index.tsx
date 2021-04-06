import { observer } from 'mobx-react-lite'
import { GetServerSideProps } from 'next'
import React, { FunctionComponent, useState } from 'react'
import s from './articles-component.module.scss'
import { Preloader } from '../../shared/components/preloader/preloader-component'
import { ArticleItemComponent } from './components/article-item/article-item-component'
import { addClass } from '../../core/utils'
import { userStore } from '../../core/auth/user-store'
import { fetchAllArticlesApi } from '../../api/fetches'
import { Article } from '../../api/interfaces'
import { useRouter } from 'next/router'
import Link from 'next/link'

const articlesComponent: FunctionComponent<{articles: Article[]}> = function articlesComponent({ articles }) {
  const [articlesList, setArticles] = useState({data: articles, loading: false, error: null})
  const {route} = useRouter()

  return (
    <div>
      <div className={addClass('container', s['articles-container'])}>
        { userStore.currentUser &&
          <div className={s['article-controls']}>
            <a className={s['add-new-btn']} href={route + '/create-edit'}>
              N
            </a>
          </div>
        }
        {
          articlesList?.loading
            ? <Preloader/>
            : <div className={s['articles-list']}>
              {articlesList.data?.map(article => 
                <Link href={route + '/create-edit' + '?articleId=' + article.id} passHref key={article.id}>
                  <ArticleItemComponent 
                    canDelete={article.userId === userStore.currentUser?.id}
                    deleteHandler={() => {}} 
                    article={article}/>
                </Link>
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