import React, { useState, useRef, useEffect } from 'react';
import Tables from '../Tables/Tables';
import { Link } from 'react-router-dom';
import { Bars } from 'react-loader-spinner';
import axios from 'axios';
import OtherServicesMoadel from './OtherServicesMoadel';

const OtherServices = () => {
    const [APIdata, setAPIdata] = useState([])

    const employe = useRef();
    const Update = useRef()
    const [updateRestore, setupdateRestore] = useState([])


    //============================Display all data=====================================
    function getAllData() {

        axios.get(`http://localhost:8082/OtherServices`).then(res => {
            setAPIdata(res.data)

        })
            .catch(err => console.log(err))

    }




    //showin items in tabel
    useEffect(() => {

        getAllData()
    }
        , [])



    // ====================update========================================================
    function update(id) {
        console.log('id', id)
        Update.current.showUpdateModal()
        APIdata.map((item) => {
            if (id === item.id) {
                return setupdateRestore(item)


            }
        })




    }
console.log(updateRestore)

const headersTitle = [
    { label: ' ID', key: 'id' },
    { label: 'Services', key: 'Services' },
    { label: 'Price', key: 'Price' },
    
];



    return (
        <>
            <Tables data={APIdata} headers={headersTitle} employe={employe}
                Title=" + Add Other Services " 

                 
                update={ update} /> 

            <OtherServicesMoadel
                ref={employe}
                Title="Add Other Services"
                getAllData={getAllData}
            />

            

        </>
    );
};

export default OtherServices;