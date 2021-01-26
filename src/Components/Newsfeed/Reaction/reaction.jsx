import React from 'react'
import {HeartOutlined,HeartFilled} from '@ant-design/icons';

const localLink = 'http://localhost:4000'
const SeverLink = 'https://still-cover-backend.uc.r.appspot.com'
const style = { background: '', padding: '8px 0' };
class Reaction extends React.Component{

    constructor(){
        super()
        this.state = {
            reaction:'',
            count:[]
        }
        
    }
    componentDidMount(){
        this.checkIfLiked()
        setInterval(() => {
            this.getReactCount()
        }, 1000);
        
    }
   
    getReactCount = async()=>{
        const fetchAll = await fetch(`${SeverLink}/Feed/like/count/${this.props.feed_id}`)
        const response = await fetchAll.json()
        if(response.count){
            this.setState({count:response.count})
        }
    }
    SendReact = async()=>{
        console.log('click')
        const send_re3 = await fetch(`${SeverLink}/Feed/reaction`,{
            method:'POST',
            headers:{'Content-Type':'application/json',token:localStorage.token},
            body: JSON.stringify({
                feed_id:this.props.feed_id,
                react_to:this.props.feed_by,
            })
        })
        const response = await send_re3.json()
        if(response.liked){
            this.setState({reaction:'liked',})
            this.setState({
                count: this.state.count + 1
              });
        }else if(response.unliked){
            this.setState({reaction:'',})
            this.setState({
                count: this.state.count - 1
              });
        }
        
    }
   
    checkIfLiked = async()=>{
        
        const checked = await fetch(`${SeverLink}/Feed/hasLiked/${this.props.feed_id}`,{
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
                <div style={style} className="hover-dark-red f33lke"><HeartOutlined onClick={this.SendReact} />&nbsp;<span className="f6">{this.state.count}</span></div>
                :
                <div style={style} className="dark-red unf33lke"><HeartFilled onClick={this.SendReact} />&nbsp;<span className="f6">{this.state.count}</span></div>
                
            }
           
            </>
        )
    }
}
export default Reaction