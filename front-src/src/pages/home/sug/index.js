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

class Sug extends React.Component {
    render(){
        return (
            <section class="tb-content">
                <header class="tb-header">
                    <a href="" class="tb-title">投诉建议</a>
                </header>
                <section class="tb-complaint">
                    <p class="tb-complaint-title">您碰到什么问题?</p>
                    <ul class="tb-complaint-list">
                        <li class="tb-complaint-item">
                            <i class="tb-complaint-icon tb-complaint-active"></i>
                            <span class="tb-complaint-content">这是一个问题一个问题一个问题</span>
                        </li>
                        <li class="tb-complaint-item">
                            <i class="tb-complaint-icon"></i>
                            <span class="tb-complaint-content">这是一个问题一个问题一个问题</span>
                        </li>
                        <li class="tb-complaint-item">
                            <i class="tb-complaint-icon"></i>
                            <span class="tb-complaint-content">这是一个问题一个问题一个问题</span>
                        </li>
                        <li class="tb-complaint-item">
                            <i class="tb-complaint-icon"></i>
                            <span class="tb-complaint-content">这是一个问题一个问题一个问题</span>
                        </li>
                    </ul>
                </section>
                <section class="tb-input-des">
                    <textarea name="des-input" id="" cols="30" rows="10" class="tb-input-content" >请输入您的描述...</textarea>
                </section>
                <section class="tb-feedback">收到您的疑问/建议/投诉后,我们会尽快通过电话回访的方式给您反馈结果,感谢您对奇异天宝网的支持！
                </section>
                <section class="tb-our-tel">
                    <p class="tb-complaint-tel"><i class="icon"></i>400-885-1666</p>
                    <p class="tb-complaint-phone">13589457896</p>
                </section>
                <section class="ta-au-submit-btn">
                    <button class="tb-au-submit">验证通过</button>
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
            <Sug/>
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
