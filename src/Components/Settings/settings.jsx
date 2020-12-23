import React from 'react'
import Privacy from './Privacy/security.jsx'

class Settings extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    componentDidMount(){

    }
    render(){
        return(
            <div className="center w-80">
                <div className="db ">
                    <Privacy/>
                </div>
                <div className="db ba b--black-10">
                   <p className="tl pa2 ">personalize</p>
                   <div>
                       Switch theme
                       <button className="db center tc" onClick={()=>this.props.themeToggler()}>switch</button>
                   </div>
                </div>
            </div>
        )
    }
}
export default Settings