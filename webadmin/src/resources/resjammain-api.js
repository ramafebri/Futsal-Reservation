import {create} from 'apisauce';
import API_URL from '../config/env';
import * as API from '../config/api';

const api = create({baseURL: API_URL});

export const postResJamMain = (resId, jamMain) => {
  return new Promise((resolve, reject) => {
    api
      .post(API.GET_POST_RESJAMMAIN, 
        {
          id_reservasi: resId,
          jam_main: jamMain
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

export const getResJamMain = () => {
  return new Promise((resolve, reject) => {
    api
      .get(API.GET_POST_RESJAMMAIN)
      .then((response) => {
        if (response.ok) resolve(response.data);
        else reject(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getResJamMainByReservasiId = (resId) => {
    return new Promise((resolve, reject) => {
      api
        .get(API.GET_RESJAMMAIN_BY_RESERVASI_ID.replace(/{resId}/, resId))
        .then((response) => {
          if (response.ok) resolve(response.data);
          else reject(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
};

export const delResJamMainByReservasiId = (resId, jam_main) => {
  return new Promise((resolve, reject) => {
    const URI = API.DEL_RESJAMMAIN.replace(/{id_reservasi}/, resId)
    api
      .delete(URI.replace(/{jam_main}/, jam_main))
      .then((response) => {
        if (response.ok) resolve(response.data);
        else reject(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};