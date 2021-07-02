import {create} from 'apisauce';
import API_URL from '../config/env';
import * as API from '../config/api';

const api = create({baseURL: API_URL});

export const postReservasi = async (data) => {
    return new Promise((resolve, reject) => {
      api
        .post(API.GET_POST_RESERVASI, {
          id_pengguna: data.userId,
          id_lapangan: data.lapId,
          tanggal_main: data.tglMain,
          tanggal_dibuat: data.tglDibuat,
          total_pembayaran: data.total,
          status_pembayaran: data.status,
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

  export const putReservasiById = (data) => {
    return new Promise((resolve, reject) => {
      api
        .put(API.PUT_RESERVASI.replace(/{resId}/, data.resId), {
            id_pengguna: data.userId,
            id_lapangan: data.lapId,
            tanggal_main: data.tglMain,
            tanggal_dibuat: data.tglDibuat,
            total_pembayaran: data.total,
            status_pembayaran: data.status,
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

  export const delReservasiById = (resId) => {
    return new Promise((resolve, reject) => {
      api
        .put(API.DEL_RESERVASI.replace(/{resId}/, resId),{
          status_reservasi: 1
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
  
  export const getReservasi = () => {
    return new Promise((resolve, reject) => {
      api
        .get(API.GET_POST_RESERVASI)
        .then((response) => {
          if (response.ok) resolve(response.data);
          else reject(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const getReservasiById = (resId) => {
    return new Promise((resolve, reject) => {
      api
        .get(API.GET_RESERVASI_BY_ID.replace(/{resId}/, resId))
        .then((response) => {
          if (response.ok) resolve(response.data);
          else reject(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const getReservasiDetailById = (resId) => {
    return new Promise((resolve, reject) => {
      api
        .get(API.GET_RESERVASI_DETAIL_BY_ID.replace(/{resId}/, resId))
        .then((response) => {
          if (response.ok) resolve(response.data);
          else reject(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const getReservasiByLapAndTgl = (data) => {
    return new Promise((resolve, reject) => {
      const URL1 = API.GET_RESERVASI_BY_LAP_TGL.replace(/{tanggal_main}/, data.tanggal_main);
      const URL2 = URL1.replace(/{id_lapangan}/, data.id_lapangan);
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