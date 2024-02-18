import { useState } from 'react'

import Table from './Table'
import LineChart from './LineChart'


const DataDisplayOrganism = (props) => {

    const [selectedName, setSelectedName] = useState('')

    const groupedByNames = props.stockDatas.reduce((acc, stockData) => {
        const { name, createdAt, price } = stockData
        if (!acc[name]) {
            acc[name] = []
        }
        acc[name].push({ createdAt, price })
        acc[name].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        return acc
    }, {})

    const nameOptions = Object.keys(groupedByNames).map(name => (
        <option key={name} value={name}>{name}</option>
    ))


    const filteredDatasets = selectedName ? [groupedByNames[selectedName]].map((data, index) => {
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
        const selectedPrices = groupedByNames[selectedName].map(d => d.price)
        const minPrice = Math.min(...selectedPrices)
        const maxPrice = Math.max(...selectedPrices)
        yMin = minPrice - (minPrice * 0.01) // 最小値の10%マイナス
        yMax = maxPrice + (maxPrice * 0.01) // 最大値の10%プラス
    } else {
        yMin = undefined // 選択されていない場合は、自動的に決定させる
        yMax = undefined
    }

    const data = {
        datasets: selectedName ? filteredDatasets : []
    }

    const options = {
        scales: {
            x: {
                type: 'time',
                time: {
                    parser: 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'',
                    unit: 'day',
                    displayFormats: {
                        day: 'yyyy-MM-dd'
                    }
                },
                title: {
                    display: true,
                    text: 'Date'
                }
            },
            y: {
                beginAtZero: false,
                min: yMin, // 計算した最小値
                max: yMax, // 計算した最大値
                title: {
                    display: true,
                    text: 'Price'
                }
            }
        }
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%', height: '100%' }}>
            <div style={{ width: '50%' }}>
                <Table
                    stockDatas={props.stockDatas}
                />
            </div>
            <div style={{ width: '50%' }}>
                <LineChart
                    selectedName = {selectedName}
                    setSelectedName = {setSelectedName}
                    nameOptions = {nameOptions}
                    data = {data}
                    options = {options}
                />
            </div>
        </div>
    )
}

export default DataDisplayOrganism