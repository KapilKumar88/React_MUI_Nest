import { createSlice } from '@reduxjs/toolkit'

const userDetails = JSON.parse(localStorage.getItem("user"));
const initialState = {
  email: userDetails?.userDetails?.email ?? null,
  name: userDetails?.userDetails?.name ?? null,
  isAuthenticated: userDetails?.accessToken.length > 0 ? true : false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserState: (state, action) => {
      state.email = action.payload;
      state.name = action.payload;
      state.value = action.payload;
    },
    resetUserState: () => initialState
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = userSlice.actions;

export default userSlice.reducer;