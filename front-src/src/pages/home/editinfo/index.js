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

class EditInfo extends React.Component {
    render(){
        return (
            <section className="tb-content">
                <header className="tb-header">
                    <a href="" className="return-back"><img src={require('../../../assets/images/back.png')} alt=""/></a>
                    <a href="">编辑个人资料</a>
                    <a href=""></a>
                </header>
                <section className="tb-user-logo">
                    <article className="tb-user-logo-detail">
                        <figure className="tb-logo-header">
                            <img src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=401680676,1846288314&fm=58" alt=""/>
                                <a href="" className="tb-go-au"></a>
                                <input type="file" accept="image/*" className="tb-input-img"/>
                                    <a href="" className="ta-au-gdmask">
                                        上传照片
                                    </a>
                        </figure>
                        <p className="ta-au-phone">15896587458</p>
                        <p className="tb-au-question">
                            <a href="" className="ta-au-way">如何升级?</a><a href=""  className="ta-au-level">普通会员</a><a href=""  className="ta-au-way">为何升级?</a>
                        </p>
                    </article>
                </section>
                <section className="tb-name-input">
                    <p className="tb-input-title">您的称呼</p>
                    <article className="ta-au-name-list">
                        <p className="tb-input-bar">
                            <input type="text" className="tb-input-text" placeholder="姓名"/>
                        </p>

                        <p className="tb-change-status">
                            <span className="active">先生</span>
                            <span>女士</span>
                        </p>
                    </article>
                </section>
                <section className="tb-email-input">
                    <p className="tb-input-title">电子邮件</p>
                    <p className="tb-input-bar">
                        <input type="text" className="tb-input-text" placeholder="请输入邮箱"/>
                    </p>
                </section>
                <figure className="tb-line"></figure>
                <section className="tb-email-input">
                    <p className="tb-input-title">您的生日</p>
                    <p className="tb-input-bar tb-input-birthday">
                        <input type="text" className="tb-input-text" placeholder="生日日期"/>
                    </p>
                </section>
                <figure className="tb-line"></figure>
                <section className="tb-take-part">
                    <p className="tb-input-title">您已通过身份认证,可以自由活动啦</p>
                </section>
                <section className="tb-bind-weixin">
                    <p className="tb-input-title">绑定微信登陆后可进行快速登陆,前往绑定</p>
                </section>
                <section className="ta-au-submit-btn">
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
    <Provider store={store}>
        <div>
            <EditInfo/>
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
