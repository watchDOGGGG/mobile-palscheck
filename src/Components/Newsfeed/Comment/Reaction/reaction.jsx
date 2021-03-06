import React from 'react'
import {HeartOutlined,HeartFilled} from '@ant-design/icons';

const localLink = 'localhost:4000'
const SeverLink = 'https://still-cover-backend.uc.r.appspot.com'
const style = { background: '', padding: '8px 0' };
class Reaction extends React.Component{

    constructor(){
        super()
        this.state = {
            reaction:'',
            react_num:''
        }
        
    }
    componentDidMount(){
        this.checkIfLiked()
    }
 
    SendReact = async()=>{
        const send_re3 = await fetch(`${SeverLink}/Feed/reactCommt`,{
            method:'POST',
            headers:{'Content-Type':'application/json',token:localStorage.token},
            body: JSON.stringify({
                feed_id:this.props.feed_id,
                react_to:this.props.react_to,
                comment_id:this.props.comment_id,
                react_type:'comment'
            })
        })
        const response = await send_re3.json()
        if(response.likedComm){
            this.setState({reaction:'liked'})
        }else if(response.unlikedComm){
            this.setState({reaction:''})
        }
        
    }
   
    checkIfLiked = async()=>{
        const checked = await fetch(`${SeverLink}/Feed/hasLikedComment/${this.props.feed_id}/${this.props.comment_id}`,{
            headers:{token:localStorage.token},
        })
        const response = await checked.json()
        
        if(response.liked){
            this.setState({reaction:'liked'})
        }else{
            this.setState({reaction:''})
        }
    }
    render(){
        return(
            <>
            {
                this.state.reaction === '' ?
                <div style={style} className="hover-dark-red f33lke"><HeartOutlined onClick={this.SendReact} />&nbsp;<span className="f6">{this.state.react_num}</span></div>
                :
                <div style={style} className="dark-red unf33lke"><HeartFilled onClick={this.SendReact} />&nbsp;<span className="f6">{this.state.react_num}</span></div>
                
            }
                
            </>
        )
    }
}
export default Reaction