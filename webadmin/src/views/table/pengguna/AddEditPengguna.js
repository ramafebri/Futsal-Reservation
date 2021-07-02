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
import * as Resources from '../../../resources/pengguna-api'

const AddEditPengguna = () =>{
    const {data} = useLocation();
    const {idPengguna} = useParams();
    const [headerTitle, setHeaderTitle] = useState(Constant.TAMBAH);
    const [nama, setNama] = useState('');
    const [notelp, setNotelp] = useState('');
    const [password, setPassword] = useState('');
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
      CheckSession();
      if(data){
        setHeaderTitle(Constant.UBAH);
        setData(data);
      } else if(idPengguna) {
        setHeaderTitle(Constant.UBAH);
        getUserById();
      }
    },[data]);

    const getUserById = () =>{
      if(idPengguna){
        Resources.getUserById(idPengguna)
        .then(res => {
          setData(res);
        })
        .catch(err => console.log(err))
      }
    }

    const setData = (data) =>{
      setNama(data.nama_pengguna);
      setNotelp(data.no_telp_pengguna);
      setPassword(data.password);
    }

    const onChangeNama = (event) =>{
      setNama(event.target.value)
    }

    const onChangeNotelp = (event) =>{
      setNotelp(event.target.value)
    }

    const onChangePassword = (event) =>{
      setPassword(event.target.value)
    }

    const createUser = () =>{
      setShowLoading(true);
      const datas = {
        name: nama,
        phoneNumber: notelp,
        password
      }

      Resources.postUser(datas)
      .then(res => {
        setShowLoading(false);
        window.location.href = DOMAIN_URL+'table/pengguna';
      })
      .catch(err => {
        alert(Constant.DUPLICATE_USER)
        console.log(err);
        setShowLoading(false);
      })
    }

    const editUser = () =>{
      setShowLoading(true);
      const datas = {
        userId: idPengguna,
        name: nama,
        phoneNumber: notelp,
        password
      }
      
      Resources.putUserById(datas)
      .then(res => {
        setShowLoading(false);

        if(res.code === "ER_DUP_ENTRY"){
          alert(Constant.DUPLICATE_USER)
        } else {
          window.location.href = DOMAIN_URL+'table/pengguna';
        }
      })
      .catch(err => {
        alert(Constant.DUPLICATE_USER)
        console.log(err);
        setShowLoading(false);
      })
    }

    const onSubmit = () =>{
      if(nama !== '' && notelp !== '' && password !== ''){
        if(headerTitle === Constant.TAMBAH){
          createUser();
        }else{
          editUser();
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
                <h2>{headerTitle} Pengguna</h2>
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
                <CLabel htmlFor="password">Password</CLabel>
                <CInput id="password" placeholder="Password" value={password} onChange={onChangePassword} />
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

export default AddEditPengguna