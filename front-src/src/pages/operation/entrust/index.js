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
class Entrust extends React.Component {
    render(){
        return (
            <section className="container">
                <header className="header">
                    <span className="logo-ico"><img className="imgw" src={require('../../../assets/images/logo@2x.png')} alt="" /></span>
                    <strong className="header-tit"><img className="" src={require('../../../assets/images/operations/wtjl_page.png')} alt="委托记录" /></strong>
                </header>
                <div className="bg-line"><img className="imgw" src={require('../../../assets/images/bg_rule.png')} alt="" /></div>
                <ul className="main-box entrust-list">
                    <li className="entrust-item">
                        <a href="javascript:;">
                            <p className="lh48"><span className="mr15">委托编号:</span>213123454545</p>
                            <p className="col666 lh48"><span className="mr15">委托人:</span>沈阳</p>
                            <p className="fs22 col666 lh36 mt08"><span className="mr15">作品名称:</span>XXX</p>
                            <p className="fs22 col666 lh36"><span className="mr15">作品尺寸:</span>XXX</p>
                            <p className="fs22 col666 lh36"><span className="mr15">作者:</span>XXX</p>
                            <span className="entrust-state c5eb809">状态</span>
                        </a>
                    </li>
                    <li className="entrust-item">
                        <a href="javascript:;">
                            <p className="lh48"><span className="mr15">委托编号:</span>213123454545</p>
                            <p className="col666 lh48"><span className="mr15">委托人:</span>沈阳</p>
                            <p className="fs22 col666 lh36 mt08"><span className="mr15">作品名称:</span>《富春山居图》</p>
                            <p className="fs22 col666 lh36"><span className="mr15">作品尺寸:</span>XXX</p>
                            <p className="fs22 col666 lh36"><span className="mr15">作者:</span>XXX</p>
                            <span className="entrust-state c5eb809">状态</span>
                        </a>
                    </li>
                </ul>
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
            <Entrust />
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
