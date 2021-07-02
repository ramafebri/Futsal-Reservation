import React, {useEffect, useState} from 'react'
import { useLocation, useParams } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CSpinner,
  CRow} from '@coreui/react'
import CheckSession from '../check-session'
import {DOMAIN_URL} from '../../../config/env'
import * as Constant from '../../../config/constant'
import * as Resources from '../../../resources/tglmain-api'
import * as ResourcesLap from '../../../resources/lapangan-api'
import ConvertTimeZone from './date-function'

const AddEditTanggalMain = () =>{
    const {data} = useLocation();
    const {idTglMain} = useParams();
    const [headerTitle, setHeaderTitle] = useState(Constant.TAMBAH);
    const [lapanganId, setLapanganId] = useState(0);
    const [tanggal, setTanggal] = useState('');
    const [dataLap, setdataLap] = useState([]);
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
      getDataLapangan();
      CheckSession();
      if(data){
        setHeaderTitle(Constant.UBAH);
        setData(data);
      } else if(idTglMain) {
        setHeaderTitle(Constant.UBAH);
        getTglById();
      }
    },[data]);

    const getTglById = () =>{
      if(idTglMain){
        Resources.getTglById(idTglMain)
        .then(res => {
          res.tanggal = ConvertTimeZone(res.tanggal);
          setData(res);
        })
        .catch(err => console.log(err))
      }
    }

    const setData = (data) =>{
      setLapanganId(data.id_lapangan);
      setTanggal(data.tanggal);
    }

    const onChangeLapanganId = (event) =>{
      setLapanganId(parseInt(event.target.value))
    }

    const onChangeTanggal = (event) =>{
      setTanggal(event.target.value)
    }

    const getDataLapangan = () =>{
      ResourcesLap.getLapangan()
      .then(res => {
        setdataLap(res);
      })
      .catch(err => console.log(err))
    }

    const createTglMain = () =>{
      setShowLoading(true);
      const datas = {
        lapanganId,
        tanggal,
      }

      Resources.postTgl(datas)
      .then(res => {
        // console.log(res);
        setShowLoading(false);
        window.location.href = DOMAIN_URL+'table/tglmain';
      })
      .catch(err => {
        console.log(err);
        setShowLoading(false);
      })
    }

    const editTglMain = () =>{
      setShowLoading(true);
      const datas = {
        tglId: idTglMain,
        lapanganId,
        tanggal,
      }
      
      Resources.putTglById(datas)
      .then(res => {
        // console.log(res);
        setShowLoading(false);
        window.location.href = DOMAIN_URL+'table/tglmain';
      })
      .catch(err => {
        console.log(err);
        setShowLoading(false);
      })
    }

    const onSubmit = () =>{
      if(lapanganId !== 0 && tanggal !== ''){
        if(headerTitle === Constant.TAMBAH){
          createTglMain();
        }else{
          editTglMain();
        }
      } else {
        alert('Semua form wajib diisi')
      }
    }
  
    return(
        <CRow>
            <CCol xs="12" sm="10">
          <CCard>
            <CCardHeader>
                <h2>{headerTitle} Tanggal Main</h2>
                <div className="d-flex justify-content-center">
                  <CSpinner
                    color="success"
                    style={{width:'4rem', height:'4rem', display: showLoading ? 'block':'none'}}
                  />
                </div>
            </CCardHeader>
            <CCardBody>
              <CFormGroup>
                <CLabel htmlFor="price">ID Lapangan</CLabel>
                  <select className="form-control" id="selectType" onChange={onChangeLapanganId}>
                      <option />
                    {dataLap.map(item => (
                      <option key={item.id_lapangan} selected={item.id_lapangan === lapanganId ? true : false} value={item.id_lapangan}>{`${item.id_lapangan} - ${item.nama}`}</option>
                    ))}
                  </select>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="tglmain">Tanggal Main</CLabel>
                <CInput id="tglmain" type="date" placeholder="2020-01-31" value={tanggal} onChange={onChangeTanggal}/>
              </CFormGroup>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="" color="primary" onClick={onSubmit}>Submit</CButton>
            </CCardFooter>
          </CCard>
        </CCol>
        </CRow>
    )
}

export default AddEditTanggalMain