import React, {Component} from 'react'
import ReactEcharts from "echarts-for-react/lib/core";
import echarts from 'echarts'

export default class Graphics extends Component{

    option = {
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
            data: ["2012下半年","2013上半年","2013下半年","2014上半年","2014下半年","2015上半年","2015下半年","2016上半年","2016下半年"]
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
                data:["764","2403","10556","4806","4762","6512","1829","2560","8880"]
            },
            {
                name:'均价',
                type:'line',
                data: ["764","2403","5735","3505","3869","4591","1544","2560","8880"]
            },
            {
                name:'最低',
                type:'line',
                data: ["764","2403","914","2205","2763","2670","1260","2560","8880"]
            }
        ]
    };

    render(){
        return (<div>
            <ReactEcharts option={this.option} echarts={echarts}/>
        </div>)
    }
}