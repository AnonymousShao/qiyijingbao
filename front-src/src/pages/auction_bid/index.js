import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Header from '../../components/auction/bid_header'
import Footer from '../../components/footer'
import './style.scss'
import CardBoard from "../../components/card/index";
import { CellBody, CellHeader, Select, Input, FormCell } from '../../components/button'
import UpOrDown from "../../components/up_or_down/index";
import { getSimilar } from '../../helper/http'



class Main extends Component{
    state = {
        type: '',
        data: [{
            img: require('../../assets/images/img_source/img_1.png'),
            price: 123,
            list: [
                123, 12
            ]
        }, {
            img: require('../../assets/images/img_source/img_11.png'),
            price: 123,
            list: [
                123, 12, 23
            ]
        }, {
            img: require('../../assets/images/img_source/img_1.png'),
            price: 123,
            list: []
        }, {
            img: require('../../assets/images/img_source/img_11.png'),
            price: 123,
            list: []
        }],
        dataList: [],
        theme: '',
    }

    componentDidMount(){
        this.submit()
    }


    handleChange(type){
        this.setState({
            type
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
            ref_artistno: this.state.ref_artistno,
            ref_workclassno: this.state.ref_workclassno
        }
        getSimilar(params).then(data=>{
            this.setState({dataList: data.ArtistExponent})
        })
    }

    render(){
        return (
            <div>
                <FormCell select selectPos="before" style={{backgroundColor: 'white'}}>
                    <CellHeader>
                        <Select>
                            <option value="-1">类别</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
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
                            <UpOrDown title="估价" onChange={this.handleChange.bind(this, 'price')}/>
                            <UpOrDown title="年代" onChange={this.handleChange.bind(this, 'year')}/>
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
            <Header/>
            <Main/>
            <Footer />
        </div>
    )
}

ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);
