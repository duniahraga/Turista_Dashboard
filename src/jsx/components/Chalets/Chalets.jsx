import React, { useState, useRef, useEffect } from 'react';
import Tables from '../Tables/Tables';
import ChaletsMmodelAdd from './ChaletsMmodelAdd';
import axios from 'axios';






export default function Chalets() {
    const [APIdata, setAPIdata] = useState([])
    const employe = useRef();

//============================Display all data=====================================
  function getAllData() {

    axios.get(`http://localhost:8082/Chalets`).then(res => {
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
        { label: 'Title', key: 'Title' },
        { label: 'Publish', key: 'Publish' },

        
    ]
    
    
    
    return <>
        
        {/* cards */}
        
       

        <Tables data={APIdata} headers={headersTitle} employe={employe} Title=" + Add Chalets "  />
           
            
          <ChaletsMmodelAdd
            ref={employe}
            Title="Add Chalets"
            getAllData={getAllData}
            />


    
    </>
}

