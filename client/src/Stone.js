import React,{Component} from 'react';

import './stone.css';

export default class Stone extends Component{

    render(){
        return(
                <div className = 'cell' onClick = {() => (this.props.func(this.props.id))}>
                    <div className = 'id'>{this.props.id}</div>
                    <div className = {this.props.state} />
                </div>
        )
    }
}