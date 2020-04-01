import { AUTHORIZE, DEAUTHORIZE } from "../actions/actionTypes";

export const authorizationReducer = (
  prevState = { authorized: false, token: "", refreshToken: "" },
  action
) => {
  switch (action.type) {
    case AUTHORIZE:
      prevState = {
        authorized: true,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken
      };
      return prevState;
    case DEAUTHORIZE:
      prevState = { authorized: false, token: "", refreshToken: "" };
      return prevState;
    default:
      return prevState;
  }
};
