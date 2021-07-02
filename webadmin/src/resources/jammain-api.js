import {create} from 'apisauce';
import API_URL from '../config/env';
import * as API from '../config/api';

const api = create({baseURL: API_URL});

export const postJam = async (data) => {
    return new Promise((resolve, reject) => {
      api
        .post(API.GET_POST_JAM, {
          id_lapangan: data.id_lapangan,
          tanggal: data.tanggal,
          jam: data.jam,
          terpesan: data.terpesan,
          biaya_reservasi: data.biaya_reservasi
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

  export const filterJamByIdLapTgl = async (id_lapangan, tanggal) => {
    return new Promise((resolve, reject) => {
      const URL1 = API.GET_JAM_MAIN_BY_IDLAP_TGL.replace(/{tanggal}/, tanggal);
      const URL2 = URL1.replace(/{id_lapangan}/, id_lapangan);
      api
        .get(URL2)
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

  export const putJamById = (data) => {
    return new Promise((resolve, reject) => {
      api
        .put(API.DEL_PUT_JAM.replace(/{jamId}/, data.jamId), {
          id_lapangan: data.id_lapangan,
          tanggal: data.tanggal,
          jam: data.jam,
          terpesan: data.terpesan,
          biaya_reservasi: data.biaya_reservasi
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

  export const delJamById = (jamId) => {
    return new Promise((resolve, reject) => {
      api
        .delete(API.DEL_PUT_JAM.replace(/{jamId}/, jamId))
        .then((response) => {
          if (response.ok) resolve(response.data);
          else reject(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  
  export const getJam = () => {
    return new Promise((resolve, reject) => {
      api
        .get(API.GET_POST_JAM)
        .then((response) => {
          if (response.ok) resolve(response.data);
          else reject(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const getJamById = (jamId) => {
    return new Promise((resolve, reject) => {
      api
        .get(API.GET_JAM_MAIN_BY_ID.replace(/{jamId}/, jamId))
        .then((response) => {
          if (response.ok) resolve(response.data);
          else reject(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const putJamMainTerpesan = (jamMainId, terpesan) => {
    return new Promise((resolve, reject) => {
      api
        .put(API.PUT_JAM_MAIN_TERPESAN.replace(/{jam_mainId}/, jamMainId), {
          terpesan,
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