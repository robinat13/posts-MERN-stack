import { AUTHORIZE, DEAUTHORIZE } from "../actions/actionTypes";

export const authorizationReducer = (
  prevState = { authorized: false, token: "" },
  action
) => {
  switch (action.type) {
    case AUTHORIZE:
      prevState = { authorized: true, token: action.payload.token };
      return prevState;
    case DEAUTHORIZE:
      prevState = { authorized: false, token: "" };
      return prevState;
    default:
      return prevState;
  }
};
