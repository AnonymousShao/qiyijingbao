import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Header from '../../../components/header'
import { imageHost as imgHost } from '../../../helper/config'
import Footer from '../../../components/footer'
import { Button, ButtonArea, Form, FormCell, Cell, CellHeader, CellBody, CellsTitle, Input, Label, CellFooter,
    VCode, Select, Gallery, GalleryDelete } from '../../../components/button'
import Uploader from "../../../components/uploader/index";
require('./style.scss')


class FormCellMe extends Component{

    render(){
        return (
            <FormCell vcode={this.props.vcode}>
                <CellHeader>
                    <Label>{this.props.title}</Label>
                </CellHeader>
                <CellBody>
                    <Input placeholder={this.props.placeholder}/>
                </CellBody>
                {this.props.vcode}
            </FormCell>
        )
    }
}

class Main extends Component{

    state = {
        randomImage: Math.random()
    }

    constructor(props){
        super(props)
    }

    changeCode(){
        this.setState({
            randomImage: Math.random()
        })
    }

    handleClick(){

    }

    render(){
        return (
            <div>
                <Form style={{marginTop: 0}}>
                    <FormCell select selectPos="after">
                        <CellHeader>
                            <Label>议价品类目</Label>
                        </CellHeader>
                        <CellBody>
                            <Select data={[
                                {
                                    value: 1,
                                    label: '国画书法'
                                },
                                {
                                    value: 2,
                                    label: 'United States'
                                },
                                {
                                    value: 3,
                                    label: 'Germany'
                                }
                            ]} />
                        </CellBody>
                    </FormCell>
                </Form>
                <CellsTitle>委托人相关（必填）</CellsTitle>
                <Form>
                    <FormCellMe title="姓名"/>
                    <FormCellMe title="所在地"/>
                    <FormCellMe title="手机号"/>
                    <FormCellMe title="图形验证码" placeholder="图形验证码" vcode={<CellFooter>
                        <VCode onClick={this.changeCode.bind(this)} src={"/users?rdm=" + this.state.randomImage} />
                    </CellFooter>}/>
                    <FormCellMe title="验证码" placeholder="请输入验证码" vcode={<CellFooter>
                        <Button type="vcode">获取</Button>
                    </CellFooter>}/>
                </Form>
                <CellsTitle>艺术作品相关（必填）</CellsTitle>
                <Form>
                    <FormCellMe title="作者姓名"/>
                    <FormCellMe title="作品尺寸" placeholder="请输入高*宽  单位：CM"/>
                    <FormCellMe title="出售底价"/>
                    <div style={{paddingLeft: 15}}><input type="checkbox"/>公开</div>
                </Form>
                <CellsTitle>图片上传（必填）</CellsTitle>
                <Form>
                    <CellBody className="uploader-parent">
                        <Uploader files={[{url: require('../../../assets/images/img_source/img_5.png')}]} title="整体" maxCount={1}/>
                        <Uploader title="局部" maxCount={1}/>
                        <Uploader title="款识" maxCount={1}/>
                    </CellBody>
                </Form>
                <CellsTitle>更多信息（选填）</CellsTitle>
                <Form>
                    <FormCellMe title="作品名称"/>
                    <FormCellMe title="作品年代"/>
                </Form>
                <div style={{padding: '40px 48px'}}>
                    <Button
                        onClick={e=>window.location.href='/bargain.html'}
                        style={{backgroundImage: `url(${require('../../../assets/images/btn_1.png')}`}}>提交评论</Button>
                </div>
            </div>
        )
    }
}

const Root = () => (
    <div>
        <Header/>
        <Main />
        <Footer active="bargain"/>
    </div>
);

ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);
