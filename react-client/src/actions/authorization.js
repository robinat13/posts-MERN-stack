import { AUTHORIZE, DEAUTHORIZE } from "./actionTypes";

export const authorize = payload => {
  return {
    type: AUTHORIZE,
    payload
  };
};

export const deauthorize = () => {
  return {
    type: DEAUTHORIZE
  };
};
