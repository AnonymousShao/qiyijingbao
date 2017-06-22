import React, {Component} from 'react'
import ReactIScroll from 'react-iscroll'
import iScroll from 'iscroll'

export default class Scroll extends Component{

    constructor(props){
        super(props)
        this.state = {
            iScrollOptions: {
                // mouseWheel: true,
                scrollbars: true,
                scrollX: true,
                snap: true,
                bounce: false,
                momentum: false,
            }
        }
    }

    onScrollStart(){
        console.log(1)
    }

    onScroll(){
        console.log(2)
    }

    render(){
        const { iScrollOptions } = this.state
        return (
            <div>
                <ReactIScroll
                    iScroll={iScroll}
                    options={iScrollOptions}
                    onScrollStart={this.onScrollStart}
                    onScroll={this.onScroll}
                >
                    {[1,2,3,4,5].map(i=>(
                        <div style={{float: 'left', width: 300}} key={i}>{i}2345</div>
                    ))}
                </ReactIScroll>
            </div>
        )
    }
}