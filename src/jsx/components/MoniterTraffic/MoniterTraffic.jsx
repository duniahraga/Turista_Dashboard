import React, { useState, useRef, useEffect } from 'react';
import { IMAGES } from '../../constant/theme';
import Tables from '../Tables/Tables';
import { Link } from 'react-router-dom';


const tableData = [
    { id: '1001', image: IMAGES.contact1, Location: '+12 123 456 7890', ResortName: 'Ricky Antony', UniqueID: 'ra@gmail.com', Latitude: 'Female', Longitude: 'India',TypeID: 'Withdraw'  },
    { id: '1002', image: IMAGES.contact2, Location: '+12 123 456 7890', ResortName: 'Ankites Risher', UniqueID: 'abc@gmail.com', Latitude: 'Male', Longitude: 'Brazil',TypeID: 'Deposit'  },
    { id: '1003', image: IMAGES.contact3, Location: '+12 123 456 7890', ResortName: 'Ricky M', UniqueID: 'pqr@gmail.com', Latitude: 'Male', Longitude: 'France',TypeID: 'Withdraw'  },
    { id: '1004', image: IMAGES.contact1, Location: '+12 123 456 7890', ResortName: 'Elijah James', UniqueID: 'stuy@gmail.com', Latitude: 'Female', Longitude: 'Dubai', TypeID: 'Deposit' },
    { id: '1005', image: IMAGES.contact2, Location: '+12 123 456 7890', ResortName: 'Honey Risher', UniqueID: 'xyz@gmail.com', Latitude: 'Male', Longitude: 'USA',TypeID: 'Withdraw'  },
    { id: '1006', image: IMAGES.contact2, Location: '+12 123 456 7890', ResortName: 'Honey Risher', UniqueID: 'xyz@gmail.com', Latitude: 'Male', Longitude: 'USA',TypeID: 'Deposit'  },
    { id: '1007', image: IMAGES.contact2, Location: '+12 123 456 7890', ResortName: 'Ankites Risher', UniqueID: 'abc@gmail.com', Latitude: 'Male', Longitude: 'Brazil',TypeID: 'Withdraw'  },
    { id: '1008', image: IMAGES.contact3, Location: '+12 123 456 7890', ResortName: 'Ricky M', UniqueID: 'pqr@gmail.com', Latitude: 'Male', Longitude: 'France',TypeID: 'Deposit'  },
    { id: '1009', image: IMAGES.contact1, Location: '+12 123 456 7890', ResortName: 'Ricky Antony', UniqueID: 'ra@gmail.com', Latitude: 'Female', Longitude: 'India',TypeID: 'Withdraw'  },
    { id: '1010', image: IMAGES.contact1, Location: '+12 123 456 7890', ResortName: 'Elijah James', UniqueID: 'stuy@gmail.com', Latitude: 'Female', Longitude: 'Dubai',TypeID: 'Deposit'  },
    { id: '1011', image: IMAGES.contact2, Location: '+12 123 456 7890', ResortName: 'Ankites Risher', UniqueID: 'abc@gmail.com', Latitude: 'Male', Longitude: 'Brazil',TypeID: 'Withdraw'  },
    { id: '1012', image: IMAGES.contact1, Location: '+12 123 456 7890', ResortName: 'Ricky Antony', UniqueID: 'ra@gmail.com', Latitude: 'Female', Longitude: 'India',TypeID: 'Deposit'  },
    { id: '1013', image: IMAGES.contact1, Location: '+12 123 456 7890', ResortName: 'Elijah James', UniqueID: 'stuy@gmail.com', Latitude: 'Female', Longitude: 'Dubai',TypeID: 'Withdraw'  },
    { id: '1015', image: IMAGES.contact2, Location: '+12 123 456 7890', ResortName: 'Honey Risher', UniqueID: 'xyz@gmail.com', Latitude: 'Male', Longitude: 'USA', TypeID: 'Deposit' },
    { id: '1016', image: IMAGES.contact3, Location: '+12 123 456 7890', ResortName: 'Ricky M', UniqueID: 'pqr@gmail.com', Latitude: 'Male', Longitude: 'France', TypeID: 'Withdraw' },
    { id: '1017', image: IMAGES.contact1, Location: '+12 123 456 7890', ResortName: 'Ricky Antony', UniqueID: 'ra@gmail.com', Latitude: 'Female', Longitude: 'India',TypeID: 'Deposit'  },
    { id: '1018', image: IMAGES.contact1, Location: '+12 123 456 7890', ResortName: 'Elijah James', UniqueID: 'stuy@gmail.com', Latitude: 'Female', Longitude: 'Dubai',TypeID: 'Withdraw'  },
];

const headersTitle = [
    { label: ' ID', key: 'id' },
    { label: 'Booking ID', key: 'BookingID' },
    { label: 'Type ID', key: 'TypeID' },
    { label: 'the financial value', key: 'financialvalue' },
    { label: 'Created On', key: 'CreatedOn' },
    { label: 'User Name', key: 'UserName' },
    { label: 'Phone Number', key: 'PhoneNumber' },
    { label: 'Property Owner Account', key: 'PropertyOwnerAccount' },
    { label: 'Payment', key: 'Payment' },
    {label: 'note', key: 'note'},
]

const customCellRenderer = {
    TypeID: (row) => (
        <span >
            
            {row.TypeID === 'Withdraw' ? (
                <Link  className=' badge badge-danger ' to={`/Chalets/${row.id}`}>{row.TypeID}</Link>
            ) :  (
                <Link className='badge badge-success ps-4 pe-3' to={`/inactive/${row.id}`}>{row.TypeID}</Link>
            )}
        </span>
    )
};


export default function MoniterTraffic() {

    const invite = useRef();

    return (
        <>
            <Tables data={tableData} headers={headersTitle}  customCellRenderer={ customCellRenderer} />

           

        </>
    );
};

