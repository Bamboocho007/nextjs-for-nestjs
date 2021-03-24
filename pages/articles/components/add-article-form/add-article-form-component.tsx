import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Input, InputLabel, TextField } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { useForm } from 'react-hook-form'
import { NewArticleForm } from '../../interfaces/new-article-form.interface'

export const AddArticleFormComponent: FunctionComponent<{
  isOpened: boolean, handleClose: (formData: NewArticleForm) => void
}> = ({ isOpened, handleClose }) => {
  const { register, handleSubmit, control, watch, errors } = useForm<NewArticleForm>();

  return (
    <Dialog open={isOpened} onClose={() => handleClose(null)} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Sign up</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add new article 
        </DialogContentText>
        <form>
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

          <input type="file" multiple={false} ref={register} name="image"/>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(null)} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit(handleClose)} color="primary">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  )
}
