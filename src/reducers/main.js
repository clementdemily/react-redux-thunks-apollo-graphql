import contants from "../constants";

const initialState = {
  loading: false
};

const main = (state = initialState, action) => {
  switch (action.type) {
    case contants.main.SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export default main;
