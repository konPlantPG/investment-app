import React from 'react'
import DataDisplayOrganism from './DataDisplayOrganism'

const RankingTemplate = (props) => {
    return (
        <DataDisplayOrganism
            stockDatas = {props.stockDatas}
            />
    )
}

export default RankingTemplate