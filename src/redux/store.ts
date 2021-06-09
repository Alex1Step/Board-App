import { configureStore } from '@reduxjs/toolkit'
import tempReducer from './slice'

const store = configureStore({
    reducer: {
      globalReducer: tempReducer
    },
  })

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch