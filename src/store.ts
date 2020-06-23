import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import type { Todo } from './types/todo'
import type { ActionType, StoreState } from './types/store'
import { ADD_TASK, UPDATE_TASK_STATUS, UPDATE_FILTER_STATUS } from './types/store'

/**
 * reducer
 */
const initialState: StoreState = {
  todoList: [],
  isFiltered: true
}

export const addTask = (task: Todo): ActionType => {
  return { type: ADD_TASK, payload: task }
}
export const updateTaskStatus = (todoList: Todo[]): ActionType => {
  return { type: UPDATE_TASK_STATUS, payload: todoList }
}
export const toggleFilter = (status: boolean): ActionType => {
  return { type: UPDATE_FILTER_STATUS, payload: status }
}

const reducer = (state = initialState, action: ActionType): StoreState => {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, todoList: [...state.todoList, action.payload] }
    case 'UPDATE_TASK_STATUS':
      return { ...state, todoList: action.payload }
    case 'UPDATE_FILTER_STATUS':
      return { ...state, isFiltered: action.payload }
    default:
      return state
  }
}

/**
 * persist
 */
const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)
