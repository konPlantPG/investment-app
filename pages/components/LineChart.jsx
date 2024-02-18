
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'
import 'chartjs-adapter-date-fns'

const LineChart = (props) => {

    return (
        <>
            <select value={props.selectedName} onChange={(e) => props.setSelectedName(e.target.value)}>
                <option value="">Select a name</option>
                {props.nameOptions}
            </select>
            <Line data={props.data} options={props.options} />
        </>
    )
}

export default LineChart