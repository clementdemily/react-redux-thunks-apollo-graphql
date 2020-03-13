import contants from "../constants";

export const setLoading = loading => ({
  type: contants.main.SET_LOADING,
  payload: loading
});
