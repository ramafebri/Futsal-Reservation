import {create} from 'apisauce';
import API_URL from '../config/env';
import * as API from '../config/api';

const api = create({baseURL: API_URL});

export const postTgl = async (data) => {
    return new Promise((resolve, reject) => {
      api
        .post(API.GET_POST_TGL, {
          id_lapangan: data.lapanganId,
          tanggal: data.tanggal,
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

  export const putTglById = (data) => {
    return new Promise((resolve, reject) => {
      api
        .put(API.DEL_PUT_TGL.replace(/{tglId}/, data.tglId), {
            id_lapangan: data.lapanganId,
            tanggal: data.tanggal,
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

  export const delTglById = (tglId) => {
    return new Promise((resolve, reject) => {
      api
        .delete(API.DEL_PUT_TGL.replace(/{tglId}/, tglId))
        .then((response) => {
          if (response.ok) resolve(response.data);
          else reject(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  
  export const getTgl = () => {
    return new Promise((resolve, reject) => {
      api
        .get(API.GET_POST_TGL)
        .then((response) => {
          if (response.ok) resolve(response.data);
          else reject(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const getTglById = (tglId) => {
    return new Promise((resolve, reject) => {
      api
        .get(API.GET_TGL_BY_ID.replace(/{tglId}/, tglId))
        .then((response) => {
          if (response.ok) resolve(response.data);
          else reject(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const getTglMainByLapId = (lapanganId) => {
    return new Promise((resolve, reject) => {
      api
        .get(API.GET_TGL_MAIN_BY_LAP_ID.replace(/{lapanganId}/, lapanganId))
        .then((response) => {
          if (response.ok) resolve(response.data);
          else reject(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  
  export const getTglMainByDate = (date, idLap) => {
    return new Promise((resolve, reject) => {
      const URL1 = API.GET_TGL_MAIN_BY_DATE_AND_IDLAP.replace(/{date}/, date);
      const URL2 = URL1.replace(/{lapanganId}/, idLap);
      api
        .get(URL2)
        .then((response) => {
          if (response.ok) resolve(response.data);
          else reject(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };