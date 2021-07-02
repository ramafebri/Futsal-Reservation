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
import * as Resources from '../../../resources/lapangan-api'

const AddEditLapangan = () =>{
    const {data} = useLocation();
    const {idLapangan} = useParams();
    const [headerTitle, setHeaderTitle] = useState(Constant.TAMBAH);
    const [name, setName] = useState('');
    const [picture, setPicture] = useState('');
    const [type, setType] = useState('');
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
      CheckSession();
      if(data){
        setHeaderTitle(Constant.UBAH);
        setData(data);
      } else if(idLapangan) {
        setHeaderTitle(Constant.UBAH);
        getLapanganById();
      }
    },[data]);

    const getLapanganById = () =>{
      if(idLapangan){
        Resources.getLapanganById(idLapangan)
        .then(res => {
          setData(res);
        })
        .catch(err => console.log(err))
      }
    }

    const setData = (data) =>{
      setName(data.nama_lapangan);
      setPicture(data.gambar_lapangan);
      setType(data.jenis_lapangan);
    }

    const onChangeName = (event) =>{
      setName(event.target.value)
    }

    const onChangePicture = (event) =>{
      setPicture(event.target.value)
    }

    const onChangeType = (event) =>{
      setType(event.target.value)
    }

    const createLapangan = () =>{
      setShowLoading(true);
      const datas = {
        name,
        picture,
        type
      }

      Resources.postLapangan(datas)
      .then(res => {
        // console.log(res);
        setShowLoading(false);
        window.location.href = DOMAIN_URL+'table/lapangan';
      })
      .catch(err => {
        console.log(err);
        setShowLoading(false);
      })
    }

    const editLapangan = () =>{
      setShowLoading(true);
      const datas = {
        lapanganId: idLapangan,
        name,
        picture,
        type
      }
      
      Resources.putLapanganById(datas)
      .then(res => {
        // console.log(res);
        setShowLoading(false);
        window.location.href = DOMAIN_URL+'table/lapangan';
      })
      .catch(err => {
        console.log(err);
        setShowLoading(false);
      })
    }

    const onSubmit = () =>{
      if(name !== '' && picture !== '' && type !== ''){
        if(headerTitle === Constant.TAMBAH){
          createLapangan();
        }else{
          editLapangan();
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
                <h2>{headerTitle} Lapangan</h2>
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
                <CInput id="nama" placeholder="Nama" value={name} onChange={onChangeName} />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="picture">URL Gambar</CLabel>
                <CInput id="picture" placeholder="URL Gambar" value={picture} onChange={onChangePicture}/>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="jenis-lapangan">Jenis Lapangan</CLabel>
                  <select className="form-control" id="selectType" onChange={onChangeType}>
                    <option value=""></option>
                    <option selected={type === "Vinyl" ? true : false} value="Vinyl">Vinyl</option>
                    <option selected={type === "Sintetis" ? true : false} value="Sintetis">Sintetis</option>
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

export default AddEditLapangan