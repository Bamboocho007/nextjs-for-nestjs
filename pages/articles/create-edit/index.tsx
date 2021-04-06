import { GetServerSideProps } from 'next'
import React, { FunctionComponent, useEffect } from 'react'
import { fetchArticleApi } from '../../../api/fetches'
import { fetchArticleTopicsApi } from '../../../api/fetches/article-topics.api'
import { Article } from '../../../api/interfaces'
import { ArticleTopic } from '../../../api/interfaces/article-topic.model'
import { addClass } from '../../../core/utils'
import { AddArticleFormComponent } from './components/add-article-form/add-article-form-component'
import s from './create-edit-page.module.scss'

const CreateEditPage: FunctionComponent<{articleTopics: ArticleTopic[], article: Article}> = ({ articleTopics, article }) => {

  return (
    <div>
      <div className={addClass('container', s['add-container'])}>
        <h2 className={s['article-edit-title']}>Create/Edit Article</h2>
        <div className={s['create-edit-content']}>
          <AddArticleFormComponent articleTopics={articleTopics} articleDataForEdit={article}/>
        </div>
      </div>
    </div>
  )
}

export default CreateEditPage

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { articleId } = query
  const articleTopicsRes = await fetchArticleTopicsApi()
  let article = null;
  if(articleId) {
    await fetchArticleApi(parseInt(articleId as any)).then(res => {
      article = res.data
    })
    .catch(err => {})
  }
  
  return {
    props: {
      articleTopics: articleTopicsRes.data,
      article: article
    }
  }
}