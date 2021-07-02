import {create} from 'apisauce';
import API_URL from '../config/env';
import * as API from '../config/api';

const api = create({baseURL: API_URL});

export const postLapangan = async (data) => {
    return new Promise((resolve, reject) => {
      api
        .post(API.GET_POST_LAPANGAN, {
          nama_lapangan: data.name,
          gambar_lapangan: data.picture,
          jenis_lapangan: data.type
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

  export const putLapanganById = (data) => {
    return new Promise((resolve, reject) => {
      api
        .put(API.PUT_LAPANGAN.replace(/{lapanganId}/, data.lapanganId), {
            nama_lapangan: data.name,
            gambar_lapangan: data.picture,
            jenis_lapangan: data.type
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

  export const delLapanganById = (lapanganId) => {
    return new Promise((resolve, reject) => {
      api
        .put(API.DEL_LAPANGAN.replace(/{lapanganId}/, lapanganId), {
          status_lapangan: 1,
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
  
  export const getLapangan = () => {
    return new Promise((resolve, reject) => {
      api
        .get(API.GET_POST_LAPANGAN)
        .then((response) => {
          if (response.ok) resolve(response.data);
          else reject(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const getLapanganById = (lapanganId) => {
    return new Promise((resolve, reject) => {
      api
        .get(API.GET_LAPANGAN_BY_ID.replace(/{lapanganId}/, lapanganId))
        .then((response) => {
          if (response.ok) resolve(response.data);
          else reject(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };