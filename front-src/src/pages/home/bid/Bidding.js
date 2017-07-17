
import React from 'react'
import './style.scss'


// http.get('/login/sendMSMALL?phone=13248260781').then(data=>{
//     debugger
// })

export default class Bidding extends React.Component {
    render(){
        return (
            <div>
                <ul className="detail">
                    <li>
                        <div className="left"><img src="" alt=""/></div>
                        <div className="right">
                            <p className="goods">高山流水<span>(叶迪)</span></p>
                            <p className="lot">lot号 竞品名称</p>
                            <p className="deal"><span>当前价：RMB 200</span></p>
                            <p className="myPrice">我的出价：RMB400</p>
                            <p className="area">专场：国画专拍</p>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
};

