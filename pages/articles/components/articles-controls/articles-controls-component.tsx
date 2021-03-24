import { observer } from 'mobx-react-lite'
import React, { FunctionComponent, useState } from 'react'
import { userStore } from '../../../../core/auth/user-store'
import { NewArticleForm } from '../../interfaces/new-article-form.interface'
import { FETCH_ALL_ARTICLES_ACTION } from '../../store/articles-store-actions'
import { AddArticleFormComponent } from '../add-article-form/add-article-form-component'
import styles from './articles-controls-component.module.scss'

export const ArticlesControlsComponent: FunctionComponent = observer(() => {
  const [addFormIsOpened, setAddFormIsOpened] = useState(false)

  const onAddArticle = (data: NewArticleForm) => {
    setAddFormIsOpened(false)
    if(!data) return;
    FETCH_ALL_ARTICLES_ACTION()
  }

  const onOpenForm = () => {
    setAddFormIsOpened(true)
  }

  return (
    <div className={styles['articles-controls']}>
      <AddArticleFormComponent handleClose={onAddArticle} isOpened={ addFormIsOpened }/>
      <div>
        { !userStore.currentUser  
          ? <span>Sign in for add new article</span> 
          : <span>You can delete only yours articles</span>
        }
      </div>
      {
        userStore.currentUser && (
          <div className={styles['control-buttons']}>
            <button className={styles['control-button']} onClick={onOpenForm}>
              Add
            </button>
          </div>
        )
      }
    </div>
  )
})
