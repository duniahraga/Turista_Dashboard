import React, { useState, useRef, useEffect } from 'react';
import Tables from '../Tables/Tables';
import { Link } from 'react-router-dom';
import { Bars } from 'react-loader-spinner';
import axios from 'axios';
import UserModelAdd from './UserModelAdd';


const Users = () => {
    const [APIdata, setAPIdata] = useState([])
    const employe = useRef();
    const Update = useRef()
    const [updateRestore, setupdateRestore] = useState([])

    //============================Display all data=====================================
    function getAllData() {

        axios.get(`http://localhost:8082/Uers`).then(res => {
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
    { label: 'firstName', key: 'firstName' },
    { label: 'lastName', key: 'lastName' },
    { label: 'email', key: 'email' },
    { label: 'phoneNumber', key: 'phoneNumber' },
    { label: 'role', key: 'role' },
];



    return (
        <>
            <Tables data={APIdata}
            headers={headersTitle}
             employe={employe}
            Title=" + Add User " 
            update={ update} /> 

            <UserModelAdd
                ref={employe}
                Title="Add User"
                getAllData={getAllData}
            />

            {/* <UpadteUsereModel
                ref={Update}
                updateRestore={updateRestore}
                getAllData={getAllData}

            /> */}

            
        </>
    );
};

export default Users;