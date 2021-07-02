export const GET_POST_USER = 'users';
export const PUT_USER = 'users/{userId}';
export const DEL_USER = 'users/delete/{userId}';
export const GET_USER_BY_ID = 'users/{userId}';
export const LOGIN_ADMIN = 'users/admin/login';
export const GET_USER_BY_NAME = 'users/filter/filter?name={name}';

export const GET_POST_LAPANGAN = 'lapangan';
export const PUT_LAPANGAN = 'lapangan/{lapanganId}';
export const DEL_LAPANGAN = 'lapangan/delete/{lapanganId}';
export const GET_LAPANGAN_BY_ID = 'lapangan/{lapanganId}';

export const GET_POST_KONTAK = 'info';
export const DEL_PUT_KONTAK = 'info/{infoId}';
export const GET_KONTAK_BY_ID = 'info/{infoId}';

export const GET_POST_TGL = 'tglmain';
export const DEL_PUT_TGL = 'tglmain/{tglId}';
export const GET_TGL_BY_ID = 'tglmain/{tglId}';

export const GET_POST_JAM = 'jammain';
export const DEL_PUT_JAM = 'jammain/{jamId}';
export const GET_JAM_MAIN_BY_ID = 'jammain/{jamId}';

export const GET_POST_RESERVASI = 'reservasi';
export const GET_RESERVASI_BY_LAP_TGL = 'reservasi/filter/filter?tanggal_main={tanggal_main}&id_lapangan={id_lapangan}';
export const PUT_RESERVASI = 'reservasi/{resId}';
export const DEL_RESERVASI = 'reservasi/delete/{resId}';
export const GET_RESERVASI_BY_ID = 'reservasi/{resId}';
export const GET_RESERVASI_DETAIL_BY_ID = 'reservasi/detail/{resId}';

export const GET_RESJAMMAIN_BY_RESERVASI_ID = 'resjammain/reservasi/{resId}';
export const GET_POST_RESJAMMAIN = 'resjammain';
export const DEL_RESJAMMAIN = 'resjammain/delete?id_reservasi={id_reservasi}&jam_main={jam_main}';

export const GET_TGL_MAIN_BY_LAP_ID = 'tglmain/lapangan/{lapanganId}';
export const GET_TGL_MAIN_BY_DATE_AND_IDLAP =
  'tglmain/date/?date={date}&id_lapangan={lapanganId}';

export const GET_JAM_MAIN_BY_IDLAP_TGL = 'jammain/filter/filter?tanggal={tanggal}&id_lapangan={id_lapangan}'
export const PUT_JAM_MAIN_TERPESAN = 'jammain/booking/{jam_mainId}';