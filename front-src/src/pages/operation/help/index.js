import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import {store} from '../../../reduxes/store'
import Footer from '../../../components/footer'
import './style.scss'

import { HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

// http.get('/login/sendMSMALL?phone=13248260781').then(data=>{
//     debugger
// })
class Help extends React.Component {
    render(){
        return (
            <section className="container">
                <header className="header">
                    <strong className="header-tit"><img className="" src={require('../../../assets/images/operations/bz_page.png')} alt="帮助中心" /></strong>
                </header>
                <div className="bg-line"><img className="imgw" src={require('../../../assets/images/operations/bg_rule.png')} alt="" /></div>
                <div className="main-box">
                    <h2 className="small-tit">常见问题</h2>
                    <ul className="issue-list">
                        <li className="issue-item"><a href="javascript:;">如何找回密码？</a></li>
                        <li className="issue-item"><a href="javascript:;">如何快速登录？</a></li>
                        <li className="issue-item"><a href="javascript:;">如何顺利竞价？</a></li>
                        <li className="issue-item"><a href="javascript:;">如何缴纳保证金？</a></li>
                        <li className="issue-item"><a href="javascript:;">如何申请退还保证金？</a></li>
                        <li className="issue-item"><a href="javascript:;">如何进行议价？</a></li>
                        <li className="issue-item"><a href="javascript:;">如何进行身份验证？</a></li>
                    </ul>
                    <ol className="issue-nav">
                        <li>
                            <span><a href="javascript:;"><strong className="iconfont">&#xe607;</strong>流程引导</a></span>
                            <span><a href="javascript:;"><strong className="iconfont">&#xe6b8;</strong>关于我们</a></span>
                        </li>
                        <li>
                            <span><a href="javascript:;"><strong className="iconfont">&#xe605;</strong>规则查阅</a></span>
                            <span><a href="javascript:;"><strong className="iconfont">&#xe60e;</strong>常见问题</a></span>
                        </li>
                    </ol>
                    <div className="phone-info">
                        <div>
                            <strong className="iconfont">&#xe602;</strong>
                            <p><a href="tel:400-885-1666">400-885-1666</a></p>
                            <p><a className="col999" href="tel:15010678866">15010678866</a></p>
                        </div>
                    </div>
                </div>
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
            <Help />
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
