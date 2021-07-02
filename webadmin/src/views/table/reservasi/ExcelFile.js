import React from "react";
import ReactExport from "react-data-export";
import {CButton} from '@coreui/react'

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default class ReservasiExcel extends React.Component {
    render() {
        return (
            <ExcelFile filename="Data Reservasi" element={                
            <CButton
                key='primary'
                color='primary'
                size=''
                className="m-2"
            >
              Export to excel
            </CButton>}>
                <ExcelSheet data={this.props.data} name="Reservasi">
                    <ExcelColumn label="Id Reservasi" value="id_reservasi"/>
                    <ExcelColumn label="Id Pengguna" value="id_pengguna"/>
                    <ExcelColumn label="Id Lapangan" value="id_lapangan"/>
                    <ExcelColumn label="Tanggal Main" value="tanggal_main"/>
                    <ExcelColumn label="Tanggal Dibuat" value="tanggal_dibuat"/>
                    <ExcelColumn label="Total Pembayaran" value="total_pembayaran"/>
                    <ExcelColumn label="Status Pembayaran" value="status_pembayaran"/>
                </ExcelSheet>
                <ExcelSheet data={this.props.dataResJamMain} name="Reservasi Jam Main">
                    <ExcelColumn label="Id Reservasi" value="id_reservasi"/>
                    <ExcelColumn label="Jam" value="jam_main"/>
                </ExcelSheet>
            </ExcelFile>
        );
    }
}