import React from 'react'
import DataDisplayOrganism from './DataDisplayOrganism'

const RankingTemplate = (props) => {
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold my-8 text-center">配当利回りランキング</h1>
            <DataDisplayOrganism
                stockDatas={props.stockDatas}
            />
        </div>
    )
}

export default RankingTemplate