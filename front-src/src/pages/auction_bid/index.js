import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Header from '../../components/auction/bid_header'
import Footer from '../../components/footer'
import './style.scss'
import CardBoard from "../../components/card/index";
import { CellBody, CellHeader, Select, Input, FormCell } from '../../components/button'
import UpOrDown from "../../components/up_or_down/index";
import { getSimilar, getWorkClass } from '../../helper/http'

class Main extends Component{
    state = {
        type: '',
        dataList: [],
        theme: '',
        price: false,
        year: true,
        workClass: '-1',
        menuList: [],
        belongId: 1,
        secondMenuList: []
    }

    componentDidMount(){
        this.submit()
        getWorkClass().then(data=>{
            if(data){
                this.setState({
                    secondMenuList: data.WorkClass,
                    workClass: '-1'
                })
            }
        })
    }

    handleUpDownChange(type, value){
        this.setState({
            [type]: value,
            // dataList: this.state.dataList.sort((p, n)=>{return })
        })
    }

    handleSelectChange(e){
        this.setState({
            workClass: e.target.value
        })
    }

    handleInputChange(e){
        this.setState({
            theme: e.target.value
        })
    }

    submit(){
        let params = {
            theme: this.state.theme,
            // ref_artistno: this.state.ref_artistno,
            ref_workclassno: this.state.workClass!=='-1'?this.state.workClass:null
        }
        getSimilar(params).then(data=>{
            this.setState({dataList: data.ArtistExponent})
        })
    }

    handleChangeClass(item){
        this.setState({
            belongId:item.no
        })
    }

    render(){
        return (
            <div>
                <Header onChangeClass={this.handleChangeClass.bind(this)}/>
                <FormCell select selectPos="before" style={{backgroundColor: 'white'}}>
                    <CellHeader>
                        <Select onChange={this.handleSelectChange.bind(this)}>
                            <option value="-1">全部</option>
                            {this.state.secondMenuList.filter(second=>{return (second.BelongID===this.state.belongId)}).map(second=>(<option value={second.NO}>{second.Name}</option>))}
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
                            <UpOrDown title="估价" value={this.state.price} onChange={this.handleUpDownChange.bind(this, 'price')}/>
                            <UpOrDown title="年代" value={this.state.year} onChange={this.handleUpDownChange.bind(this, 'year')}/>
                        </div>
                        <span className="fr" style={{lineHeight: '2.1rem'}}>共 <span className="main-color">{this.state.dataList.length}</span>件参考作品</span>
                    </div>

                    <CardBoard type="" cardlist={this.state.dataList} />
                </div>
            </div>
        )
    }
}

const Root = () => {
    return (
        <div>
            <Main/>
            <Footer />
        </div>
    )
}

ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);
