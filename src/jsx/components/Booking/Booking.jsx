import React, { useState, useRef, useEffect } from 'react';
import { IMAGES } from '../../constant/theme';
import Tables from '../Tables/Tables';
import { Link } from 'react-router-dom';
import BookingAddModal from './BookingAddModal';
import axios from 'axios';



const tableData = [
    { id: '1001', image: IMAGES.contact1, Location: '+12 123 456 7890', ResortName: 'Ricky Antony', UniqueID: 'ra@gmail.com', Latitude: 'Female', Longitude: 'India',status: 'confirmed'  },
    { id: '1002', image: IMAGES.contact2, Location: '+12 123 456 7890', ResortName: 'Ankites Risher', UniqueID: 'abc@gmail.com', Latitude: 'Male', Longitude: 'Brazil',status: 'cancelled'  },
    { id: '1003', image: IMAGES.contact3, Location: '+12 123 456 7890', ResortName: 'Ricky M', UniqueID: 'pqr@gmail.com', Latitude: 'Male', Longitude: 'France',status: 'cancelled'  },
    { id: '1004', image: IMAGES.contact1, Location: '+12 123 456 7890', ResortName: 'Elijah James', UniqueID: 'stuy@gmail.com', Latitude: 'Female', Longitude: 'Dubai', status: 'confirmed' },
    { id: '1005', image: IMAGES.contact2, Location: '+12 123 456 7890', ResortName: 'Honey Risher', UniqueID: 'xyz@gmail.com', Latitude: 'Male', Longitude: 'USA',status: 'cancelled'  },
    { id: '1006', image: IMAGES.contact2, Location: '+12 123 456 7890', ResortName: 'Honey Risher', UniqueID: 'xyz@gmail.com', Latitude: 'Male', Longitude: 'USA',status: 'confirmed'  },
    { id: '1007', image: IMAGES.contact2, Location: '+12 123 456 7890', ResortName: 'Ankites Risher', UniqueID: 'abc@gmail.com', Latitude: 'Male', Longitude: 'Brazil',status: 'cancelled'  },
    { id: '1008', image: IMAGES.contact3, Location: '+12 123 456 7890', ResortName: 'Ricky M', UniqueID: 'pqr@gmail.com', Latitude: 'Male', Longitude: 'France',status: 'confirmed'  },
    { id: '1009', image: IMAGES.contact1, Location: '+12 123 456 7890', ResortName: 'Ricky Antony', UniqueID: 'ra@gmail.com', Latitude: 'Female', Longitude: 'India',status: 'cancelled'  },
    { id: '1010', image: IMAGES.contact1, Location: '+12 123 456 7890', ResortName: 'Elijah James', UniqueID: 'stuy@gmail.com', Latitude: 'Female', Longitude: 'Dubai',status: 'confirmed'  },
    { id: '1011', image: IMAGES.contact2, Location: '+12 123 456 7890', ResortName: 'Ankites Risher', UniqueID: 'abc@gmail.com', Latitude: 'Male', Longitude: 'Brazil',status: 'cancelled'  },
    { id: '1012', image: IMAGES.contact1, Location: '+12 123 456 7890', ResortName: 'Ricky Antony', UniqueID: 'ra@gmail.com', Latitude: 'Female', Longitude: 'India',status: 'confirmed'  },
    { id: '1013', image: IMAGES.contact1, Location: '+12 123 456 7890', ResortName: 'Elijah James', UniqueID: 'stuy@gmail.com', Latitude: 'Female', Longitude: 'Dubai',status: 'Chalet'  },
    { id: '1015', image: IMAGES.contact2, Location: '+12 123 456 7890', ResortName: 'Honey Risher', UniqueID: 'xyz@gmail.com', Latitude: 'Male', Longitude: 'USA', status: 'Chalet' },
    { id: '1016', image: IMAGES.contact3, Location: '+12 123 456 7890', ResortName: 'Ricky M', UniqueID: 'pqr@gmail.com', Latitude: 'Male', Longitude: 'France', status: 'Chalet' },
    { id: '1017', image: IMAGES.contact1, Location: '+12 123 456 7890', ResortName: 'Ricky Antony', UniqueID: 'ra@gmail.com', Latitude: 'Female', Longitude: 'India',status: 'Chalet'  },
    { id: '1018', image: IMAGES.contact1, Location: '+12 123 456 7890', ResortName: 'Elijah James', UniqueID: 'stuy@gmail.com', Latitude: 'Female', Longitude: 'Dubai',status: 'Chalet'  },
];

const headersTitle = [
    { label: ' ID', key: 'id' },
    { label: 'Chalet Number', key: 'ResortName' },
    { label: 'Date of entry', key: 'UniqueID' },
    { label: 'Exit date', key: 'Location' },
    { label: 'UserName', key: 'Latitude' },
    { label: 'Phone Numebr', key: 'Longitude' },
    { label: 'Total', key: '' },
    { label: 'deposit', key: '' },
    { label: 'Booking Statues', key: '' },
    { label: 'payment method', key: 'status' },


]

const customCellRenderer = {
    status: (row) => (
        <span >
            
            {row.status === 'cancelled' ? (
                <Link  className=' badge badge-danger ' to={`/Chalets/${row.id}`}>{row.status}</Link>
            ) :  (
                <Link className='badge badge-success ' to={`/inactive/${row.id}`}>{row.status}</Link>
            )}
        </span>
    )
};

export default function Booking() {


    const [APIdata, setAPIdata] = useState([])
    const employe = useRef();
    const Update = useRef();
    const invite = useRef();

    const [updateRestore, setupdateRestore] = useState([])


     //============================Display all data=====================================
     function getAllData() {

        axios.get(`http://localhost:8082/Booking`).then(res => {
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



    // ====================update===============================
    function update(id) {
        console.log('id', id)
        Update.current.showUpdateModal()
        APIdata.map((item) => {
            if (id === item.id) {
                return setupdateRestore(item)


            }
        })




    }

    // ===================================================================================

    //showin items in tabel
    // useEffect(() => {

    //     getAllData()
    // }
    //     , [])

    //====================================================InvoicesModel========================
    function InvoicesModel(id) {
        invite.current.showInviteModal()
         APIdata.map((item) => {
          if (id === item.id) {
        //    setviweModelData(item) 
           }
         })
    }
    




  return <>
      <Tables data={tableData} headers={headersTitle} employe={employe}
          customCellRenderer={customCellRenderer} 
          Title=" + Add Booking "
       />

<BookingAddModal
          ref={employe}
          Title="Add Booking"
          getAllData={getAllData}
          ApiDAte={APIdata }
            />

</>
}
