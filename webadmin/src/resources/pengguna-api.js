import {create} from 'apisauce';
import API_URL from '../config/env';
import * as API from '../config/api';

const api = create({baseURL: API_URL});

export const postUser = async (data) => {
    return new Promise((resolve, reject) => {
      api
        .post(API.GET_POST_USER, {
          nama_pengguna: data.name,
          no_telp_pengguna: data.phoneNumber,
          password: data.password,
        })
        .then((response) => {
          if (response.ok) {
            resolve(response.data);
          } else reject(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const putUserById = (data) => {
    return new Promise((resolve, reject) => {
      api
        .put(API.PUT_USER.replace(/{userId}/, data.userId), {
          nama_pengguna: data.name,
          no_telp_pengguna: data.phoneNumber,
          password: data.password,
        })
        .then((response) => {
          if (response.ok) resolve(response.data);
          else reject(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const delUserById = (userId) => {
    return new Promise((resolve, reject) => {
      api
        .put(API.DEL_USER.replace(/{userId}/, userId),{
          status_pengguna :1,
        })
        .then((response) => {
          if (response.ok) resolve(response.data);
          else reject(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  
  export const getUser = () => {
    return new Promise((resolve, reject) => {
      api
        .get(API.GET_POST_USER)
        .then((response) => {
          if (response.ok) resolve(response.data);
          else reject(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const getUserById = (userId) => {
    return new Promise((resolve, reject) => {
      api
        .get(API.GET_USER_BY_ID.replace(/{userId}/, userId))
        .then((response) => {
          if (response.ok) resolve(response.data);
          else reject(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const getUserByName = (name) => {
    return new Promise((resolve, reject) => {
      api
        .get(API.GET_USER_BY_NAME.replace(/{name}/, name))
        .then((response) => {
          if (response.ok) resolve(response.data);
          else reject(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const loginAdmin = async (username, password) => {
    return new Promise((resolve, reject) => {
      api
        .post(API.LOGIN_ADMIN, {
          username,
          password
        })
        .then((response) => {
          if (response.ok) {
            resolve(response.data);
          } else reject(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };