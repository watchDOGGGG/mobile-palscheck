
import React from 'react'
import {Input,Button} from 'antd'

class ChangePass extends React.Component{

    constructor(){
        super()
        this.state = {
            oldpass: '',
            error: '',
            msg:''
        }
    }
    changePass = async()=>{
       if(this.state.oldpass !== ''){
        const changePass = await fetch('https://still-cove-26148.herokuapp.com/Authentication/change/password',{
            method:"POST",
            headers:{token:localStorage.token,'Content-Type':'application/json'},
            body:JSON.stringify({
                oldPass:this.state.oldpass,
            })
        })
        const response = await changePass.json()
        if(response.error){
            this.setState({error:response.error,msg:''})
        }else{
            this.setState({msg:response.msg,error:''})
        }
       }
    }
    setPasswordInput = (event)=>{
        this.setState({oldpass:event.target.value})
    }
    render(){
        const {error,msg,oldpass}= this.state
        return (
            <div className="cpas">
                <div>
                    <label className="db">Old password</label>
                    <input type="password" value={oldpass}
                        onChange={this.setPasswordInput}
                    />
                </div>
                <div className="db mt1">
                    <Button
                        onClick={this.changePass}
                    >Done</Button>
                </div>
                <p className="tc red db">{error}</p>
                <p className="tc green db">{msg}</p>
            </div>
        )
    }
}
export default ChangePass