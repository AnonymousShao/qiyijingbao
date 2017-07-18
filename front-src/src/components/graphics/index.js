import React, {Component} from 'react'
import ReactEcharts from "echarts-for-react/lib/core";
import echarts from 'echarts'

export default class Graphics extends Component{

    state = {
        labels: [],
        maxPriceList: [],
        minPriceList: [],
        avrPriceList: []
    }

    componentWillReceiveProps(nextProps){
        this.updateData(nextProps)
    }

    componentDidMount(){
        this.updateData(this.props)
    }

    updateData(props){
        const list = props.ArtistExponent
        if(list){
            const labels = [],
                maxPriceList = [],
                minPriceList = [],
                avrPriceList = [];
            list.forEach(item=>{
                labels.push(item.ExponentTime)
                maxPriceList.push(item.MaxAmount)
                minPriceList.push(item.MinAmount)
                avrPriceList.push(item.AvgAmount)
            })
            this.setState({
                labels, maxPriceList, minPriceList, avrPriceList
            })
        }
    }

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
                data: this.state.labels
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
                    data: this.state.maxPriceList
                },
                {
                    name:'均价',
                    type:'line',
                    data: this.state.avrPriceList
                },
                {
                    name:'最低',
                    type:'line',
                    data: this.state.minPriceList
                }
            ]
        }

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