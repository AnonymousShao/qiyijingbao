import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import {store} from '../../../reduxes/store'
import Footer from '../../../components/footer';
import { getAuthNum, validating } from '../../../helper/http/auth';
import '../common.scss'
import './style.scss'

import { HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

// http.get('/login/sendMSMALL?phone=13248260781').then(data=>{
//     debugger
// })

class Auth extends React.Component {
    getInitialState(){
        return {
            username: '',
            tel: '',
            valCode: '',
            idCode: ''
        }
    }
    handleUsername(e){
        var val = e.target.value;
        this.setState({
            username: val
        });
    }
    handleTel(e){
        var val = e.target.value;
        this.setState({
            valCode: val
        });
    }
    handleGraph(e){
        var val = e.target.value;
        this.setState({
            tel: val
        });
    }
    handleId(e){
        var val = e.target.value;
        this.setState({
            idCode: val
        });
    }

    validate(){
        var dataObj = {
            "Pre_MemberInfoView":" {RealName:"+this.state.username+"，Account:"+this.state.tel+",IDNumber:"+this.state.idCode+",securitycode:"+this.state.valCode+"} "};
        var res = validating(dataObj).then(data => JSON.parse(data));
    }

    componentDidMount(){
        /* 获取到验证码 */
        var data = getAuthNum().then(data => JSON.parse(data));
        console.log(data);
    }
    render(){
        return (
            <section className="tb-content">
                <header className="tb-header">
                    <a href="" className="tb-logo"><img src={require('../../../assets/images/logo@2x.png')} alt=""/></a>
                    <a href="" className="tb-title">实名认证</a>
                </header>
                <figure className="tb-user-img">
                    <img src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=401680676,1846288314&fm=58" alt=""/>
                </figure>
                <ul className="tb-au-info">
                    <li className="tb-au-item">
                        <span className="tb-au-title">姓名</span>
                        <span className="ta-au-tel"><input type="text" placeholder="请输入用户名" value={{/*this.state.username*/}} onChange={this.handleUsername}/></span>
                    </li>
                    <li className="tb-au-item">
                        <span className="tb-au-title">图形验证码</span>
                        <section className="tb-input-bar">
                            <input type="text" placeholder="请输入图形验证码" ref="graphCode" value={{/*this.state.valCode*/}} onChange={this.handleGraph}/>
                                <span className="tb-img-test">4587</span>
                        </section>

                    </li>
                    <li className="tb-au-item">
                        <span className="tb-au-title">手机验证码</span>
                        <section className="tb-input-bar">
                            <input type="text" placeholder="请输入手机验证码" value={{/*this.state.tel*/}} onChange={this.handleTel}/>
                                <span className="tb-au-getphone-test">获取验证码</span>
                        </section>

                    </li>
                    <li className="tb-au-item">
                        <span className="tb-au-title ">身份证号</span>
                        <span className="tb-au-id-num"><input type="text" placeholder="身份证号" value={{/*this.state.idCode*/}} onChange={this.handleId}/></span>
                    </li>
                </ul>
                <section className="ta-au-submit-btn" onClick={this.validate}>
                    <button className="tb-au-submit">验证通过</button>
                </section>
            </section>
        );
    }
};

const router = (
    <Switch>

    </Switch>
);

const Root = () => (
        <div>
            <Auth/>
            <Footer active="user"/>
            <div style={{padding: '0 25px'}}>
                <Router>
                    {router}
                </Router>
            </div>
        </div>
);

ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);
