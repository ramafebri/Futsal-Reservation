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
  CSpinner ,
  CRow} from '@coreui/react'
import CheckSession from '../check-session'
import {DOMAIN_URL} from '../../../config/env'
import * as Constant from '../../../config/constant'
import * as Resources from '../../../resources/reservasi-api'
import * as ResourcesUser from '../../../resources/pengguna-api'
import * as ResourcesResJamMain from '../../../resources/resjammain-api'
import * as ResourcesLap from '../../../resources/lapangan-api'
import * as ResourcesJamMain from '../../../resources/jammain-api'
import ConvertTimeZone from '../tanggal-main/date-function'

const AddEditReservasi = () =>{
    const {data} = useLocation();
    const {idReservasi} = useParams();
    const [headerTitle, setHeaderTitle] = useState(Constant.TAMBAH);
    const [lapId, setLapId] = useState(0);
    const [userId, setUserId] = useState(0);
    const [tglMain, setTglMain] = useState('');
    const [tglDibuat, setTglDibuat] = useState('');
    const [total, setTotal] = useState(0);

    const [status, setStatus] = useState('');
    const [showLoading, setShowLoading] = useState(false);
    const [selectedJamMainId, setSelectedJamMainId] = useState([]);
    const [selectedJamMain, setSelectedJamMain] = useState([]);

    const [dataLap, setDataLap] = useState([]);
    const [dataUser, setDataUser] = useState([]);
    const [dataJamMain, setDataJamMain] = useState([]);
    const [dataResJamMain, setDataResJamMain] = useState([]);

    useEffect(() => {
      CheckSession();
      getDataLapangan();
      getDataUser();
      
      if(data){
        setHeaderTitle(Constant.UBAH);
        setData(data);
      } else if(idReservasi) {
        setHeaderTitle(Constant.UBAH);
        getReservasiById();
      }
    },[data]);

    useEffect(() => {
      const timer = setInterval(() => {
        getAllJamMainByIdLapTgl(lapId, tglMain);
      }, 500);
  
      return () => {
        clearInterval(timer);
      };
    }, [lapId, tglMain]);

    const getReservasiById = () =>{
      if(idReservasi){
        Resources.getReservasiById(idReservasi)
        .then(res => {
          res.tanggal_main = ConvertTimeZone(res.tanggal_main);
          res.tanggal_dibuat = ConvertTimeZone(res.tanggal_dibuat);
          setData(res);
        })
        .catch(err => console.log(err))
      }
    }

    const setData = (data) =>{
      setLapId(data.id_lapangan);
      setUserId(data.id_pengguna);
      setTglMain(data.tanggal_main);
      setTglDibuat(data.tanggal_dibuat);
      setTotal(data.total_pembayaran);
      setStatus(data.status_pembayaran);
      getResJamMainByReservasiId(data);
    }

    const onChangeLapId = (event) =>{
      if(event.target.value){
        if(selectedJamMainId.length === 0){
          setLapId(parseInt(event.target.value));
        } else {
          alert("Batalkan semua jam main yang dipilih sebelum berganti lapangan");
        }
      } else {
        setLapId(0);
      }
    }

    const onChangeUserId = (event) =>{
      setUserId(parseInt(event.target.value));
    }

    const onChangeTotal = (event) =>{
      setTotal(parseInt(event.target.value));
    }

    const onChangeStatus = (event) =>{
      setStatus(event.target.value);
    }

    const onChangeTglMain = (event) =>{
      if(selectedJamMainId.length === 0){
        setTglMain(event.target.value);
      } else {
        alert("Batalkan semua jam main yang dipilih sebelum berganti tanggal");
      }
    }

    const onChangeTglDibuat = (event) =>{
      setTglDibuat(event.target.value);
    }

    const onChangeJamMain = (item) =>{
      if(!selectedJamMain.includes(item.jam)){
        setSelectedJamMainId([...selectedJamMainId, item.id_jam_main]);
        setSelectedJamMain([...selectedJamMain, item.jam]);
        setTotal(total + item.biaya_reservasi);
        putJamMainById(item.id_jam_main, Constant.YA);
      } else {
        const filteredJamMainId = selectedJamMainId.filter((e) => e !== item.id_jam_main);
        const filteredJamMain = selectedJamMain.filter((e) => e !== item.jam);
        setSelectedJamMainId(filteredJamMainId);
        setSelectedJamMain(filteredJamMain);
        setTotal(total - item.biaya_reservasi);
        delResJamMain(data.id_reservasi, item.jam);
        putJamMainById(item.id_jam_main, Constant.TIDAK);
      }
    }

    const getDataLapangan = () =>{
      ResourcesLap.getLapangan()
      .then(res => {
        setDataLap(res);
      })
      .catch(err => console.log(err))
    }

    const getDataUser = () =>{
      ResourcesUser.getUser()
      .then(res => {
        setDataUser(res);
      })
      .catch(err => console.log(err))
    }

    const getAllJamMainByIdLapTgl = (idLap, tgl) =>{
      if(idLap !== 0 && tgl !== ''){
        ResourcesJamMain.filterJamByIdLapTgl(idLap, ConvertTimeZone(tgl))
        .then(res => {
          res.map((item) => item.tanggal = ConvertTimeZone(item.tanggal));
          setDataJamMain(res);
        })
        .catch(err => {
          setDataJamMain([]);
          console.log(err)
        })
      }
    }

    const getResJamMainByReservasiId = (data) =>{
      ResourcesResJamMain.getResJamMainByReservasiId(data.id_reservasi)
        .then(res => {
          console.log(res)
          setDataResJamMain(res);
          if(data.status_pembayaran !== Constant.BATAL){
            for(var i=0; i<res.length; i++){
              selectedJamMain.push(res[i].jam_main);
            }
          }
        })
        .catch(err => console.log(err))
    };

    const createReservasi = () =>{
      setShowLoading(true);
      const datas = {
        lapId,
        userId,
        tglMain,
        tglDibuat,
        total,
        status
      }
      Resources.postReservasi(datas)
      .then(res => {
        for(var i = 0; i < selectedJamMain.length; i++){
          postResJamMain(res.id_reservasi, selectedJamMain[i]);
        }
        setTimeout(goToReservasi, 2000);
      })
      .catch(err => {
        console.log(err);
        setShowLoading(false);
      })
    }

    const editReservasi = () =>{
      setShowLoading(true);
      console.log("data res jam main", dataResJamMain);
      console.log("selected jam main", selectedJamMain);
      const datas = {
        resId: idReservasi,
        lapId,
        userId,
        tglMain,
        tglDibuat,
        total,
        status
      }
      
      Resources.putReservasiById(datas)
      .then(res => {
        const dataJamMain = [];
        for( var j = 0; j < dataResJamMain.length; j++){
          dataJamMain.push(dataResJamMain[j].jam_main);
        }

        for(var i = 0; i < selectedJamMain.length; i++){
          if(!dataJamMain.includes(selectedJamMain[i])){
            postResJamMain(res.id_reservasi, selectedJamMain[i]);
          }
        }
        setTimeout(goToReservasi, 2000);
      })
      .catch(err => {
        console.log(err);
        setShowLoading(false);
      })
    }

    const onSubmit = () =>{
      if(lapId !== 0 && userId !== 0 && tglMain !== '' && tglDibuat !== '' && status !== ''){
        if(headerTitle === Constant.TAMBAH){
          createReservasi();
        }else{
          editReservasi();
        }
      } else {
        alert('Semua form wajib diisi')
      }
    }

    const putJamMainById = (jamMainId, terpesan) =>{
      ResourcesJamMain.putJamMainTerpesan(jamMainId, terpesan)
    }

    const postResJamMain = (resId, jamMain) =>{
      ResourcesResJamMain.postResJamMain(resId, jamMain)
    }

    const delResJamMain = (resId, jamMain) =>{
      ResourcesResJamMain.delResJamMainByReservasiId(resId, jamMain)
    }

    const goToReservasi = () =>{
      setShowLoading(false);
      window.location.href = DOMAIN_URL+'table/reservasi';
    }
  
    return(
        <CRow>
            <CCol xs="12" sm="10">
          <CCard>
            <CCardHeader>
                <h2>{headerTitle} Reservasi</h2>
                <div className="d-flex justify-content-center">
                  <CSpinner
                    color="success"
                    style={{width:'4rem', height:'4rem', display: showLoading ? 'block':'none'}}
                  />
                </div>
            </CCardHeader>
            <CCardBody>
              <CFormGroup>
                <CLabel htmlFor="price">ID Pengguna</CLabel>
                  <select className="form-control" id="selectType" onChange={onChangeUserId}>
                    <option />
                    {dataUser.map(item => (
                      <option key={item.id_pengguna} selected={item.id_pengguna === userId ? true : false} value={item.id_pengguna}>{`${item.id_pengguna} - ${item.nama_pengguna}`}</option>
                    ))}
                  </select>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="price">ID Lapangan</CLabel>
                  <select className="form-control" id="selectType" onChange={onChangeLapId}>
                    <option />
                    {dataLap.map(item => (
                      <option key={item.id_lapangan} selected={item.id_lapangan === lapId ? true : false} value={item.id_lapangan}>{`${item.id_lapangan} - ${item.nama_lapangan}`}</option>
                    ))}
                  </select>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="tglmain">Tanggal Main</CLabel>
                <CInput id="tglmain" type="date" value={tglMain} onChange={onChangeTglMain}/>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="tglmain">Tanggal Dibuat</CLabel>
                <CInput id="tgldibuat" type="date" value={tglDibuat} onChange={onChangeTglDibuat}/>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="jammain">Jam Main (Bisa pilih lebih dari 1)</CLabel>
                <div>
                  {dataJamMain.map(item => {
                    if (
                      item.terpesan === Constant.YA &&
                      selectedJamMain.includes(item.jam) === false
                    ) {
                      return(
                        <CButton key={item.id_jam_main} type="submit" disabled className="m-2" size="" color="secondary" onClick={()=>onChangeJamMain(item)}>{`${item.jam} - Rp ${item.biaya_reservasi}`}</CButton>
                      )
                    } 
                    else if(item.terpesan === Constant.YA && selectedJamMain.includes(item.jam) === true){
                      return(
                        <CButton key={item.id_jam_main} type="submit" className="m-2" size="" color="success" onClick={()=>onChangeJamMain(item)}>{`${item.jam} - Rp ${item.biaya_reservasi}`}</CButton>
                      )
                    }
                    return(
                      <CButton key={item.id_jam_main} type="submit" className="m-2" size="" color="secondary" onClick={()=>onChangeJamMain(item)}>{`${item.jam} - Rp ${item.biaya_reservasi}`}</CButton>
                    )
                  }
                  )}
                </div>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="total">Total Pembayaran</CLabel>
                <CInput id="total" type="number" placeholder="30000" value={total} onChange={onChangeTotal}/>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="status">Status Pembayaran</CLabel>
                <select className="form-control" id="selectType" onChange={onChangeStatus}>
                   <option value="" />
                   <option selected={status === Constant.SUDAH ? true : false} value={Constant.SUDAH}>Sudah</option>
                   <option selected={status === Constant.TERTUNDA ? true : false} value={Constant.TERTUNDA}>Tertunda</option>
                   <option selected={status === Constant.BATAL ? true : false} value={Constant.BATAL}>Batal</option>
                </select>
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

export default AddEditReservasi