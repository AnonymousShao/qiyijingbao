import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import {store} from '../../reduxes/store'
import { Toast, Dialog, Button } from 'react-weui'
import Input from '../../components/input2'
import Head from '../../components/head'

import http from  'axios'

require('style-loader!css-loader!sass-loader!./style.scss')

http.get('/login/sendMSMALL?phone=13248260781').then(data=>{
    debugger
})

const Root = () => (
    <Provider store={store}>
        <div>
            <Head />
            <div style={{padding: '0 25px'}}>
                <div>
                    <Input type="text" placeholder="请输入您的手机号"/>
                    <Input type="password" placeholder="密码6-18位大小写英文和数字"/>
                    <Input type="text" actionType="code" placeholder="请输入图形验证码"/>
                    <Input type="text" actionType="phone" placeholder="请输入验证码"/>
                </div>
                <Button>你好</Button>
                <Toast show={false}/>
                <Dialog show={false}>adlkfjs</Dialog>
            </div>
        </div>
    </Provider>
);

ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);
