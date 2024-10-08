import React,{ useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import { IMAGES } from '../../../constant/theme';


export const COLUMNS = [	
	{
		Header : 'Project Name',		
		accessor: 'name'
	},
	{
		Header : 'Project Lead',		
		accessor: 'name2'
	},
	{
		Header : 'Progress',		
		accessor: 'progresStyle'
	},
	{
		Header : 'Assignee',		
		accessor: 'assigne',
	},
	{
		Header : 'Status',		
		accessor: 'status'
	},
	{
		Header : 'Due Date',		
		accessor: 'duedate',
	},
]

const tableData = [
    {id:'2', name: "Mivy App", name2 :'Honey Risher', profile: IMAGES.contact2, progresStyle: "primary", progresValue: "50%", assigne: '3', status: 'Inprogress',  duedate: '08 June 2023'},
    {id:'3', name: "Crypto App", name2 :'Ankites Risher', profile: IMAGES.contact1, progresStyle: "danger", progresValue: "45%", assigne: '2', status: 'Pending',  duedate: '14 Sep 2023'},
    {id:'4', name: "Bender Project", name2 :'Oliver Noah', profile: IMAGES.contact8, progresStyle: "danger", progresValue: "30%", assigne: '3', status: 'Pending',  duedate: '22 Oct 2023'},
    {id:'5', name: "Canary", name2 :'Elijah James', profile: IMAGES.contact2, progresStyle: "success", progresValue: "40%", assigne: '4', status: 'Completed',  duedate: '16 Nov 2023'},
];

export const SortingTable = () => {	
	const columns = useMemo( () => COLUMNS, [] )
	const data = useMemo( () => tableData, [] )	
	const tableInstance = useTable({columns,data},
		useSortBy
	)
	
	const { 
		getTableProps, 
		getTableBodyProps, 
		headerGroups,
		//footerGroups,
		rows, 
		prepareRow,
	} = tableInstance
	
	return(
		<>		
            <div className="card">							
                <div className="card-body p-0">
                    <div className="table-responsive active-projects style-1">
                        <div className="tbl-caption">
                            <h4 className="heading mb-0">Active Projects</h4>                                       
                        </div>
                        <div id="projects-tbl_wrapper" className="dataTables_wrapper no-footer mb-0">
                            <table 
                                {...getTableProps()} 
                                id="projects-tbl" className="table dataTable no-footer mb-2 mb-sm-0"
                            >
                                <thead>
                                    { headerGroups.map(headerGroup => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map(column => (
                                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                    {column.render('Header')}
                                                    <span className="ml-1">
                                                        {column.isSorted ? (
                                                            column.isSortedDesc ?  
                                                                <i className="fa fa-arrow-down ms-2 fs-14"  style={{opacity: '0.7'}} />
                                                                    :  
                                                                <i className="fa fa-arrow-up ms-2 fs-14" style={{opacity: '0.7'}} /> 
                                                            ) 
                                                                : 
                                                            (<i className="fa fa-sort ms-2 fs-14"  style={{opacity: '0.3'}} />) 
                                                        }
                                                    </span>
                                                </th>
                                            ))}
                                        </tr>
                                    ))}                                       
                                </thead> 
                                <tbody {...getTableBodyProps()}>
                                
                                    {rows.map((row) => {
                                        prepareRow(row)
                                        return(
                                            <tr {...row.getRowProps()}>
                                                {row.cells.map((cell) => {
                                                    return <td {...cell.getCellProps()}> {cell.render('Cell')} </td>
                                                })}
                                                
                                            </tr>
                                        )
                                    })}
                                </tbody>
                                
                            </table>
                        </div>
                    </div>
                </div>
            </div>
						
		</>
	)
	
}
export default SortingTable;