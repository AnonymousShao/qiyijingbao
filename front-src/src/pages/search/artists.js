import React, {Component} from 'react'
import {Type3} from "../../components/Image_text_items/index";
import Accordion from "../../components/accordion/index";

export default class Artists extends Component{

    render(){
        return (
            <div>
                {this.props.workClass.map(klass=>{
                    return (
                        klass.artists.length
                            ?<div style={{marginBottom: 10}}>
                                <Accordion  title={klass.name+"艺术家"}>
                                    <ul>{klass.artists.map(item=><Type3 {...item}/>)}</ul>
                                </Accordion>
                            </div>
                        :null
                    )
                })}
            </div>
        )
    }
}