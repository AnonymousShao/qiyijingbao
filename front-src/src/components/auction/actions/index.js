import React, {Component} from 'react'
import {Button, ButtonArea} from '../../button'

export default class Actions extends Component{

    handleClick(){
        console.log(1)
    }

    render(){
        return (
            <div>
                <ButtonArea direction="horizontal">
                    <Button size="small" type='primary'
                            onClick={this.handleClick.bind(this, 'notice')}>竞拍须知</Button>
                    <Button size="small" type='default'
                            onClick={this.handleClick.bind(this, 'news')}>竞拍资讯</Button>
                    <Button size="small" type='default'
                            onClick={this.handleClick.bind(this, 'share')}>分享给朋友</Button>
                </ButtonArea>
            </div>
        )
    }
}