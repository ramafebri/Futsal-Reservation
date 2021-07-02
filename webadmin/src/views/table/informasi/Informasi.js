import React, {useEffect, useState} from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CButton,
  CRow
} from '@coreui/react'

import CheckSession from '../check-session'
import * as Constant from '../../../config/constant'
import * as Resources from '../../../resources/informasi-api'

const fields = [
  {
    key: 'id_informasi',
    label: 'Id Informasi',
  },
  {
    key: 'no_telp_informasi',
    label: 'No Telp',
  },
  {
    key: 'nama_informasi',
    label: 'Nama',
  }, 
  'logo', 'alamat', 'action'
  ]

const Informasi = () => {
    const [dataInformasi, setDataInformasi] = useState([]);

    useEffect(() => {
      getAllInformasi();
      CheckSession();
    },[]);

    const getAllInformasi = () =>{
      Resources.getInformasi()
        .then(res => {
          setDataInformasi(res);
        })
        .catch(err => console.log(err))
    }

    const delInformasiById = (informasiId) =>{
      Resources.delInformasiById(informasiId)
      .then(res => {
        setDataInformasi(dataInformasi.filter(item => item.id_informasi !== informasiId));
      })
      .catch(err => console.log(err))
    }

    return (
      <>
        <CRow>
          <CCol xs="12" >
            <CCard>
              <CCardHeader>
                <h2>Kontak Informasi</h2>
              </CCardHeader>
              <CCardBody>
              <div>
                <CButton
                    key='primary'
                    color='primary'
                    size=''
                    className="m-2"
                    to="/table/informasi/addinformasi"
                >
                  {Constant.TAMBAH}
                </CButton>
              </div>
              <CDataTable
                items={dataInformasi}
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
                              pathname: `/table/informasi/editinformasi/${item.id_informasi}`,
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
                            onClick={()=>delInformasiById(item.id_informasi)}
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
  
  export default Informasi