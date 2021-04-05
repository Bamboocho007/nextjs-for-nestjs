import { GetServerSideProps } from 'next'
import React, { FunctionComponent, useEffect } from 'react'
import { fetchArticleTopicsApi } from '../../../api/fetches/article-topics.api'
import { ArticleTopic } from '../../../api/interfaces/article-topic.model'
import { addClass } from '../../../core/utils'
import { AddArticleFormComponent } from './components/add-article-form/add-article-form-component'
import s from './create-edit-page.module.scss'

const CreateEditPage: FunctionComponent<{articleTopics: ArticleTopic[]}> = ({ articleTopics }) => {

  return (
    <div>
      <div className={addClass('container', s['add-container'])}>
        <h2 className={s['article-edit-title']}>Create/Edit Article</h2>
        <div className={s['create-edit-content']}>
          <AddArticleFormComponent articleTopics={articleTopics} articleDataForEdit={null}/>
        </div>
      </div>
    </div>
  )
}

export default CreateEditPage

export const getServerSideProps: GetServerSideProps = async () => {
  const articleTopicsRes = await fetchArticleTopicsApi()
  return {
    props: {
      articleTopics: articleTopicsRes.data
    }
  }
}