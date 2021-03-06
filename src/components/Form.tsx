import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../store'
import {Box, Grid, Button, TextField, Switch} from '@material-ui/core'
import type { Todo } from '../types/todo'

import { addTask, toggleFilter } from '../store'

const Form: React.FC = ():React.ReactElement => {
  const [inputText, setInputText] = React.useState('')

  const dispatch = useDispatch()
  const isFiltered: boolean = useSelector<State, boolean>(store => store.isFiltered)

  const handleClickButton = React.useCallback(() => {
    if (inputText.length <= 0) return

    const newTodo: Todo = {
      id: _genUUID(),
      task: inputText,
      isDone: false
    }

    dispatch(addTask(newTodo))
    setInputText('')
  }, [inputText, setInputText, addTask])

  const handleChangeInput = React.useCallback((e) => {
    setInputText(e.target.value)
  }, [setInputText])

  const handleToggleFilter = React.useCallback(() => {
    dispatch(toggleFilter(!isFiltered))
  }, [isFiltered, toggleFilter])

  return (
    <Box p={2}>
      <TextField label="new task" variant="outlined" margin="normal" fullWidth value={inputText} onChange={handleChangeInput} />
      <Button variant="contained" color="primary" fullWidth onClick={handleClickButton} >
        submit
      </Button>
      <Grid container justify="flex-end">
        <Switch
          checked={isFiltered}
          onChange={handleToggleFilter}
          color="primary"
          name="filter"
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      </Grid>
    </Box>
  )
}

const _genUUID = (): string => {
  return Math.random() // randomなidを生成しています
    .toString(36)
    .slice(-8)
}

export default Form
