import MUIDataTable from 'mui-datatables'
import React from 'react'

const Table = ({options,data,columns}) => {
  return (
    <div className='w-full h-full overflow-x-auto'>
        <MUIDataTable
            options={options}
            data={data}
            columns={columns}
        />
    </div>
  )
}

export default Table