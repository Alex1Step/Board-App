import { createSlice } from '@reduxjs/toolkit'

export type taskI = {
  id: number,
  taskName: string,
  deadlineDate: string,
  priority: string,
  assignee: string,
  description: string
}

export type boardI = {
  id: number,
  name: string,
  tasks: taskI[]
}

type globalState = {
  userID: number,
  userName: string,
  boards: boardI[]
}
  
const initialState = {
  userID: 1,
  userName: "Alex Stepanchuk",
  boards: [
      {
          id: 1,
          name: "board-1",
          tasks: [
              {
                  id: 1,
                  taskName: "First Task",
                  deadlineDate: "11.01.2011",
                  priority: "Hight",
                  assignee: "Mike",
                  description: "TODO for First Task"
              },
              {
                  id: 2,
                  taskName: "Second Task",
                  deadlineDate: "22.02.2022",
                  priority: "Low",
                  assignee: "Jake",
                  description: "TODO for Second Task"
              },
              {
                id: 3,
                taskName: "Third Task",
                deadlineDate: "21.12.2021",
                priority: "Medium",
                assignee: "JakeJones",
                description: "TODO for Third Task"
              },
          ]
      },
      {
          id: 2,
          name: "board-2",
          tasks: [
              {
                  id: 1,
                  taskName: "First Task of Board-2",
                  deadlineDate: "33.03.2033",
                  priority: "Medium",
                  assignee: "Jane",
                  description: "TODO for First Task of Board-2"
              },
              {
                  id: 2,
                  taskName: "Second Task of Board-2",
                  deadlineDate: "44.04.2044",
                  priority: "Low",
                  assignee: "MAry",
                  description: "TODO for Second Task of Board-2"
              },
          ]
      },
      {
        id: 3,
        name: "board-3",
        tasks: [
            {
                id: 1,
                taskName: "First Task of Board-3",
                deadlineDate: "55.55.2055",
                priority: "Medium",
                assignee: "Person1",
                description: "TODO for First Task of Board-3"
            },
            {
                id: 2,
                taskName: "Second Task of Board-3",
                deadlineDate: "66.66.2066",
                priority: "Low",
                assignee: "Person2",
                description: "TODO for Second Task of Board-3"
            },
        ]
      }
  ]
} as globalState

  const boardsSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
      temp1(state) {
        state = state
      }
    },
  })
  
  export const { temp1 } = boardsSlice.actions
  export default boardsSlice.reducer