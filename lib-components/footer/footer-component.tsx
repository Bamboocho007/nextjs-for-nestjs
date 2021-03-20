import React from 'react'
import { addClass } from '../../core/utils'
import styles from './footer-component.module.scss'

function FooterComponent() {
  return (
    <div className={styles['footer-component']}>
      <div className={addClass('container', styles['footer-content'])}>
        Footer
      </div>
    </div>
  )
}

export { FooterComponent }