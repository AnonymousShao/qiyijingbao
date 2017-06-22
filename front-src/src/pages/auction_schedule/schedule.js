import React, {Component} from 'react'


export default class Schedule extends Component{

    state = {
        schedule: 'inAuction'
    }

    handleChange(type){
        this.setState({
            schedule: type
        })
    }

    style = {
        container: {
            backgroundColor: 'white'
        }
    }

    data = [{
        img: require('../../assets/images/img_source/img_1.png'),
        price: 123,
        list: [
            123, 12
        ]
    }, {
        img: require('../../assets/images/img_source/img_11.png'),
        price: 123,
        list: [
            123, 12, 23
        ]
    }, {
        img: require('../../assets/images/img_source/img_1.png'),
        price: 123,
        list: []
    }, {
        img: require('../../assets/images/img_source/img_11.png'),
        price: 123,
        list: []
    }]

    render(){
        return (
            <div style={this.style.container}>
                <div className="head-btn-group">
                    <span className={'head-btn ' + (this.state.schedule==='inAuction'?'active':'')}
                          onClick={this.handleChange.bind(this, 'inAuction')}>竞拍日程</span>
                    <span className={'head-btn ' + (this.state.schedule==='prevision'?'active':'')}
                          onClick={this.handleChange.bind(this, 'prevision')} >预展日程</span>
                </div>
                <div className="card-container" style={{padding: '15px 15px 0'}}>
                    {this.data.map((card, i)=><ImgCard card={card}/>)}
                </div>
            </div>
        )
    }
}

class ImgCard extends Component{

    render(){
        return (
            <div className="card">
                <div className="card-img" style={{backgroundImage: `url(${this.props.card.img})`}} />
                <div className="card-body">
                    <h3>价格区间</h3>
                    <p className="card-price">
                        <span>{this.props.card.price}</span>
                        <small>RMB</small>
                    </p>
                    <ul className="card-list">{this.props.card.list.map(info=>(<li key={info}>{info}</li>))}</ul>
                </div>
            </div>
        )
    }
}