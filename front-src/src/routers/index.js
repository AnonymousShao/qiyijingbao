import React, {Component} from 'react'
import {
    Route,
    Switch,
    Redirect
} from "react-router-dom";

import { Main } from '../pages/main/index'
import { EditPage } from '../pages/edit/'

function edit(){
    import('react-draft-wysiwyg').then((Editor)=>{

    })
}

// class NoMatch extends Component{
//     render(){
//         return (
//             <div>
//                 <Redirect to="/"/>
//             </div>
//         )
//     }
// }

const NoMatch = () =>(
    <div>
        <Redirect to="/"/>
    </div>
)

export const router = (
    <div>
        <Switch>
            <Route path='/edit/:id' component={EditPage}/>
            <Route path='/' exact component={Main}/>
            <Route component={NoMatch}/>
        </Switch>
    </div>
)
