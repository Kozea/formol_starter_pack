import { combineReducers } from 'redux'

import {
  MERGE_ITEM,
  SET_COMPLEX_ITEM,
  SET_ITEM,
  SET_SIMPLE_ITEM,
} from './actions'

const simpleItem = (state = {}, action) => {
  switch (action.type) {
    case SET_SIMPLE_ITEM:
      return action.item
    default:
      return state
  }
}

const initialItem = {
  name: 'John',
  value: 12,
}

const item = (state = initialItem, action) => {
  switch (action.type) {
    case SET_ITEM:
      return action.item
    case MERGE_ITEM:
      return { ...state, ...action.item }
    default:
      return state
  }
}

const initialComplexItem = {
  firstname: 'John',
  lastname: 'Doe',
  birth: '1988-04-12',
  address: {
    zip: '82937',
    city: 'Los Angeles',
    continent: 'North America',
  },
  fastShipping: true,
  colors: ['#00ffff', '#008000'],
}

const complexItem = (state = initialComplexItem, action) => {
  switch (action.type) {
    case SET_COMPLEX_ITEM:
      return action.item
    default:
      return state
  }
}

export default combineReducers({
  simpleItem,
  item,
  complexItem,
})
