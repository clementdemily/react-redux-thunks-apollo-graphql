import contants from "../constants";
import graphQlClient from "../graphql/client";
import * as UserUtils from "../utils/user";
import * as UserRequests from "../graphql/user";
import * as DirectionRequests from "../graphql/direction";

const setUser = user => ({
  type: contants.user.SET_USER,
  payload: user
});

export const signUp = (username, email, password) => (dispatch, _getState) => {
  dispatch(main.setLoading(true));

  graphQlClient
    .mutate({
      mutation: UserRequests.SIGN_UP,
      variables: { username, email, password },
      update: (_cache, result) => {
        const {
          data: {
            signUp: {
              user: { email }
            }
          }
        } = result;
        dispatch(signIn(email, password));
      }
    })
    .catch(error => {
      console.log("error", error);
    })
    .finally(() => {
      dispatch(main.setLoading(false));
    });
};

export const signIn = (email, password) => (dispatch, _getState) => {
  dispatch(main.setLoading(true));

  graphQlClient
    .mutate({
      mutation: UserRequests.SIGN_IN,
      variables: { email, password },
      update: (_cache, result) => {
        const {
          data: {
            signIn: { token, user }
          }
        } = result;
        UserUtils.setTokenToLocalStorage(token);
        dispatch(setUser(user));
      }
    })
    .catch(error => {
      console.log("error", error);
    })
    .finally(() => {
      dispatch(main.setLoading(false));
    });
};

export const direction = (coordinates, travelMode) => (dispatch, getState) => {
  dispatch(main.setLoading(true));

  graphQlClient
    .query({
      query: DirectionRequests.DIRECTION,
      variables: {
        coordinates,
        travelMode
      }
    })
    .then(result => {
      const {
        data: { direction }
      } = result;
      dispatch(doSomethingWithDirection(direction));
    })
    .catch(error => {
      console.log("error", error);
    })
    .finally(() => {
      dispatch(main.setLoading(false));
    });
};

// {
//   query: DirectionRequests.DIRECTION,
//   variables: {
//     coordinates: {
//       startLat: 50.6333,
//       startLng: 3.0667,
//       endLat: 48.8534,
//       endLng: 2.3488
//     },
//     travelMode: "driving"
//   }
// }
