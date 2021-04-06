import React, { ForwardedRef, forwardRef } from 'react'
import s from './article-item-component.module.scss'
import { Article } from '../../../../api/interfaces'

export const ArticleItemComponent = forwardRef<any, {
  article: Article, 
  deleteHandler: (articleId: number) => void,
  canDelete: boolean
  onClick?: any,
  href?: string,
  ref: ForwardedRef<any>
}>(({ article, deleteHandler, canDelete, onClick, href}, ref) => {
  return (
    <div className={s['article-container']}>
      {
        canDelete && 
        <div className={s['edit-article-container']}>
          <a className={s['edit-article-btn']} onClick={onClick} href={href} ref={ref}>
            E
          </a>
          <button className={s['article-delete-btn']} onClick={() => deleteHandler(article.id)}>
            D
          </button>
        </div>
      }
      <div className={s['article-image-wr']}>
        <img src={article.imageTrumbUrl} alt="article image"/>
      </div>
      <div className={s['article-content']}>
        <div className={s['article-title-line']}>
          <p className={s['article-title']}>
            { article.title }
          </p>
          <time className={s['article-created-at']}>
            { new Intl.DateTimeFormat().format(new Date(article.creationDate)) }
          </time>
        </div>
        <p className={s['article-text']}>
          { article.text }
        </p>
      </div>
    </div>
  )
})