import { DataGrid } from '@mui/x-data-grid'

const Table = (props) => {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                columns={props.columns}
                rows={props.rows}
                onRowClick={props.handleRowClick}
            />
        </div>
    )
}
export default Table