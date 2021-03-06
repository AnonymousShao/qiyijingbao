import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Header from '../../../components/auction/bid_header/index'
import Footer from '../../../components/footer/index'
import './style.scss'
import CardBoard from "../../../components/card/index";
import { CellBody, CellHeader, Select, Input, FormCell } from '../../../components/button'
import UpOrDown from "../../../components/up_or_down/index";
import { getSimilar } from '../../../helper/http'
import { getWorkClass, getWorkList } from '../../../helper/http/similar'

class Main extends Component{
    state = {
        type: '',
        dataList: [],
        theme: '',
        price: undefined,
        year: undefined,
        workClass: '',
        menuList: [],
        belongId: 1,
        secondMenuList: [],
        WorkSimilarList: []
    }

    componentDidMount(){
        this.submit()
        this.queryWorkClass()
    }

    queryWorkClass(){
        let params = {
            belongClassNo: this.state.belongId
        }
        getWorkClass(params).then(data=>{
            if(data){
                this.setState({
                    secondMenuList: data.WorkClassInfo,
                    workClass: ''
                })
            }
        })
    }

    handleUpDownChange(type, value){
        let result = this.state.dataList.slice()
        if(type==='price'){
            result = this.state.dataList.sort((p, i)=>{
                return (value?1:'') * (p.sortPrice - i.sortPrice)
            })
            this.setState({
                year: undefined
            })
        }
        if(type==='year'){
            result = this.state.dataList.sort((p, i)=>{
                return (value?1:'') * (p.sortYear - i.sortYear)
            })
            this.setState({
                price: undefined
            })
        }
        this.setState({
            [type]: value,
            dataList: result
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
            belongClassNo: this.state.belongId,
            workclassno: this.state.workClass
        }
        getWorkList(params).then(data=>{
            let list = data.WorkSimilarList
            list.forEach(item=>{
                item.sortYear = 0.5 * parseInt(item.ArtistBirthYear) + 0.5 * parseInt(item.ArtistDeathYear || new Date().getFullYear())
                item.sortPrice = 0.5 * (item.MinEvaluationPrice + item.MaxEvaluationPrice)
            })
            this.setState({
                dataList: data.WorkSimilarList,
            })
        })
    }

    handleChangeClass(item){
        this.setState({
            belongId:item.no
        }, e=>this.queryWorkClass())
    }

    render(){
        return (
            <div>
                <Header belongId={this.state.belongId - 1} onChangeClass={this.handleChangeClass.bind(this)}/>
                <FormCell select selectPos="before" style={{backgroundColor: 'white'}}>
                    <CellHeader>
                        <Select onChange={this.handleSelectChange.bind(this)}>
                            <option value="">全部</option>
                            {this.state.secondMenuList.map(second=>(<option value={second.NO}>{second.FULLNAME}</option>))}
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
