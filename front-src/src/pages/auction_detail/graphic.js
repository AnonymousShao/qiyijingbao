import React, {Component} from 'react'
import ReactEcharts from "echarts-for-react/lib/core";
import echarts from 'echarts'

export default class Graphics extends Component{

    render(){
        const option = {
            title: {
                text: '艺术家指数',
                subtext: '价格走势'
            },
            tooltip: {
                trigger: 'axis'
            },
            grid: { // 控制图的大小
                left:'20%'
            },
            textStyle: {
                color: '#000000',
                fontStyle: 'normal',
                fontFamily: 'sans-serif',
                fontSize: 12,
            },
            legend: {
                right: 0,
                data:['最高', '均价', '最低']
            },
            color: ['#ff495b','#1fb9ff', '#61a339'],
            toolbox: {
                show: false,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: {readOnly: false},
                    magicType: {type: ['line', 'bar']}
                }
            },
            xAxis:  {
                type: 'category',
                name:'',
                boundaryGap: false,
                data: this.props.dataSet.labels
            },
            yAxis: {
                type: 'value',
                //                axisLabel: {
                //                    formatter: '{value} 万元'
                //                }
            },
            label:{
                normal: {
                    show: true
                }
            },
            series: [
                {
                    name:'最高',
                    type:'line',
                    data: this.props.dataSet.maxPriceList
                },
                {
                    name:'均价',
                    type:'line',
                    data: this.props.dataSet.avrPriceList
                },
                {
                    name:'最低',
                    type:'line',
                    data: this.props.dataSet.minPriceList
                }
            ]
        };
        return (
            <div>
                <ReactEcharts
                    option={option}
                    lazyUpdate={true}
                    echarts={echarts}/>
            </div>
        )
    }
}