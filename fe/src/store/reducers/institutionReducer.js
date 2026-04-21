import * as types from '../types/institutionTypes';

const initialState = {
  list: [],
  isLoading: false,
  error: null,
};

const institutionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_INSTITUTIONS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case types.GET_INSTITUTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.payload,
      };
    case types.GET_INSTITUTIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default institutionReducer;
