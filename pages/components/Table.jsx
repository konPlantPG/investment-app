import { DataGrid } from '@mui/x-data-grid'

const Table = (props) => {
    return (
        <DataGrid
            columns={props.columns|| []}
            rows={props.rows || []}
            onRowClick={props.handleRowClick}
        />  
    )
}
export default Table