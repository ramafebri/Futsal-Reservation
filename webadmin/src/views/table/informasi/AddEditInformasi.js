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
import * as Resources from '../../../resources/informasi-api'

const AddEditInformasi = () =>{
    const {data} = useLocation();
    const {idInformasi} = useParams();
    const [headerTitle, setHeaderTitle] = useState(Constant.TAMBAH);
    const [nama, setNama] = useState('');
    const [notelp, setNotelp] = useState('');
    const [logo, setLogo] = useState('');
    const [alamat, setAlamat] = useState('');
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
      CheckSession();
      if(data){
        setHeaderTitle(Constant.UBAH);
        setData(data);
      } else if(idInformasi) {
        setHeaderTitle(Constant.UBAH);
        getInformasiById();
      }
    },[data]);

    const getInformasiById = () =>{
      if(idInformasi){
        Resources.getInformasiById(idInformasi)
        .then(res => {
          setData(res);
        })
        .catch(err => console.log(err))
      }
    }

    const setData = (data) =>{
      setNama(data.nama_informasi);
      setNotelp(data.no_telp_informasi);
      setLogo(data.logo);
      setAlamat(data.alamat);
    }

    const onChangeNama = (event) =>{
      setNama(event.target.value)
    }

    const onChangeNotelp = (event) =>{
      setNotelp(event.target.value)
    }

    const onChangeLogo = (event) =>{
      setLogo(event.target.value)
    }

    const onChangeAlamat = (event) =>{
      setAlamat(event.target.value)
    }

    const createInformasi = () =>{
      setShowLoading(true);
      const datas = {
        name: nama,
        phoneNumber: notelp,
        logo: logo,
        alamat
      }

      Resources.postInformasi(datas)
      .then(res => {
        // console.log(res);
        setShowLoading(false);
        window.location.href = DOMAIN_URL+'table/informasi';
      })
      .catch(err => {
        console.log(err);
        setShowLoading(false);
      })
    }

    const editInformasi = () =>{
      setShowLoading(true);
      const datas = {
        infoId: idInformasi,
        name: nama,
        phoneNumber: notelp,
        logo: logo,
        alamat
      }
      
      Resources.putInformasiById(datas)
      .then(res => {
        // console.log(res);
        setShowLoading(false);
        window.location.href = DOMAIN_URL+'table/informasi'
      })
      .catch(err => {
        console.log(err);
        setShowLoading(false);
      })
    }

    const onSubmit = () =>{
      if(nama !== '' && notelp !== '' && logo !== '' && alamat !== ''){
        if(headerTitle === Constant.TAMBAH){
          createInformasi();
        }else{
          editInformasi();
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
                <h2>{headerTitle} Informasi</h2>
                <div className="d-flex justify-content-center">
                  <CSpinner
                    color="success"
                    style={{width:'4rem', height:'4rem', display: showLoading ? 'block':'none'}}
                  />
                </div>
            </CCardHeader>
            <CCardBody>
              <CFormGroup>
                <CLabel htmlFor="nama">Nama</CLabel>
                <CInput id="nama" placeholder="Nama" value={nama} onChange={onChangeNama} />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="notelp">Nomor Telepon</CLabel>
                <CInput id="notelp" placeholder="08123456" value={notelp} onChange={onChangeNotelp}/>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="logo">URL Logo</CLabel>
                <CInput id="logo" placeholder="URL Logo" value={logo} onChange={onChangeLogo} />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="alamat">Alamat</CLabel>
                <CInput id="alamat" placeholder="Alamat" value={alamat} onChange={onChangeAlamat} />
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

export default AddEditInformasi