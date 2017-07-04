import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Header from '../../../components/auction/bid_header'
import Footer from '../../../components/footer'
import { Select, FormCell, CellHeader, CellBody, Input} from '../../../components/button'
import UpOrDown from "../../../components/up_or_down/index";
import CardBoard from "../../../components/card/index";
import { getParameterByName } from '../../../helper/query_string'

require('./style.scss')


class Main extends Component{

    state = {
        dataList: [{},{},{},{},{},{},{}],
        secondMenuList: [],
        belongId: parseInt(getParameterByName('type')),
    }

    constructor(props){
        super(props)
    }

    handleChangeClass(){

    }

    handleSelectChange(){
        debugger
    }

    handleInputChange(){
        debugger
    }

    submit(){
        debugger
    }

    handleUpDownChange(){

    }

    render(){
        return (
            <div>
                <Header belongId={this.state.belongId - 1} onChangeClass={this.handleChangeClass.bind(this)}/>
                <FormCell select selectPos="before" style={{backgroundColor: 'white'}}>
                    <CellHeader>
                        <Select onChange={this.handleSelectChange.bind(this)}>
                            <option value="-1">全部</option>
                            {this.state.secondMenuList.filter(second=>{
                                return (second.BelongID===this.state.belongId)
                            }).map(second=>(<option value={second.NO}>{second.Name}</option>))}
                        </Select>
                    </CellHeader>
                    <CellBody>
                        <Input type="search" onChange={this.handleInputChange.bind(this)} placeholder="请输入题材关键字"/>
                        <span className="search-icon" onClick={this.submit.bind(this)}>搜索</span>
                    </CellBody>
                </FormCell>

                <div style={{margin: '15px 15px 0'}}>
                    <div className="bid-select-title">
                        <div>
                            <span>排序</span>
                            <UpOrDown title="热度" value={this.state.price} onChange={this.handleUpDownChange.bind(this, 'price')}/>
                            <UpOrDown title="起议价" value={this.state.year} onChange={this.handleUpDownChange.bind(this, 'year')}/>
                            <UpOrDown title="剩余时间" value={this.state.year} onChange={this.handleUpDownChange.bind(this, 'year')}/>
                            <span className="" style={{lineHeight: '2.1rem'}}>共 <span className="main-color">{this.state.dataList.length}</span>件作品</span>
                        </div>
                    </div>
                    <div style={{marginTop: 10}}>
                        <CardBoard type="2" cardlist={this.state.dataList} />
                    </div>
                </div>
            </div>
        )
    }
}

const Root = () => (
    <div>
        <Main />
        <Footer active="bargain"/>
    </div>
);

ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);
