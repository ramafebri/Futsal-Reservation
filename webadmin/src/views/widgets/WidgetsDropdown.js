import React, {useEffect, useState} from 'react'
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as ResourcesLapangan from '../../resources/lapangan-api'
import * as ResourcesPengguna from '../../resources/pengguna-api'
import * as ResourcesReservasi from '../../resources/reservasi-api'

const WidgetsDropdown = () => {
  const [dataLapangan, setDataLapangan] = useState([]);
  const [dataPengguna, setDataPengguna] = useState([]);
  const [dataReservasi, setDataReservasi] = useState([]);

    useEffect(() => {
      getAllUser();
      getAllReservasi();
      getAllLapangan();
    },[]);

    const getAllUser = () =>{
      ResourcesPengguna.getUser()
        .then(res => {
          setDataPengguna(res);
        })
        .catch(err => console.log(err))
    }

    const getAllReservasi = () =>{
      ResourcesReservasi.getReservasi()
        .then(res => {
          setDataReservasi(res);
        })
        .catch(err => console.log(err))
    }

    const getAllLapangan = () =>{
      ResourcesLapangan.getLapangan()
        .then(res => {
          console.log(res);
          setDataLapangan(res);
        })
        .catch(err => console.log(err))
    }

  // render
  return (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-primary"
          header={dataPengguna.length}
          text="Pengguna"
        >
          <CDropdown>
            <CDropdownToggle color="transparent">
              <CIcon name="cil-settings"/>
            </CDropdownToggle>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-info"
          header={dataReservasi.length}
          text="Reservasi"
        >
          <CDropdown>
            <CDropdownToggle caret={false} color="transparent">
              <CIcon name="cil-location-pin"/>
            </CDropdownToggle>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-warning"
          header={dataLapangan.length}
          text="Lapangan Futsal"
        >
          <CDropdown>
            <CDropdownToggle color="transparent">
              <CIcon name="cil-settings"/>
            </CDropdownToggle>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
