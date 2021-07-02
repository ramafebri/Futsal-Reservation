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
} from '@coreui/react'
import CheckSession from '../check-session'
import * as Constant from '../../../config/constant'
import * as Resources from '../../../resources/tglmain-api'
import * as ResourcesLap from '../../../resources/lapangan-api'
import ConvertTimeZone from './date-function'

const fields = [
  {
    key: 'id_tanggal_main',
    label: 'Id Tanggal Main',
  },
  {
    key: 'id_lapangan',
    label: 'Id Lapangan',
  },
  {
    key: 'tanggal',
    label: 'Tanggal',
  }, 
  'action'
  ]

const TanggalMain = () => {
    const [dataTglMain, setDataTglMain] = useState([]);
    const [lapanganId, setLapanganId] = useState(0);
    const [dataLap, setDataLap] = useState([]);

    useEffect(() => {
      getAllTglMain();
      getDataLapangan();
      CheckSession();
    },[]);

    const getAllTglMain = () =>{
      Resources.getTgl()
        .then(res => {
          res.map((item) => {
            return (item.tanggal = ConvertTimeZone(item.tanggal));
          });
          setDataTglMain(res);
        })
        .catch(err => console.log(err))
    }

    const getAllTglMainByLap = (lapId) =>{
      Resources.getTglMainByLapId(lapId)
        .then(res => {
          res.map((item) => {
            return (item.tanggal = ConvertTimeZone(item.tanggal));
          });
          setDataTglMain(res);
        })
        .catch(err => console.log(err))
    }

    const getDataLapangan = () =>{
      ResourcesLap.getLapangan()
      .then(res => {
        setDataLap(res);
      })
      .catch(err => console.log(err))
    }

    const delTglMainById = (tglId) =>{
      Resources.delTglById(tglId)
      .then(res => {
        setDataTglMain(dataTglMain.filter(item => item.id_tanggal_main !== tglId));
      })
      .catch(err => console.log(err))
    }

    const onChangeLapId = (event) =>{
      setLapanganId(parseInt(event.target.value));
      getAllTglMainByLap(event.target.value);
    }

    return (
      <>
        <CRow>
          <CCol xs="12" >
            <CCard>
              <CCardHeader>
                <h2>Tanggal Main</h2>
              </CCardHeader>
              <CCardBody>
              <div>
                <CButton
                    key='primary'
                    color='primary'
                    size=''
                    className="m-2"
                    to="/table/tglmain/addtglmain"
                >
                  {Constant.TAMBAH}
                </CButton>
              </div>
              <CFormGroup>
                <CLabel htmlFor="price">Lapangan</CLabel>
                  <select className="form-control" id="selectType" onChange={onChangeLapId}>
                    <option />
                    {dataLap.map(item => (
                      <option key={item.id_lapangan} value={item.id_lapangan}>{`${item.id_lapangan} - ${item.nama}`}</option>
                    ))}
                  </select>
              </CFormGroup>
              <CDataTable
                items={dataTglMain}
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
                              pathname: `/table/tglmain/edittglmain/${item.id_tanggal_main}`,
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
                            onClick={()=>delTglMainById(item.id_tanggal_main)}
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
  
  export default TanggalMain