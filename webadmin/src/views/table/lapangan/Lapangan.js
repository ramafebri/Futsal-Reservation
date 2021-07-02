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
import * as Resources from '../../../resources/lapangan-api'

const fields = [
  {
    key: 'id_lapangan',
    label: 'Id',
  },
  {
    key: 'nama_lapangan',
    label: 'Nama Lapangan',
  },
  {
    key: 'gambar_lapangan',
    label: 'Gambar',
  },
  {
    key: 'jenis_lapangan',
    label: 'Jenis Lapangan',
  },   
  'action'
  ]

const Lapangan = () => {
    const [dataLapangan, setDataLapangan] = useState([]);

    useEffect(() => {
      getAllLapangan();
      CheckSession();
    },[]);

    const getAllLapangan = () =>{
      Resources.getLapangan()
        .then(res => {
          console.log(res);
          setDataLapangan(res);
        })
        .catch(err => console.log(err))
    }

    const delLapanganById = (lapanganId) =>{
      Resources.delLapanganById(lapanganId)
      .then(res => {
        console.log(res);
        setDataLapangan(dataLapangan.filter(item => item.id_lapangan !== lapanganId));
      })
      .catch(err => console.log(err))
    }

    return (
      <>
        <CRow>
          <CCol xs="12" >
            <CCard>
              <CCardHeader>
                <h2>Lapangan</h2>
              </CCardHeader>
              <CCardBody>
              <div>
                <CButton
                    key='primary'
                    color='primary'
                    size=''
                    className="m-2"
                    to="/table/lapangan/addlapangan"
                >
                  {Constant.TAMBAH}
                </CButton>
              </div>
              <CDataTable
                items={dataLapangan}
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
                              pathname: `/table/lapangan/editlapangan/${item.id_lapangan}`,
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
                            onClick={()=>delLapanganById(item.id_lapangan)}
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
  
  export default Lapangan