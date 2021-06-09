import { createSlice } from '@reduxjs/toolkit'

interface countState {
    counter: number,
    clicks: number
  }
  
  const initialState = { 
    counter: 0,
    clicks: 25,
   } as countState

  const countSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
      increment(state) {
        state.counter++
      },
      decrement(state) {
        state.counter--
      }
    },
  })
  
  export const { increment, decrement } = countSlice.actions
  export default countSlice.reducer