import React from 'react'
import './style.scss'


// http.get('/login/sendMSMALL?phone=13248260781').then(data=>{
//     debugger
// })

export default class BidSuc extends React.Component {
    render(){
        return (
            <div>
                <ul className="detail">
                    <li className="bid-s">
                        <div className="content">
                            <div className="left"><img src="" alt=""/></div>
                            <div className="right">
                                <p className="goods">高山流水<span>(叶迪)</span><img src={require('../../../assets/images/per_ic_s.png')} alt=""/></p>
                                <p className="lot">lot号 竞品名称</p>
                                <p className="area">专场名称：国画专拍</p>
                                <p className="deal-time"><i></i>于04-23 13:20:10成交</p>
                            </div>
                        </div>
                        <div className="operate">
                            <a href="">设置</a>
                            <a href="">付费备案</a>
                            <a href="">详情</a>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
};

