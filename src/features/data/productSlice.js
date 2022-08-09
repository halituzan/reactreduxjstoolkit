import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
  loading: false,
  hasErrors: false,
  datas: []
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProduct: state => {
      state.loading = true
    },
    getProductSuccess: (state, { payload }) => {
      console.log(payload)
      state.datas = payload.meals
      state.loading = false
      state.hasErrors = false
    },
    getProductFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

export const { getProduct, getProductSuccess, getProductFailure } = productSlice.actions

export const productSelector = state => state.product

export default productSlice.reducer


export function fetchProduct(searching) {
  return async dispatch => {
    dispatch(getProduct())

    try {
      const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searching}`)

      dispatch(getProductSuccess(data))
    } catch (error) {
      dispatch(getProductFailure())
    }
  }
}