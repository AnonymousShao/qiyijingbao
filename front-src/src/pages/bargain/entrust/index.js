import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Header from '../../../components/header'
import { imageHost as imgHost } from '../../../helper/config'
import Footer from '../../../components/footer'
import { Button, ButtonArea, Form, FormCell, Cell, CellHeader, CellBody, CellsTitle, Input, Label, CellFooter,
    VCode, Select, Gallery, GalleryDelete } from '../../../components/button'
import Uploader from "../../../components/uploader/index";
require('./style.scss')
import classNames from 'classnames'
import { classes } from '../../../helper/global'
const selectClasses = classes.map(cls=>({
    value: cls.no,
    label: cls.name
}))

class FormCellMe extends Component{

    render(){
        const inputProps = {
            placeholder: this.props.placeholder,
            onChange: this.props.onChange,
            value: this.props.value
        }

        return (
            <FormCell vcode={this.props.vcode}>
                <CellHeader>
                    <Label>{this.props.title}</Label>
                </CellHeader>
                <CellBody>
                    <Input {...inputProps}/>
                </CellBody>
                {this.props.vcode}
            </FormCell>
        )
    }
}

class Main extends Component{

    state = {
        checkPub: false,
        filesOverView: [{
            url: require('../../../assets/images/img_source/img_12.png')
        }],
        filesLocal: [],
        filesMark: [],
        queryParams: {},
        randomImage: Math.random()
    }

    constructor(props){
        super(props)
        this.handleFileChange = this.handleFileChange.bind(this)
        this.handleChangeParams = this.handleChangeParams.bind(this)
    }

    changeCode(){
        this.setState({
            randomImage: Math.random()
        })
    }

    handleFileChange(){
        debugger
    }

    handleChangeParams(key){
        return event => {
            this.setState({
                queryParams: Object.assign({}, this.state.queryParams, {
                    [key]: event.target.value
                })
            })
        }
    }

    render(){
        const checkPubCls = classNames('iconfont main-color', {
            'icon-yduifuxuankuangxuanzhong': this.state.checkPub,
            'icon-yduifuxuankuang': !this.state.checkPub,
        })

        return (
            <div>
                <Form style={{marginTop: 0}}>
                    <FormCell select selectPos="after">
                        <CellHeader>
                            <Label>议价品类目</Label>
                        </CellHeader>
                        <CellBody>
                            <Select data={ selectClasses } />
                        </CellBody>
                    </FormCell>
                </Form>
                <CellsTitle>委托人相关<span className="required">（必填）</span></CellsTitle>
                <Form>
                    <FormCellMe title="姓名"
                                value={this.state.name}
                                onChange={this.handleChangeParams('name')}/>
                    <FormCellMe title="所在地"
                                value={this.state.location}
                                onChange={this.handleChangeParams('location')}/>
                    <FormCellMe title="手机号"
                                value={this.state.phone}
                                onChange={this.handleChangeParams('phone')}/>
                    <FormCellMe title="图形验证码" placeholder="图形验证码" vcode={<CellFooter>
                        <VCode onClick={this.changeCode.bind(this)} src={"/users?rdm=" + this.state.randomImage} />
                    </CellFooter>}/>
                    <FormCellMe title="验证码" placeholder="请输入验证码" vcode={<CellFooter>
                        <Button type="vcode">获取</Button>
                    </CellFooter>}/>
                </Form>
                <CellsTitle>艺术作品相关<span className="required">（必填）</span></CellsTitle>
                <Form>
                    <FormCellMe title="作者姓名"
                                value={this.state.artistName}
                                onChange={e=>this.setState({artistName: 12})}
                    />
                    <FormCellMe title="作品尺寸" placeholder="请输入高*宽  单位：CM"/>
                    <FormCellMe title="出售底价"/>
                    <div style={{paddingLeft: 15, display: 'inline-block'}}
                         onClick={e=>this.setState({checkPub: !this.state.checkPub})}>
                        <i className={checkPubCls} />
                        <span className="global-info" style={{verticalAlign: 'text-bottom'}}>公开</span>
                    </div>
                </Form>
                <CellsTitle>图片上传<span className="required">（必填）</span></CellsTitle>
                <Form>
                    <CellBody className="uploader-parent">
                        <Uploader onChange={this.handleFileChange} files={this.state.filesOverView} title="整体" maxCount={1}/>
                        <Uploader onChange={this.handleFileChange} files={this.state.filesLocal} title="局部" maxCount={1}/>
                        <Uploader onChange={this.handleFileChange} files={this.state.filesMark} title="款识" maxCount={1}/>
                    </CellBody>
                </Form>
                <CellsTitle>更多信息<span className="required">（必填）</span></CellsTitle>
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
