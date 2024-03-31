import { useState, useEffect } from 'react'

import Table from '../molecules/Table'
import LineChart from '../molecules/LineChart'


const DataDisplayOrganism = (props) => {

    const [selectedName, setSelectedName] = useState('')
    const [stockDatasGroupedByNames, setStockDatasGroupedByNames] = useState({})
    const [latestStockDatas, setLatestStockDatas] = useState([])
    const [selectedStackDatas, setSelectedStackDatas] = useState([])
    const [yMin, setYMin] = useState(undefined)
    const [yMax, setYMax] = useState(undefined)
    const [data, setData] = useState({ datasets: [] })
    const [rows, setRows] = useState([])
    const [options, setOptions] = useState({
        scales: {
            x: {
                type: 'time',
                time: {
                    parser: 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'',
                    unit: 'day',
                    displayFormats: {
                        day: 'MM-dd'
                    }
                },
                title: {
                    display: true,
                    text: 'Date'
                }
            },
            y: {
                beginAtZero: false,
                min: undefined,
                max: undefined, 
                title: {
                    display: true,
                    text: 'Price'
                }
            }
        }
    })


    const columns = [
        { field: 'name', headerName: '名前', width: 300 },
        { field: 'price', headerName: '株価', width: 150 },
        { field: 'dividend', headerName: '分配金', width: 150 },
        { field: 'dividendYield', headerName: '分配利回り (%)', width: 150 },
    ]

    const handleRowClick = (params) => {
        setSelectedName(params.row.name)
    }

    
    useEffect(() => {
        const groupedData = props.stockDatas ? props.stockDatas.reduce((acc, stockData) => {
            const { name } = stockData
            if (!acc[name]) {
                acc[name] = []
            }
            acc[name].push(stockData)
            acc[name].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            return acc
        }, {}) : {}
        setStockDatasGroupedByNames(groupedData)

        const latestDatas = Object.values(groupedData).map(stockDatasGroupedByName => {
            return stockDatasGroupedByName.reduce((latest, current) => {
                return new Date(latest.createdAt) > new Date(current.createdAt) ? latest : current
            })
        })
        setLatestStockDatas(latestDatas)
    }, [props.stockDatas])

    useEffect(() => {
        if (selectedName && stockDatasGroupedByNames[selectedName]) {
            const selectedDatas = stockDatasGroupedByNames[selectedName]
           
            const color = 'hsl(240, 70%, 70%)' 
            const stackData = {
                label: selectedName,
                data: selectedDatas.map(selectedData => ({ x: selectedData.createdAt, y: selectedData.price })),
                borderColor: color,
                backgroundColor: color,
            }
        
            setSelectedStackDatas(stackData)
                            
            const prices = selectedDatas.map(d => d.price)
            const minPrice = Math.min(...prices)
            const maxPrice = Math.max(...prices)
            setYMin(Math.round(minPrice - (minPrice * 0.1)))
            setYMax(Math.round(maxPrice + (maxPrice * 0.1)))
        } else {
            setSelectedStackDatas([])
            setYMin(undefined)
            setYMax(undefined)
        }
    }, [selectedName, stockDatasGroupedByNames])

    useEffect(() => {
        setData({
            datasets: selectedName ? [selectedStackDatas] : []
        })
    }, [selectedName, selectedStackDatas])

    useEffect(() => {
        const newRows = latestStockDatas.map((latestStockData, index) => ({
            id: index,
            name: latestStockData.name,
            price: latestStockData.price,
            dividend: latestStockData.dividend,
            createdAt: latestStockData.createdAt,
            dividendYield: latestStockData.dividend && latestStockData.price ? ((latestStockData.dividend / latestStockData.price) * 100).toFixed(2) : "N/A"
        }))
    
        newRows.sort((a, b) => {
            let yieldA = a.dividendYield === "N/A" ? -1 : parseFloat(a.dividendYield)
            let yieldB = b.dividendYield === "N/A" ? -1 : parseFloat(b.dividendYield)
            return yieldB - yieldA
        })
    
        setRows(newRows)
    }, [latestStockDatas])

    useEffect(() => {
        setOptions(prevOptions => ({
            ...prevOptions,
            scales: {
                ...prevOptions.scales,
                y: {
                    ...prevOptions.scales.y,
                    min: yMin,
                    max: yMax
                }
            }
        }))
    }, [yMin, yMax])
    
    return (
        <div class="flex ... px-4">  
                <Table
                    rows={rows || []}
                    columns={columns}
                    handleRowClick={handleRowClick}
                />
        </div>
    )
}

export default DataDisplayOrganism