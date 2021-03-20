import React from 'react'
import styles from './preloader-component.module.scss'
import LoadingSpinner from '../../../public/icons/loading-spinner.svg';

export const Preloader = () => {
  return (
    <div className={styles['preloader']}>
      <div className={styles['preloader-bg']}></div>
      <LoadingSpinner className={styles['preloader-icon']}/>
    </div>
  )
}