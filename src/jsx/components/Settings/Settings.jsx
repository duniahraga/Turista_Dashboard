import React, { useState, useRef, useEffect } from 'react';
import Tables from '../Tables/Tables';
import { Link } from 'react-router-dom';
import { Bars } from 'react-loader-spinner';
import axios from 'axios';
import SettingAddModel from './SettingAddModel';

const Settings = () => {
    const [APIdata, setAPIdata] = useState([])

    const employe = useRef();
    const Update = useRef()
    const [updateRestore, setupdateRestore] = useState([])


    //============================Display all data=====================================
    function getAllData() {

        axios.get(`http://localhost:8082/Setting`).then(res => {
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
    { label: 'Title', key: 'Title' },
    { label: 'Auther', key: 'Auther' },
    
];



    return (
        <>
            <Tables data={APIdata} headers={headersTitle} employe={employe}
                Title="+ Add Setting " 
                update={ update} /> 

            <SettingAddModel
                ref={employe}
                Title="Add Setting"
                getAllData={getAllData}
                APIdata={APIdata}
            />

            

        </>
    );
};

export default Settings;