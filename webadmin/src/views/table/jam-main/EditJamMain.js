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
  CLabel,
  CSpinner,
  CInput,
  CRow} from '@coreui/react'
import CheckSession from '../check-session'
import {DOMAIN_URL} from '../../../config/env'
import * as Constant from '../../../config/constant'
import * as Resources from '../../../resources/jammain-api'
import * as ResourcesLap from '../../../resources/lapangan-api'
import ConvertTimeZone from '../tanggal-main/date-function';
import DataJamMain from './DataJamMain';

const EditJamMain = () =>{
    const {data} = useLocation();
    const {idJamMain} = useParams();
    const [lapId, setLapId] = useState(0);
    const [tglMain, setTglMain] = useState('');
    const [jam, setJam] = useState('');
    const [terpesan, setTerpesan] = useState('');
    const [price, setPrice] = useState(0);
    const [showLoading, setShowLoading] = useState(false);
    const [dataLap, setDataLap] = useState([]);

    useEffect(() => { 
      CheckSession();
      getDataLapangan();
      if(data){
        setData(data);
      } else if(idJamMain) {
        getJamById();
      }
    },[data]);

    const getDataLapangan = () =>{
      ResourcesLap.getLapangan()
      .then(res => {
        setDataLap(res);
      })
      .catch(err => console.log(err))
    }

    const getJamById = () =>{
      if(idJamMain){
        Resources.getJamById(idJamMain)
        .then(res => {
          res.map((item) => item.tanggal = ConvertTimeZone(item.tanggal));
          setData(res);
        })
        .catch(err => console.log(err))
      }
    }

    const setData = (data) =>{
      setLapId(data.id_lapangan);
      setTglMain(data.tanggal);
      setJam(data.jam);
      setTerpesan(data.terpesan);
      setPrice(data.biaya_reservasi);
    }

    const onChangeLapId = (event) =>{
      if(event.target.value){
        setLapId(parseInt(event.target.value));
      } else {
        setLapId(0);
      }
    }

    const onChangeTglMain = (event) =>{
      setTglMain(event.target.value);
    }

    const onChangeJam = (event) =>{
      setJam(event.target.value);
    }

    const onChangeTerpesan = (event) =>{
      setTerpesan(event.target.value);
    }

    const onChangePrice = (event) =>{
      setPrice(parseInt(event.target.value));
    }

    const editJamMain = () =>{
      setShowLoading(true);
      const datas = {
        jamId: idJamMain,
        id_lapangan: lapId,
        tanggal: tglMain,
        jam,
        terpesan,
        biaya_reservasi: price
      }
      
      Resources.putJamById(datas)
      .then(res => {
        setShowLoading(false);
        window.location.href = DOMAIN_URL+'table/jammain';
      })
      .catch(err => {
        console.log(err);
        setShowLoading(false);
      })
    }

    const onSubmit = () =>{
        if(lapId !== 0 && tglMain !== '' && jam !== '' && terpesan !== ''){
          editJamMain();
        } else {
          alert('Semua form wajib diisi')
        }
    }
  
    return(
        <CRow>
            <CCol xs="12" sm="10">
          <CCard>
            <CCardHeader>
                <h2>{Constant.UBAH} Jam Main</h2>
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
                  <select className="form-control" id="selectType" onChange={onChangeLapId}>
                    <option />
                    {dataLap.map(item => (
                      <option key={item.id_lapangan} selected={item.id_lapangan === lapId ? true : false} value={item.id_lapangan}>{`${item.nama_lapangan}`}</option>
                    ))}
                  </select>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="tglmain">Tanggal Main</CLabel>
                <CInput id="tglmain" type="date" value={tglMain} onChange={onChangeTglMain}/>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="jammain">Jam Main</CLabel>
                <select className="form-control" id="selectType" onChange={onChangeJam}>
                  <option value=""></option>
                  {DataJamMain.map(item => (
                    <option key={item} selected={jam === item ? true : false} value={item}>{item}</option>
                  ))}
                </select>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="terpesan">Terpesan</CLabel>
                <select className="form-control" id="selectType" onChange={onChangeTerpesan}>
                  <option value=""></option>
                  <option selected={terpesan === Constant.TIDAK ? true : false} value={Constant.TIDAK}>Tidak</option>
                   <option selected={terpesan === Constant.YA ? true : false} value={Constant.YA}>Ya</option>
                </select>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="total">Biaya Reservasi</CLabel>
                <CInput id="total" type="number" placeholder="30000" value={price} onChange={onChangePrice}/>
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

export default EditJamMain