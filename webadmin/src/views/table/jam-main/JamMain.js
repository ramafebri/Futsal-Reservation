import React, {useEffect, useState} from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCol,
  CButton,
  CRow,
  CFormGroup,
  CLabel,
  CInput
} from '@coreui/react'
import CheckSession from '../check-session'
import * as Constant from '../../../config/constant'
import * as Resources from '../../../resources/jammain-api'
import * as ResourcesLap from '../../../resources/lapangan-api'
import ConvertTimeZone from '../tanggal-main/date-function'

const JamMain = () => {
    const [dataJamMain, setDataJamMain] = useState([]);
    const [tglMain, setTglMain] = useState('');
    const [lapanganId, setLapanganId] = useState(0);
    const [dataLap, setDataLap] = useState([]);
    const [next, setNext] = useState(10);
    const [prev, setPrev] = useState(0);

    useEffect(() => {
      getDataLapangan();
      getJamMain();
      CheckSession();
    },[]);


    const getAllJamMainByIdLapTgl = (idLap, tgl) =>{
      if(idLap !== 0 && tgl !== ''){
        Resources.filterJamByIdLapTgl(idLap, ConvertTimeZone(tgl))
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

    const getDataLapangan = () =>{
      ResourcesLap.getLapangan()
      .then(res => {
        setDataLap(res);
      })
      .catch(err => console.log(err))
    }

    const onChangeLapId = (event) =>{
      setLapanganId(parseInt(event.target.value));
      getAllJamMainByIdLapTgl(parseInt(event.target.value), tglMain)
    }

    const onChangeTglMain = (event) =>{
      setTglMain(event.target.value);
      getAllJamMainByIdLapTgl(lapanganId, event.target.value)
    }

    const getJamMain = () =>{
      Resources.getJam()
      .then(res => {
        res.map((item) => item.tanggal = ConvertTimeZone(item.tanggal));
        setDataJamMain(res);
      })
      .catch(err => console.log(err))
    }

    const delJamMainById = (jamId) =>{
      Resources.delJamById(jamId)
      .then(res => {
        setDataJamMain(dataJamMain.filter(item => item.id_jam_main !== jamId));
      })
      .catch(err => console.log(err))
    }

    const IdLapangan = ({item}) =>{
      if(item === 1){
        return(
          <td>
            <h5 className="text-primary font-weight-bold">Lapangan {item}</h5>
          </td>
        )
      } else if (item === 2){
        return(
          <td>
            <h5 className="text-info font-weight-bold">Lapangan {item}</h5>  
          </td>
        )
      } else if (item === 3){
        return(
          <td>
            <h5 className="text-dark font-weight-bold">Lapangan {item}</h5>  
          </td>
        )
      } else {
        return(
          <td>
            <h5 className="text-dark font-weight-bold">Lapangan {item}</h5>  
          </td>
        )
      }
    }

    const Terpesan = ({item}) =>{
      if(item === Constant.YA){
        return(
          <td>
            <p className="text-success font-weight-bold">{item}</p>
          </td>
        )
      } else if (item === Constant.TIDAK){
        return(
          <td>
            <p className="text-danger font-weight-bold">{item}</p>  
          </td>
        )
      }
    }

    const nextPage = (prev, next) =>{
      setNext(next+10)
      setPrev(prev+10)
    }

    const prevPage = (prev, next) =>{
      if(prev !== 0){
        setNext(next-10)
        setPrev(prev-10)
      }
    }

    return (
      <>
        <CRow>
          <CCol xs="12" >
            <CCard>
              <CCardHeader>
                <h2>Jam Main</h2>
              </CCardHeader>
              <CCardBody>
              <div>
                <CButton
                    key='primary'
                    color='primary'
                    size=''
                    className="m-2"
                    to="/table/jammain/addjammain"
                >
                  {Constant.TAMBAH}
                </CButton>
              </div>
              <CFormGroup>
                <CLabel htmlFor="price">Lapangan</CLabel>
                  <select className="form-control" id="selectType" onChange={onChangeLapId}>
                    <option />
                    {dataLap.map(item => (
                      <option key={item.id_lapangan} value={item.id_lapangan}>{`${item.id_lapangan} - ${item.nama_lapangan}`}</option>
                    ))}
                  </select>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="tglmain">Tanggal</CLabel>
                <CInput id="tglmain" type="date" placeholder="2020-01-31" value={tglMain} onChange={onChangeTglMain}/>
              </CFormGroup>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">ID Jam Main</th>
                    <th scope="col">ID Lapangan</th>
                    <th scope="col">Tanggal</th>
                    <th scope="col">Jam</th>
                    <th scope="col">Terpesan</th>
                    <th scope="col">Biaya Reservasi</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dataJamMain.slice(prev, next).map(item => {
                    return(
                      <tr key={item.id_jam_main}>
                        <th>{item.id_jam_main}</th>
                        <IdLapangan item={item.id_lapangan} />
                        <td>{item.tanggal}</td>
                        <td>{item.jam}</td>
                        <Terpesan item={item.terpesan}/>
                        <td>{item.biaya_reservasi}</td>
                        <td>
                          <div>
                            <CButton
                              key='info'
                              color='info'
                              size=''
                              className="m-2"
                              to={{
                                pathname: `/table/jammain/editjammain/${item.id_jam_main}`,
                                data: item
                              }}
                              >
                              {Constant.UBAH}
                            </CButton>
                            <CButton
                              key='danger'
                              color='danger'
                              size=''
                              className="m-2"
                              onClick={()=>delJamMainById(item.id_jam_main)}
                              >
                              {Constant.HAPUS}
                            </CButton>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item">
                            <CButton
                              key='danger'
                              color='light'
                              size=''
                              className="m-2"
                              onClick={()=>prevPage(prev, next)}
                              >
                              Previous
                            </CButton>
                  </li>
                  <li class="page-item">
                            <CButton
                              key='danger'
                              color='light'
                              size=''
                              className="m-2"
                              onClick={()=>nextPage(prev, next)}
                              >
                              Next
                            </CButton>
                  </li>
                </ul>
              </nav>
              </CCardBody>
              <CCardFooter>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </>
    )
  }
  
  export default JamMain