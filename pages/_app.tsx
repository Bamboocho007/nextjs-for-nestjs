import '../styles/styles.scss'
import styles from './app.styles.module.scss'
import { HeaderComponent } from '../lib-components/header/header-component'
import { FooterComponent } from '../lib-components/footer/footer-component'
import { JwtService } from '../core/services/jwt-service'
import { useEffect } from 'react'
import '../core/interceptors/token-add-interceptor'
import { userStore } from '../core/auth/user-store'
import { fetchUserApi } from '../core/auth/api'

function MyApp({ Component, pageProps }) {
  
  useEffect(() => {
    const userData = JwtService.getValue()
    if(userData) {
      fetchUserApi(userData.id).then(res => {
        userStore.setCurrentUser(res.data)
      })
    }
  }, [])

  return (
    <div className={styles["app-wr"]}>
      <HeaderComponent></HeaderComponent>
      <Component {...pageProps} />
      <FooterComponent></FooterComponent>
    </div>
  ) 
}

export default MyApp