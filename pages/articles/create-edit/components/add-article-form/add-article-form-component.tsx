import { Button, MenuItem, Select, TextField } from '@material-ui/core'
import React, { ChangeEvent, FunctionComponent, useEffect, useState } from 'react'
import s from './add-article-form-component.module.scss'
import { useForm, Controller } from 'react-hook-form'
import { NewArticleForm } from '../../../interfaces/new-article-form.interface'
import { Article } from '../../../../../api/interfaces'
import { ArticleTopic } from '../../../../../api/interfaces/article-topic.model'
import { createArticleApi, updateArticleApi } from '../../../../../api/fetches'

export const AddArticleFormComponent: FunctionComponent<{
  articleDataForEdit?: Article
  articleTopics: ArticleTopic[]
}> = ({ articleDataForEdit, articleTopics }) => {
  const [articleImage, setArticleImage] = useState(articleDataForEdit?.imageUrl || '')

  const { register, control, reset, getValues, setValue } = useForm<NewArticleForm>({
    defaultValues: {
      text: articleDataForEdit?.text || '',
      title: articleDataForEdit?.title || '',
      topicId: articleDataForEdit?.topicId || ('' as any)
    }
  });

  const onSubmitHandle = () => {
    const formValue = getValues()
    const createUpdateData = {...formValue, image: formValue.image[0]}

    if(articleDataForEdit) {
      updateArticleApi(createUpdateData, articleDataForEdit.id).then(res => {
  
      })
    }
    else {
      createArticleApi(createUpdateData).then(res => {
  
      })
    }
  }
  const onResetHandle = () => {
    reset({
      title: articleDataForEdit?.title || '',
      text: articleDataForEdit?.text || '',
      topicId: articleDataForEdit?.topicId || '' as any,
      image: []
    })
    setArticleImage(articleDataForEdit?.imageUrl || '')
  }
  const onImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setArticleImage(URL.createObjectURL(event.target.files[0]))
  }

  return (
    <form className={s['add-article-form']}>
      <div className={s['article-img-wr']}>
        {
          articleImage 
          ? <img src={articleImage} alt="article-image"/>
          : <span className={s['image-placeholder']}>Choose an image</span>
        }
        <label className={s['upload-btn']} htmlFor="button-file">
          <input 
            accept="image/*" 
            id="button-file" 
            type="file" 
            onChange={(e) => onImageChangeHandler(e)}
            multiple={false} 
            ref={register} name="image"/>
        </label>
      </div>
      <div className={s['article-configs']}>
        <Controller
          className={s['topic-select']}
          control={control}
          name="topicId"
          as={
            <Select id="topic-select">
              {
                articleTopics?.map(topic => (
                  <MenuItem key={topic.id} value={topic.id}>
                    {topic.label}
                  </MenuItem>
                ))
              }
            </Select>
          }
        />
      
        <TextField 
          inputRef={register} 
          required 
          fullWidth 
          name="title" 
          label="Title" 
          type="text" />

        <TextField 
          inputRef={register} 
          required 
          fullWidth 
          name="text" 
          label="Text" 
          type="text" />

        <div>
          {
            articleDataForEdit &&
            <Button onClick={onResetHandle} color="primary">
              Reset
            </Button>
          }
          <Button onClick={onSubmitHandle} color="primary">
            Post
          </Button>
        </div>
      </div>
    </form>
  )
}
