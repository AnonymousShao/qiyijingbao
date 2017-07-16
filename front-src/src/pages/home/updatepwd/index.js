import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import {store} from '../../../reduxes/store'

import '../common.scss'
import './style.scss'

import { HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

// http.get('/login/sendMSMALL?phone=13248260781').then(data=>{
//     debugger
// })

class UpdatePwd extends React.Component {
    render(){
        return (
            <section class="tb-content">
                <header class="tb-header">
                    <a href="" class="tb-logo"><img src={require('../../../assets/images/logo@2x.png')} alt=""/></a>
                    <a href="" class="tb-title">修改秘密</a>
                </header>
                <section class="tb-operate-bar">
                    <figure class="ta-au-submit-info ta-au-submit-phone">
                        <i class="ta-au-submit-icon"></i>
                        <input type="text"  class="ta-au-submit-input" placeholder="请输入您的手机号!"/>
                    </figure>
                    <figure class="ta-au-submit-info ta-au-submit-password">
                        <i class="ta-au-submit-icon"></i>
                        <input type="text"  class="ta-au-submit-input" placeholder="至少6位大小写英文数字"/>
                            <span class="ta-au-submit-eye open"></span>
                    </figure>
                    <figure class="ta-au-submit-info ta-au-submit-email">
                        <i class="ta-au-submit-icon"></i>
                        <input type="text"  class="ta-au-submit-input" placeholder="请输入验证码"/>
                            <span class="ta-au-submit-test">发送至手机</span>
                    </figure>
                </section>
                <section class="ta-au-submit-btn">
                    <button class="tb-au-submit">保存并修改</button>
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
