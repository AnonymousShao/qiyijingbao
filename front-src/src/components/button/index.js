import React, {Component} from 'react'
import weui from 'react-weui'
require('./sheet.scss')

export const { Button, ButtonArea, Dialog, Cell, CellBody, CellHeader, Popup, Input, Select, FormCell,
SearchBar, Form, CellsTitle, Label, CellFooter, VCode, Gallery, GalleryDelete, Uploader, Icon, TextArea,
    Toast} = weui

export class ButtonClassic extends Component{

    render(){
        return (
            <Button {...this.props}
                    style={{backgroundImage: `url(${require('../../assets/images/btn_2.png')}`,
                        backgroundSize: 'cover'}}/>
        )
    }
}