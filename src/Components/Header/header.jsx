import React from 'react'
import { BellOutlined,MessageOutlined,SearchOutlined,HomeOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import Menu from "./menu.jsx";

const localLink = 'http://localhost:4000'
const SeverLink = 'https://still-cover-backend.uc.r.appspot.com'
class Header extends React.Component{
    constructor(){
        super()
        this.state={
            size: 'default',
            notifyBadge:'',
        }
    }
 //GEt all user additional info

 componentDidMount(){
     setInterval(() => {
         this.getNotificationCount()
     }, 1000);
    
 }

upDateToken = ()=>{
    this.props.UpdateAuth(2)
}
getNotificationCount = async()=>{
    try {
        const fetchData = await fetch(`${SeverLink}/Authentication/Notify/Count`,{
            headers:{token:localStorage.token}
        })
        const response = await fetchData.json()
        if(response.result){
        this.setState({notifyBadge:response.result})
        }
    } catch (error) {
        
    }
}
    render(){
        
        const {size,notifyBadge} = this.state
        return(
       
            <div className="mpalsHeader">
            <header>
                <div>
                   <span className="blue ml3 f5 ttc">{this.props.headerRoute}</span>
                        
                    <span className="absolute right-1 mt1">
                         <Menu token={this.upDateToken} notifyBadge={notifyBadge} ProfileImg={this.props.ProfileImg} fullname={this.props.fullname} username={this.props.username}/>
               
                    </span>
                </div>
                <ul className="tc mt2">
                    <li className="dib absolute left-1 ">
                        <a href="/home" className="f4 gray"><HomeOutlined /></a>
                    </li>
                    <li className="dib mr6 ">
                        <a href="/talks" className="f4 gray"><MessageOutlined /></a>
                    </li>
                    <li className="dib mr4 ">
                        <a href="/search" className="f4 gray"><SearchOutlined /></a>
                    </li>
                    <li className="dib absolute right-1 ">
                        <a href="/notification" className="f4 gray">
                        <Badge size="default" count={notifyBadge} overflowCount={999}>
                                    <a href="#" className="head-example" />
                                </Badge>
                            <BellOutlined />
                                </a>
                        </li>
                    </ul>
                </header>
            </div>
        )
    }
}
export default Header