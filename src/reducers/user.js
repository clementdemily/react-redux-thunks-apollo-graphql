import contants from "../constants";

const initialState = {
  user: {}
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case contants.user.SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default user;
