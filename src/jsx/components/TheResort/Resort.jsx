import React, { useState, useRef, useEffect } from 'react';
import TheRestoreModelAdd from './TheResortAddModel';
import Tables from '../Tables/Tables';
import { Link } from 'react-router-dom';
import { Bars } from 'react-loader-spinner';
import axios from 'axios';
import TheResortUpadteModel from './TheResortAddModel';

const Resort = () => {
    const [APIdata, setAPIdata] = useState([])

    const employe = useRef();
    const Update = useRef()
    const [updateRestore, setupdateRestore] = useState([])


    //============================Display all data=====================================
    function getAllData() {

        axios.get(`http://localhost:8082/Restore`).then(res => {
            setAPIdata(res.data)

        })
            .catch(err => console.log(err))

    }



    
    // ===================================================================================

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
    { label: 'Unique ID', key: 'UniqueID' },
    { label: 'Location', key: 'Location' },
    { label: 'Latitude', key: 'latitude' },
    { label: 'Longitude', key: 'longitude' },
    { label: 'Chalet', key: 'status' }, // Adding defaultValue
];
// we need to add from backend
    const customCellRenderer = {
        status: (row) => (
            <span >
                {row.status === "chalet" ||row.status === ""  ? (
                    <Link  className='  badge badge-secondary  ' to={`/Chalets`}>Chalets</Link>
                ) :  ''}
            </span>
        )
    };


    console.log( customCellRenderer)
    return (
        <>
            <Tables data={APIdata} headers={headersTitle} employe={employe}
             customCellRenderer={customCellRenderer} 
                Title=" + Add Restore " 
                update={ update} /> 

            <TheRestoreModelAdd
                ref={employe}
                Title="Add Resort"
                getAllData={getAllData}
            />

            <TheResortUpadteModel
                ref={Update}
                updateRestore={updateRestore}
                getAllData={getAllData}

            />

        </>
    );
};

export default Resort;