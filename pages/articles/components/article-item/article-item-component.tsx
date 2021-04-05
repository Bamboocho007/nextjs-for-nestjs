import React, { FunctionComponent } from 'react'
import styles from './article-item-component.module.scss'
import { Article } from '../../../../api/interfaces'

export const ArticleItemComponent: FunctionComponent<{
  article: Article, 
  deleteHandler: (articleId: number) => void,
  canDelete: boolean
  onclickHandler: any
}> = ({ article, deleteHandler, canDelete, onclickHandler }) => {
  return (
    <div className={styles['article-container']} onClick={onclickHandler}>
      {
        canDelete && 
        <button className={styles['article-delete-btn']} onClick={() => deleteHandler(article.id)}>
          D
        </button>
      }
      <div className={styles['article-image-wr']}>
        <img src={article.imageTrumbUrl} alt="article image"/>
      </div>
      <div className={styles['article-content']}>
        <div className={styles['article-title-line']}>
          <p className={styles['article-title']}>
            { article.title }
          </p>
          <time className={styles['article-created-at']}>
            { new Intl.DateTimeFormat().format(new Date(article.creationDate)) }
          </time>
        </div>
        <p className={styles['article-text']}>
          { article.text }
        </p>
      </div>
    </div>
  )
}