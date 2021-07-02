import React, {useEffect, useState} from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CButton,
  CRow,
  CFormGroup,
  CLabel,
  CInput
} from '@coreui/react'

import CheckSession from '../check-session'
import * as Constant from '../../../config/constant'
import * as Resources from '../../../resources/pengguna-api'

const fields = [
  {
    key: 'id_pengguna',
    label: 'Id',
  },
  {
    key: 'nama_pengguna',
    label: 'Nama',
  },
  {
    key: 'no_telp_pengguna',
    label: 'No Telp',
  }, 
  'password', 'action'
  ]

const Pengguna = () => {
    const [dataPengguna, setDataPengguna] = useState([]);
    const [nama, setNama] = useState('');

    useEffect(() => {
      getAllUser();
      CheckSession();
    },[]);

    const getAllUser = () =>{
      Resources.getUser()
        .then(res => {
          setDataPengguna(res);
        })
        .catch(err => console.log(err))
    }

    const onChangeNama = (event) =>{
      setNama(event.target.value);
      if(event.target.value){
        getUserByName(event.target.value);
      } else {
        getAllUser();
      }
    }

    const getUserByName = (name) =>{
      Resources.getUserByName(name)
        .then(res => {
          setDataPengguna(res);
        })
        .catch(err => console.log(err))
    }

    const delUserById = (userId) =>{
      Resources.delUserById(userId)
      .then(res => {
        setDataPengguna(dataPengguna.filter(item => item.id_pengguna !== userId));
      })
      .catch(err => console.log(err))
    }

    return (
      <>
        <CRow>
          <CCol xs="12" >
            <CCard>
              <CCardHeader>
                <h2>Pengguna</h2>
              </CCardHeader>
              <CCardBody>
              <div>
                <CButton
                    key='primary'
                    color='primary'
                    size=''
                    className="m-2"
                    to="/table/pengguna/addpengguna"
                >
                  {Constant.TAMBAH}
                </CButton>
              </div>
              <CFormGroup>
                <CLabel htmlFor="nama">Filter Nama</CLabel>
                <CInput id="nama" placeholder="Nama" value={nama} onChange={onChangeNama} />
              </CFormGroup>
              <CDataTable
                items={dataPengguna}
                fields={fields}
                striped
                itemsPerPage={5}
                pagination
                scopedSlots = {{
                  'action':
                    (item)=>(
                    <>
                      <td>
                        <CButton
                            key='info'
                            color='info'
                            size=''
                            className="m-2"
                            to={{
                              pathname: `/table/pengguna/editpengguna/${item.id_pengguna}`,
                              data: item
                            }}
                            >
                            {Constant.UBAH}
                        </CButton>
                      </td>
                      <td>
                        <CButton
                            key='danger'
                            color='danger'
                            size=''
                            className="m-2"
                            onClick={()=>delUserById(item.id_pengguna)}
                            >
                            {Constant.HAPUS}
                        </CButton>
                      </td>
                    </>
                    )
  
                }}
              />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    )
  }
  
  export default Pengguna