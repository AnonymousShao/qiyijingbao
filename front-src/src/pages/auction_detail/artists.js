import React, {Component} from 'react'
import OverflowDrop from "../../components/overflow_drop/index";
import {getArtisitDetail} from '../../helper/http'
import {imageHost} from '../../helper/config'


export default class Artists extends Component{

    constructor(props){
        super(props)
        const params = {
            artistNo: this.props.artistNo
        }
        getArtisitDetail(params).then(data=>{
            const artistInfo = data.ArtistInfo[0],
                artistWorks = data.ArtistWorks,
                workClass = data.WorkClass;
            this.setState({
                artistInfo, artistWorks, workClass
            })
        })
    }

    state = {
        artistInfo: '',
        artistWorks: '',
        workClass: ''
    }

    render(){
        return (
            <div>
                {this.state.artistInfo?<div className="artist-intro board-container mb10" >
                    <div className="artist-intro-header">
                        <img src={imageHost + this.state.artistInfo.HeadImgUrl} alt=""/>
                    </div>
                    <h3 className="artist-intro-name">{this.state.artistInfo.Name}</h3>
                    <p className="artist-intro-address">{this.state.artistInfo.NativePlace||'中国'}</p>
                    <OverflowDrop
                        className="max-height4 content"
                        content={this.state.artistInfo.Description}
                    />
                </div>:null}
            </div>

        )
    }
}