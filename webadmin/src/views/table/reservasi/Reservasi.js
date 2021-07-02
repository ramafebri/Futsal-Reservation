import React, {useEffect, useState} from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CButton,
  CRow,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CFormGroup,
  CLabel,
  CInput
} from '@coreui/react'
import CheckSession from '../check-session'
import * as Constant from '../../../config/constant'
import * as Resources from '../../../resources/reservasi-api'
import * as ResourcesResJamMain from '../../../resources/resjammain-api'
import * as ResourcesLap from '../../../resources/lapangan-api'
import ConvertTimeZone from '../tanggal-main/date-function'
import ExcelFile from './ExcelFile'

const Reservasi = () => {
    const [allDataResJamMain, setAllDataResJamMain] = useState([]);
    const [dataReservasi, setDataReservasi] = useState([]);
    const [dataResJamMain, setDataResJamMain] = useState([]);
    const [selectedReservasi, setSelectedReservasi] = useState({});
    const [lapanganId, setLapanganId] = useState(0);
    const [tglMain, setTglMain] = useState('');
    const [dataLap, setDataLap] = useState([]);
    const [modal, setModal] = useState(false);
    const [next, setNext] = useState(10);
    const [prev, setPrev] = useState(0);

    useEffect(() => {
      CheckSession();
      getAllReservasi();
      getResJamMain();
      getDataLapangan();
    },[]);

    const getDataLapangan = () =>{
      ResourcesLap.getLapangan()
      .then(res => {
          setDataLap(res);
      })
      .catch(err => console.log(err))
    }

    const getAllReservasi = () =>{
      Resources.getReservasi()
        .then(res => {
          res.map((item) => {
            return (
              item.tanggal_main = ConvertTimeZone(item.tanggal_main), 
              item.tanggal_dibuat = ConvertTimeZone(item.tanggal_dibuat)
              );
          });
          setDataReservasi(res);
        })
        .catch(err => console.log(err))
    }

    const getReservasiByLapAndTgl = (tgl, idLap) =>{
      if(tgl !== '' && idLap !== 0){ 
        const data = {
          tanggal_main : ConvertTimeZone(tgl),
          id_lapangan : idLap
        }
        Resources.getReservasiByLapAndTgl(data)
        .then(res => {
          res.map((item) => {
            return (
              item.tanggal_main = ConvertTimeZone(item.tanggal_main), 
              item.tanggal_dibuat = ConvertTimeZone(item.tanggal_dibuat)
              );
          });
          setDataReservasi(res);
        })
        .catch(err => console.log(err))
      }
    }

    const getReservasiDetailById = (resId) =>{
      Resources.getReservasiDetailById(resId)
      .then(res => {
        res.tanggal_main = ConvertTimeZone(res.tanggal_main);
        res.tanggal_dibuat = ConvertTimeZone(res.tanggal_dibuat);
        setSelectedReservasi(res);
      })
      .catch(err => console.log(err))
    }

    const getResJamMain = () =>{
      ResourcesResJamMain.getResJamMain()
      .then(res => setAllDataResJamMain(res))
      .catch(err => console.log(err))
    }

    const getResJamMainByReservasiId = (reservasiId) =>{
      ResourcesResJamMain.getResJamMainByReservasiId(reservasiId)
        .then(res => {
          setDataResJamMain(res);
        })
        .catch(err => console.log(err))
    }

    const delReservasiById = (resId) =>{
      Resources.delReservasiById(resId)
      .then(res => {
        setDataReservasi(dataReservasi.filter(item => item.id_reservasi !== resId));
      })
      .catch(err => console.log(err))
    }

    const toggle = (item)=>{
      getReservasiDetailById(item.id_reservasi);
      getResJamMainByReservasiId(item.id_reservasi);
      setModal(!modal);
    }

    const StatusPembayaran = ({item}) =>{
      if(item === Constant.SUDAH){
        return(
          <td>
            <p className="text-success font-weight-bold">{item}</p>
          </td>
        )
      } else if (item === Constant.TERTUNDA){
        return(
          <td>
            <p className="text-warning font-weight-bold">{item}</p>  
          </td>
        )
      }
      return (
        <td>
          <p className="text-danger font-weight-bold">{item}</p>
        </td>
        )
    }

    const onChangeLapId = (event) =>{
      setLapanganId(parseInt(event.target.value));
      getReservasiByLapAndTgl(tglMain, parseInt(event.target.value))
    }

    const onChangeTglMain = (event) =>{
      setTglMain(event.target.value);
      getReservasiByLapAndTgl(event.target.value, lapanganId)
    }

    const nextPage = (prev, next) =>{
        setNext(next+10)
        setPrev(prev+10)
    }

    const prevPage = (prev, next) =>{
      if(prev !== 0){
        setNext(next-10)
        setPrev(prev-10)
      }
    }

    return (
      <>
        <CRow>
          <CCol xs="12" >
            <CCard>
              <CCardHeader>
                <h2>Reservasi</h2>
                <ExcelFile data={dataReservasi} dataResJamMain={allDataResJamMain}/>
              </CCardHeader>
              <CCardBody>
              <div>
                <CButton
                    key='primary'
                    color='primary'
                    size=''
                    className="m-2"
                    to="/table/reservasi/addreservasi"
                >
                  {Constant.TAMBAH}
                </CButton>
              </div>
              <CFormGroup>
                <CLabel htmlFor="price">Lapangan</CLabel>
                  <select className="form-control" id="selectType" onChange={onChangeLapId}>
                    <option />
                    {dataLap.map(item => (
                      <option key={item.id_lapangan} value={item.id_lapangan}>{`${item.id_lapangan} - ${item.nama_lapangan}`}</option>
                    ))}
                  </select>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="tglmain">Tanggal Main</CLabel>
                <CInput id="tglmain" type="date" value={tglMain} onChange={onChangeTglMain}/>
              </CFormGroup>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">ID Reservasi</th>
                    <th scope="col">ID Pengguna</th>
                    <th scope="col">ID Lapangan</th>
                    <th scope="col">Tanggal Main</th>
                    <th scope="col">Tanggal Dibuat</th>
                    <th scope="col">Total Pembayaran</th>
                    <th scope="col">Status Pembayaran</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dataReservasi.slice(prev, next).map(item => {
                    return(
                      <tr key={item.id_reservasi}>
                        <th>{item.id_reservasi}</th>
                        <td>{item.id_pengguna}</td>
                        <td>{item.id_lapangan}</td>
                        <td>{item.tanggal_main}</td>
                        <td>{item.tanggal_dibuat}</td>
                        <td>Rp {item.total_pembayaran}</td>
                        <StatusPembayaran item={item.status_pembayaran}/>
                        <td>
                          <div>
                            <CButton
                              key='success'
                              color='success'
                              size=''
                              className="m-2"
                              onClick={()=>toggle(item)}
                              >
                              {Constant.DETAIL}
                            </CButton>
                            <CButton
                              key='info'
                              color='info'
                              size=''
                              className="m-2"
                              to={{
                                pathname: `/table/reservasi/editreservasi/${item.id_reservasi}`,
                                data: item
                              }}
                              >
                              {Constant.UBAH}
                            </CButton>
                            <CButton
                              key='danger'
                              color='danger'
                              size=''
                              className="m-2"
                              onClick={()=>delReservasiById(item.id_reservasi)}
                              >
                              {Constant.HAPUS}
                            </CButton>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item">
                            <CButton
                              key='danger'
                              color='light'
                              size=''
                              className="m-2"
                              onClick={()=>prevPage(prev, next)}
                              >
                              Previous
                            </CButton>
                  </li>
                  <li class="page-item">
                            <CButton
                              key='danger'
                              color='light'
                              size=''
                              className="m-2"
                              onClick={()=>nextPage(prev, next)}
                              >
                              Next
                            </CButton>
                  </li>
                </ul>
              </nav>
              </CCardBody>
            </CCard>
          </CCol>
          <CModal
            show={modal}
            onClose={()=>setModal(false)}
          >
            <CModalHeader closeButton><h5>Detil Reservasi</h5></CModalHeader>
            <CModalBody>
              <h4>Reservasi</h4>
              <p>ID Reservasi: {selectedReservasi.id_reservasi}</p>
              <p>Tanggal Main: {selectedReservasi.tanggal_main}</p>
              <p>Tanggal Dibuat: {selectedReservasi.tanggal_dibuat}</p>
              <p>Jam Main: {dataResJamMain.map(item => item.jam_main + ', ')}</p>
              <p>Total Pembayaran: {selectedReservasi.total_pembayaran}</p>
              <p>Status Pembayaran: {selectedReservasi.status_pembayaran}</p>

              <h4>Lapangan</h4>
              <p>ID Lapangan: {selectedReservasi.id_lapangan}</p>
              <p>Nama Lapangan: {selectedReservasi.nama_lapangan}</p>
              <p>Jenis Lapangan: {selectedReservasi.jenis_lapangan}</p>

              <h4>Pemesan</h4>
              <p>ID Pemesan: {selectedReservasi.id_pengguna}</p>
              <p>Nama Pemesan: {selectedReservasi.nama_pengguna}</p>
              <p>No Telp Pemesan: {selectedReservasi.no_telp_pengguna}</p>
            </CModalBody>
            <CModalFooter>
              <CButton
                color="secondary"
                onClick={()=>setModal(false)}
              >Cancel</CButton>
            </CModalFooter>
          </CModal>
        </CRow>
      </>
    )
  }
  
  export default Reservasi