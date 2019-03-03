import React,{Component} from 'react';
import './row.css';
import Stone from './Stone';


export default class Row extends Component{
    
    render(){
        return(
                <div className = 'row'>
                    {(this.props.data).map((data) => (
                        <Stone id = {data.id} state = {data.state} />
                    ))}
                </div>
        )
    }
}