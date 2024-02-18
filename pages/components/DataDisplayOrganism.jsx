import { useState } from 'react'

import Table from './Table'
import LineChart from './LineChart'


const DataDisplayOrganism = (props) => {

    const [selectedName, setSelectedName] = useState('')

    const columns = [
        { field: 'name', headerName: '名前', width: 300 },
        { field: 'price', headerName: '株価', width: 150 },
        { field: 'dividend', headerName: '分配金', width: 150 },
        { field: 'dividendYield', headerName: '分配利回り (%)', width: 150 },
    ]

    const handleRowClick = (params) => {
        setSelectedName(params.row.name)
    }


    const stockDatasGroupedByNames = props.stockDatas ? props.stockDatas.reduce((acc, stockData) => {
        const { name } = stockData
        if (!acc[name]) {
            acc[name] = []
        }
        acc[name].push(stockData)
        acc[name].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        return acc
    }, {}) : {}

    const latestStockDatas = Object.values(stockDatasGroupedByNames).map(stockDatasGroupedByName => {
        return stockDatasGroupedByName.reduce((latest, current) => {
            return new Date(latest.createdAt) > new Date(current.createdAt) ? latest : current
        })
    })

    const rows = latestStockDatas.map((latestStockData, index) => ({
        id: index,
        name: latestStockData.name,
        price: latestStockData.price,
        dividend: latestStockData.dividend,
        createdAt: latestStockData.createdAt,
        dividendYield: latestStockData.dividend && latestStockData.price ? ((latestStockData.dividend / latestStockData.price) * 100).toFixed(2) : "N/A"
    }))

    rows.sort((a, b) => {
        let yieldA = a.dividendYield === "N/A" ? -1 : parseFloat(a.dividendYield)
        let yieldB = b.dividendYield === "N/A" ? -1 : parseFloat(b.dividendYield)
        return yieldB - yieldA
    })

   
    const nameOptions = Object.keys(stockDatasGroupedByNames).map(name => (
        <option key={name} value={name}>{name}</option>
    ))


    const selectedStackDatas = selectedName ? [stockDatasGroupedByNames[selectedName]].map((data, index) => {
        const color = `hsl(${index * 60}, 70%, 70%)`
        return {
            label: selectedName,
            data: data.map(d => ({ x: d.createdAt, y: d.price })),
            borderColor: color,
            backgroundColor: color,
        }
    }) : []

    
    let yMin, yMax
    if (selectedName) {
        const selectedPrices = stockDatasGroupedByNames[selectedName].map(d => d.price)
        const minPrice = Math.min(...selectedPrices)
        const maxPrice = Math.max(...selectedPrices)
        yMin = Math.round(minPrice - (minPrice * 0.1))
        yMax = Math.round(maxPrice + (maxPrice * 0.1))
    } else {
        yMin = undefined 
        yMax = undefined
    }

    const data = {
        datasets: selectedName ? selectedStackDatas : []
    }

    const options = {
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
                min: yMin,
                max: yMax,
                title: {
                    display: true,
                    text: 'Price'
                }
            }
        }
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%', height: '100%' }}>
            <div style={{ width: '45%' }}>
                <Table
                    rows={rows || []}
                    columns={columns}
                    handleRowClick={handleRowClick}
                />
            </div>
            <div style={{ width: '45%' }}>
                <LineChart
                    data = {data}
                    options = {options}
                />
            </div>
        </div>
    )
}

export default DataDisplayOrganism