import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Input, FormControl, FormHelperText, InputLabel } from '@material-ui/core'
import React, { FunctionComponent, MouseEventHandler } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { authService } from '../../auth-service'
import { RegistrationFormType } from '../../interfaces'
import styles from './sign-up-component.module.scss'

const SignUpComponent: FunctionComponent<{isOpened: boolean, handleClose: (data?: any) => void}> = function({isOpened, handleClose}) {
  const { register, control, handleSubmit, watch, errors } = useForm<RegistrationFormType>();

  const onSignUp = (data: RegistrationFormType) => {
    authService.registration(data)
    handleClose()
  }
  
  return (
    <Dialog open={isOpened} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Sign up</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add email and password for sign up
        </DialogContentText>
        <form>
          <FormControl fullWidth>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              as={Input}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              as={Input}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              as={Input}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel htmlFor="passwordConfirm">Password Confirm</InputLabel>
            <Controller
              name="passwordConfirm"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              as={Input}
            />
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit(onSignUp)} color="primary">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export { SignUpComponent }