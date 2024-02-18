import { DataGrid } from '@mui/x-data-grid'

const Table = (props) => {
    const groupedByNames = props.stockDatas.reduce((acc, stockData) => {
        if (!acc[stockData.name]) {
            acc[stockData.name] = []
        }
        acc[stockData.name].push(stockData)
        return acc
    }, {})

    const latestStockData = Object.values(groupedByNames).map(group => {
        return group.reduce((latest, current) => {
            return new Date(latest.createdAt) > new Date(current.createdAt) ? latest : current
        })
    })

    const rows = latestStockData.map((stockData, index) => ({
        id: index,
        name: stockData.name,
        price: stockData.price,
        dividend: stockData.dividend,
        createdAt: stockData.createdAt,
        dividendYield: stockData.dividend && stockData.price ? ((stockData.dividend / stockData.price) * 100).toFixed(2) : "N/A" // 分配利回りを計算
    }))

    const columns = [
        { field: 'name', headerName: '名前', width: 150 },
        { field: 'price', headerName: '株価', width: 150 },
        { field: 'dividend', headerName: '分配金', width: 150 },
        { field: 'createdAt', headerName: '日付', width: 150 },
        { field: 'dividendYield', headerName: '分配利回り (%)', width: 150 } // 新しい列を追加
    ]

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} />
        </div>
    )
}
export default Table