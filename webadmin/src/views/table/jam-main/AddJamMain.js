import React, {useEffect, useState} from 'react'
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
import moment from 'moment';
import {DOMAIN_URL} from '../../../config/env'
import * as Constant from '../../../config/constant'
import * as Resources from '../../../resources/jammain-api'
import * as ResourcesLap from '../../../resources/lapangan-api'
import DataJamMain from './DataJamMain';
import {DifferenceDay} from '../tanggal-main/date-function'

const AddJamMain = () =>{
    const [lapId, setLapId] = useState(0);
    const [tglMainStart, setTglMainStart] = useState('');
    const [tglMainEnd, setTglMainEnd] = useState('');
    const [jam, setJam] = useState([]);
    const [terpesan, setTerpesan] = useState('');
    const [price, setPrice] = useState(0);
    const [showLoading, setShowLoading] = useState(false);
    const [dataLap, setDataLap] = useState([]);

    useEffect(() => {
      getDataLapangan();
      CheckSession();
    },[]);

    const getDataLapangan = () =>{
      ResourcesLap.getLapangan()
      .then(res => {
        setDataLap(res);
      })
      .catch(err => console.log(err))
    }

    const onChangeLapId = (event) =>{
      if(event.target.value){
        setLapId(parseInt(event.target.value));
      } else {
        setLapId(0);
      }
    }

    const onChangeTglMainStart = (event) =>{
      console.log(event.target.value)
      setTglMainStart(event.target.value);
    }

    const onChangeTglMainEnd = (event) =>{
      setTglMainEnd(event.target.value);
    }

    const onChangeJam = (item) =>{
      if(!jam.includes(item)){
        setJam([...jam, item]);
      } else {
        const filteredJamMain = jam.filter((e) => e !== item);
        setJam(filteredJamMain);
      }
    }

    const onChangeTerpesan = (event) =>{
      setTerpesan(event.target.value);
    }

    const onChangePrice = (event) =>{
      setPrice(parseInt(event.target.value));
    }

    const createJamMain = (tanggal, jamMain) =>{
      const datas = {
        id_lapangan: lapId,
        tanggal,
        jam: jamMain,
        terpesan,
        biaya_reservasi: price
      }

      Resources.postJam(datas)
      .then(res => {
        // console.log(res);
      })
      .catch(err => console.log(err))
    }

    const onSubmit = () =>{
      if(lapId !== 0 && tglMainStart !== '' && jam.length !== 0 && terpesan !== ''){
        setShowLoading(true);
        var date = new Date(tglMainStart);
        const dayLength = DifferenceDay(tglMainStart, tglMainEnd);

        for(var i=0; i<=dayLength; i++){
          for(var j=0; j<jam.length; j++){
            createJamMain(moment(date).format("YYYY-MM-DD"), jam[j]);
          }
          date.setDate(date.getDate() + 1);
        }
        setTimeout(goToJamMain, 5000);
      } else {
        alert('Semua form wajib diisi')
      }
    }

    const goToJamMain = () =>{
      setShowLoading(false);
      window.location.href = DOMAIN_URL+'table/jammain';
    }
  
    return(
        <CRow>
            <CCol xs="12" sm="10">
          <CCard>
            <CCardHeader>
                <h2>{Constant.TAMBAH} Jam Main</h2>
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
                      <option key={item.id_lapangan} value={item.id_lapangan}>{`${item.nama_lapangan}`}</option>
                    ))}
                  </select>
              </CFormGroup>
              <CFormGroup>
                <div class="row">
                  <div class="col-5">
                    <CLabel htmlFor="tglmain">Tanggal Main</CLabel> 
                    <CInput id="tglmain" type="date" value={tglMainStart} onChange={onChangeTglMainStart}/>
                  </div>
                  <div class="col">
                    <p class="text-center"></p>
                    <span class="align-middle"><h5 class="text-center">s/d</h5></span>
                  </div>
                  <div class="col-5">
                    <CLabel htmlFor="tglmain">Tanggal Main</CLabel> 
                    <CInput id="tglmain" type="date" value={tglMainEnd} onChange={onChangeTglMainEnd}/>
                  </div>       
                </div>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="jammain">Jam Main</CLabel>
                <div>
                  {DataJamMain.map(item => {
                    if(jam.includes(item) === false){
                      return(
                        <CButton key={item} type="submit" className="m-2" size="" color="secondary" onClick={()=>onChangeJam(item)}>{item}</CButton>
                      )
                    } else {
                      return(
                        <CButton key={item} type="submit" className="m-2" size="" color="success" onClick={()=>onChangeJam(item)}>{item}</CButton>
                      )
                    }
                  })}
                </div>
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

export default AddJamMain