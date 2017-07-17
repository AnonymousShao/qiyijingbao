import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import {store} from '../../../reduxes/store'
import Footer from '../../../components/footer';
import '../common.scss'
import './style.scss'

import { HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

// http.get('/login/sendMSMALL?phone=13248260781').then(data=>{
//     debugger
// })

class UpdatePwd extends React.Component {
    render(){
        return (
            <section className="tb-content">
                <header className="tb-header">
                    <a href="" className="tb-logo"><img src={require('../../../assets/images/logo@2x.png')} alt=""/></a>
                    <a href="" className="tb-title">修改秘密</a>
                </header>
                <section className="tb-operate-bar">
                    <figure className="ta-au-submit-info ta-au-submit-phone">
                        <i className="ta-au-submit-icon"></i>
                        <input type="text"  className="ta-au-submit-input" placeholder="请输入您的手机号!"/>
                    </figure>
                    <figure className="ta-au-submit-info ta-au-submit-password">
                        <i className="ta-au-submit-icon"></i>
                        <input type="text"  className="ta-au-submit-input" placeholder="至少6位大小写英文数字"/>
                            <span className="ta-au-submit-eye open"></span>
                    </figure>
                    <figure className="ta-au-submit-info ta-au-submit-email">
                        <i className="ta-au-submit-icon"></i>
                        <input type="text"  className="ta-au-submit-input" placeholder="请输入验证码"/>
                            <span className="ta-au-submit-test">发送至手机</span>
                    </figure>
                </section>
                <section className="ta-au-submit-btn">
                    <button className="tb-au-submit">保存并修改</button>
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
    <Provider store={store}>
        <div>
            <UpdatePwd/>
            <Footer active="user"/>
            <div style={{padding: '0 25px'}}>
                <Router>
                    {router}
                </Router>
            </div>
        </div>
    </Provider>
);

ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);
