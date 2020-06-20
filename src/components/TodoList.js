import React, {useMemo} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

import { updateTaskStatus } from '../store'

const TodoList = () => {
  const dispatch = useDispatch()
  const { todoList, isFiltered } = useSelector(store => store)

  const handleUpdate = id => {
    const updatedTodos = todoList.map(todo =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    )
    dispatch(updateTaskStatus(updatedTodos))
  }

  const enableList = useMemo(() => {
    return todoList.filter(todo => isFiltered ? !todo.isDone : true)
  }, [todoList, isFiltered])

  const disableList = useMemo(() => {
    return todoList.filter(todo => isFiltered ? todo.isDone : false)
  }, [todoList, isFiltered])

  return (
    <Box>
      <Typography align="center">
        残りタスクは{todoList.filter(todo => !todo.isDone).length}個です。
      </Typography>
      <List>
        {enableList
          .map(todo => (
            <ListItem key={todo.id} role={undefined} dense button>
              <FormControlLabel
                control={
                  <Checkbox color="default" onChange={() => handleUpdate(todo.id)} checked={todo.isDone} />
                }
                label={todo.task}
              />
          </ListItem>
        ))}
        {disableList.map(todo => (
          <ListItem key={todo.id} role={undefined} dense button>
            <FormControlLabel
              control={
                <Checkbox color="default" disabled checked />
              }
              label={todo.task}
            />
        </ListItem>
      ))}
      </List>
    </Box>
  )
}

export default TodoList
