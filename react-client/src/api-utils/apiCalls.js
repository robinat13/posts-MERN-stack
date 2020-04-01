import { store } from "../storeConfig";
import axios from "axios";
import jwt from "jsonwebtoken";
import { authorize, deauthorize } from "../actions/authorization";

const BASE_URL = "http://localhost:4000/";

export const getCall = async (endpoint, withToken = false) => {
  if (withToken) {
    const jwtToken = store.getState().authorization.token;
    const refreshToken = store.getState().authorization.refreshToken;

    if (jwtToken && refreshToken) {
      const validatedToken = await verifyJwtOrRehydrate(jwtToken, refreshToken);
      if (validatedToken.type === "SUCCESS") {
        store.dispatch(
          authorize({
            token: validatedToken.data,
            refreshToken: refreshToken
          })
        );
      } else if (validatedToken.type === "ERROR") {
        store.dispatch(deauthorize());
        return;
      }
      try {
        const response = await axios.get(`${BASE_URL}${endpoint}`, {
          headers: { Authorization: `Bearer ${validatedToken.data}` }
        });
        return { type: "SUCCESS", data: response.data };
      } catch (err) {
        return { type: "ERROR", data: err };
      }
    } else {
      return { type: "INVALID_AUTH" };
    }
  } else {
    try {
      const response = await axios.get(`${BASE_URL}${endpoint}`);
      return { type: "SUCCESS", data: response.data };
    } catch (err) {
      return { type: "ERROR", data: err };
    }
  }
};

export const postCall = async (endpoint, payload, withToken = false) => {
  if (withToken) {
    const jwtToken = store.getState().authorization.token;
    const refreshToken = store.getState().authorization.refreshToken;
    if (jwtToken && refreshToken) {
      const validatedToken = await verifyJwtOrRehydrate(jwtToken, refreshToken);
      if (validatedToken.type === "SUCCESS") {
        store.dispatch(
          authorize({
            token: validatedToken.data,
            refreshToken: refreshToken
          })
        );
      } else if (validatedToken.type === "ERROR") {
        store.dispatch(deauthorize());
        return;
      }
      try {
        const response = await axios.post(`${BASE_URL}${endpoint}`, payload, {
          headers: { Authorization: `Bearer ${validatedToken.data}` }
        });
        return { type: "SUCCESS", data: response.data };
      } catch (err) {
        return { type: "ERROR", data: err };
      }
    } else {
      return { type: "INVALID_AUTH" };
    }
  } else {
    try {
      const response = await axios.post(`${BASE_URL}${endpoint}`, payload);
      return { type: "SUCCESS", data: response.data };
    } catch (err) {
      return { type: "ERROR", data: err };
    }
  }
};

export const patchCall = async (endpoint, payload, withToken = false) => {
  if (withToken) {
    const jwtToken = store.getState().authorization.token;
    const refreshToken = store.getState().authorization.refreshToken;
    if (jwtToken && refreshToken) {
      const validatedToken = await verifyJwtOrRehydrate(jwtToken, refreshToken);
      if (validatedToken.type === "SUCCESS") {
        store.dispatch(
          authorize({
            token: validatedToken.data,
            refreshToken: refreshToken
          })
        );
      } else if (validatedToken.type === "ERROR") {
        store.dispatch(deauthorize());
        return;
      }
      try {
        const response = await axios.patch(`${BASE_URL}${endpoint}`, payload, {
          headers: { Authorization: `Bearer ${validatedToken.data}` }
        });
        return { type: "SUCCESS", data: response.data };
      } catch (err) {
        return { type: "ERROR", data: err };
      }
    } else {
      return { type: "INVALID_AUTH" };
    }
  } else {
    try {
      const response = await axios.patch(`${BASE_URL}${endpoint}`, payload);
      return { type: "SUCCESS", data: response.data };
    } catch (err) {
      return { type: "ERROR", data: err };
    }
  }
};

export const deleteCall = async (endpoint, withToken = false) => {
  if (withToken) {
    const jwtToken = store.getState().authorization.token;
    const refreshToken = store.getState().authorization.refreshToken;

    if (jwtToken && refreshToken) {
      const validatedToken = await verifyJwtOrRehydrate(jwtToken, refreshToken);
      if (validatedToken.type === "SUCCESS") {
        store.dispatch(
          authorize({
            token: validatedToken.data,
            refreshToken: refreshToken
          })
        );
      } else if (validatedToken.type === "ERROR") {
        store.dispatch(deauthorize());
        return;
      }
      try {
        const response = await axios.delete(`${BASE_URL}${endpoint}`, {
          headers: { Authorization: `Bearer ${validatedToken.data}` }
        });
        return { type: "SUCCESS", data: response.data };
      } catch (err) {
        return { type: "ERROR", data: err };
      }
    } else {
      return { type: "INVALID_AUTH" };
    }
  } else {
    try {
      const response = await axios.delete(`${BASE_URL}${endpoint}`);
      return { type: "SUCCESS", data: response.data };
    } catch (err) {
      return { type: "ERROR", data: err };
    }
  }
};

const verifyJwtOrRehydrate = async (jwtToken, refreshToken) => {
  const decodedJwt = jwt.decode(jwtToken);
  const current_time = new Date().getTime() / 1000;
  if (current_time > decodedJwt.exp) {
    // ! EXPIRED

    try {
      const response = await axios.post(`${BASE_URL}auth/refresh-token`, {
        token: refreshToken
      });
      return { type: "SUCCESS", data: response.data.newAccessToken };
    } catch (err) {
      return { type: "ERROR", data: err };
    }
  }
  return { type: "SUCCESS", data: jwtToken };
};
