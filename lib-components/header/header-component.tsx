import React, { useState } from 'react'
import styles from './header-component.module.scss'
import Link from 'next/link'
import { addClass } from '../../core/utils'
import { SignUpComponent } from '../../core/auth/components/sign-up/sign-up-component'
import { SignInComponent } from '../../core/auth/components/sign-in/sign-in-component'
import { authService } from '../../core/auth/auth-service'
import { observer } from 'mobx-react-lite'
import { userStore } from '../../core/auth/user-store'

const HeaderComponent = observer(() => {
    const [signUpIsOpened, setSignUpIsOpened] = useState(false)
    const [singInIsOpened, setSingInIsOpened] = useState(false)

    const handleSignUpOpen = () => {
      setSignUpIsOpened(true)
    };

    const handleSignInOpen = () => {
      setSingInIsOpened(true)
    };

    const handleSignUp = () => {
      setSignUpIsOpened(false)
    };

    const handleSignIn = () => {
      setSingInIsOpened(false)
    };

    const handleLogOut = () => {
      authService.logOut()
    }

    return (
      <>
        <div className={ styles['header-component'] }>
          <div className={ addClass('container', styles['header-content']) }>
            <div className={ styles['logo'] }>
              Artishok
            </div>
            <nav>
              <Link href={'/'}>
                <a className={styles['link']}>Home</a>
              </Link>
              <Link href={'/articles'}>
                <a className={styles['link']}>Articles</a>
              </Link>
              <Link href={'/'}>
                <a className={styles['link']}>New page</a>
              </Link>
            </nav>
            {
              userStore.currentUser 
                ? (
                  <div className={styles['auth']}>
                    <button className={styles['auth-btn']} onClick={handleLogOut}>
                      Logout
                    </button>
                  </div>
                )
                : (
                  <div className={styles['auth']}>
                    <button className={styles['auth-btn']} onClick={handleSignInOpen}>
                      Sign in
                    </button>
                    <button className={styles['auth-btn']} onClick={handleSignUpOpen}>
                      Sign up
                    </button>
                  </div>
                )
            }
            
          </div>
        </div>
        <SignUpComponent isOpened={signUpIsOpened} handleClose={handleSignUp}></SignUpComponent>
        <SignInComponent isOpened={singInIsOpened} handleClose={handleSignIn}></SignInComponent>
      </>
    )
  }
)


export { HeaderComponent }