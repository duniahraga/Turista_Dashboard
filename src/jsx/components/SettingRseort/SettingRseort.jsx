import React, { useState, useRef, useEffect } from 'react';
import Tables from '../Tables/Tables';

import axios from 'axios';
import SettingResortModelAdd from './SettingResortModelAdd';

export default function SettingRseort() {
    const [APIdata, setAPIdata] = useState([])
    const employe = useRef();
    const Update = useRef()
    const [updateRestore, setupdateRestore] = useState([])


    //============================Display all data========================================
    function getAllData() {

        axios.get(`http://localhost:8082/ResortSettong`).then(res => {
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
    
    const headersTitle = [
    { label: ' ID', key: 'id' },
    { label: 'facilaty', key: 'facility' },
    { label: 'amenty', key: 'amenity' },
    
];
// we need to add from backend
    


  return (
      <>
      
      
          

      <Tables data={APIdata} headers={headersTitle} employe={employe}
              
                Title=" + Add Setting " 
                 /> 



          <SettingResortModelAdd
          ref={employe}
          Title="Add Resort"
          getAllData={getAllData}
          
          />

      
      
      </>)
}
