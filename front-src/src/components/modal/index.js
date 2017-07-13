import React, {Component} from 'react'
import './style.scss'

export default class Modal extends Component{

    render(){
        return this.props.show?(
            <div className="modal__background">
                <div className="modal__close" onClick={this.props.onClose}>
                    <i className="iconfont icon-llalbumshopselectorcancel" />
                </div>

                <div className="modal__body">
                    {this.props.children}
                </div>
            </div>
        ):null
    }
}


export class Share extends Component{
    
    render(){
        return (
            <Modal show={this.props.show} onClose={this.props.onClose}>
                <div style={{textAlign: 'center'}}>
                    <img className="share-arrow" src={require('../../assets/images/shareArrow@2x.png')} alt=""/>
                    <p className="share-guide">请点击右上角</p>
                    <div className="share-container">
                        <div className="share-item">
                            <img src={require('../../assets/images/share@2x.png')} alt=""/>
                            <p>发送给好友</p>
                        </div>
                        <div className="split-line"></div>
                        <div className="share-item">
                            <img src={require('../../assets/images/pengyouquan@2x.png')} alt=""/>
                            <p>分享到朋友圈</p>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}