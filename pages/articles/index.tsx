import { observer } from 'mobx-react-lite'
import { GetServerSideProps } from 'next'
import React, { useEffect } from 'react'
import { fetchAllArticlesApi } from '../../api/fetches'
import { Preloader } from '../../shared/components/preloader/preloader-component'
import { articlesStore } from './store'

export default observer(function articlesComponent() {
  useEffect(() => {
    if(!articlesStore?.articles?.length) {
      fetchAllArticlesApi().then(res => {
        articlesStore.setAllArticles(res.data)
      })
    }
  }, [])

  return (
    <div>
      <div className="container">
        articlesComponent
        {
          !articlesStore?.articles?.length
            ? <Preloader/>
            : <ul>
              {articlesStore.articles?.map(article => 
                <li key={article.id}>
                  {article.title}
                </li>
              )}
            </ul>
          }
      </div>
    </div>
  )
})

export const getServerSideProps: GetServerSideProps =  async (context) => {
  await fetchAllArticlesApi().then(res => {
    articlesStore.setAllArticles(res.data)
  })

  return {
    props: {
      initialState: {
        articles: articlesStore.articles
      }
    }
  }
}