import {create} from 'apisauce';
import API_URL from '../config/env';
import * as API from '../config/api';

const api = create({baseURL: API_URL});

  export const postInformasi = async (data) => {
    return new Promise((resolve, reject) => {
      api
        .post(API.GET_POST_KONTAK, {
          nama_informasi: data.name,
          no_telp_informasi: data.phoneNumber,
          logo: data.logo,
          alamat: data.alamat
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

  export const putInformasiById = (data) => {
    return new Promise((resolve, reject) => {
      api
        .put(API.DEL_PUT_KONTAK.replace(/{infoId}/, data.infoId), {
          nama_informasi: data.name,
          no_telp_informasi: data.phoneNumber,
          logo: data.logo,
          alamat: data.alamat
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

  export const delInformasiById = (infoId) => {
    return new Promise((resolve, reject) => {
      api
        .delete(API.DEL_PUT_KONTAK.replace(/{infoId}/, infoId))
        .then((response) => {
          if (response.ok) resolve(response.data);
          else reject(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  
  export const getInformasi = () => {
    return new Promise((resolve, reject) => {
      api
        .get(API.GET_POST_KONTAK)
        .then((response) => {
          if (response.ok) resolve(response.data);
          else reject(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const getInformasiById = (infoId) => {
    return new Promise((resolve, reject) => {
      api
        .get(API.GET_KONTAK_BY_ID.replace(/{infoId}/, infoId))
        .then((response) => {
          if (response.ok) resolve(response.data);
          else reject(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };