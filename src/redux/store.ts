import { configureStore } from '@reduxjs/toolkit'
import redFromSlice from './slice'

const store = configureStore({
    reducer: {
      reducer: redFromSlice
    },
  })

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch