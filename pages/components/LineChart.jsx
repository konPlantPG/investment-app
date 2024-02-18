
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'
import 'chartjs-adapter-date-fns'

const LineChart = (props) => {

    return (
        <>
            <Line 
                data={props.data} 
                options={props.options} 
            />
        </>
    )
}

export default LineChart