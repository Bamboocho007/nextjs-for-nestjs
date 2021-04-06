import React, { useState } from 'react'
import s from './header-component.module.scss'
import Link from 'next/link'
import { addClass } from '../../core/utils'
import { SignUpComponent } from '../../core/auth/components/sign-up/sign-up-component'
import { SignInComponent } from '../../core/auth/components/sign-in/sign-in-component'
import { authService } from '../../core/auth/auth-service'
import { observer } from 'mobx-react-lite'
import { userStore } from '../../core/auth/user-store'
import { useRouter } from 'next/router'

const HeaderComponent = observer(() => {
    const [signUpIsOpened, setSignUpIsOpened] = useState(false)
    const [singInIsOpened, setSingInIsOpened] = useState(false)
    const router = useRouter()

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
        <div className={ s['header-component'] }>
          <div className={ addClass('container', s['header-content']) }>
            <div className={ s['logo'] }>
              Artishok
            </div>
            <nav>
              <Link href={'/'}>
                <a className={addClass(s['link'], router.pathname === '/' && s['active'])}>Home</a>
              </Link>
              <Link href={'/articles'}>
                <a className={addClass(s['link'], router.pathname === '/articles' && s['active'])}>Articles</a>
              </Link>
              <Link href={'/'}>
                <a className={addClass(s['link'], router.pathname === '/new-page' && s['active'])}>New page</a>
              </Link>
            </nav>
            {
              userStore.currentUser 
                ? (
                  <div className={s['auth']}>
                    <button className={s['auth-btn']} onClick={handleLogOut}>
                      Logout
                    </button>
                  </div>
                )
                : (
                  <div className={s['auth']}>
                    <button className={s['auth-btn']} onClick={handleSignInOpen}>
                      Sign in
                    </button>
                    <button className={s['auth-btn']} onClick={handleSignUpOpen}>
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