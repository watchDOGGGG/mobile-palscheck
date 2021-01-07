import React from 'react'
import { BellOutlined,MessageOutlined,SearchOutlined,HomeOutlined } from '@ant-design/icons';
import {Avatar} from 'antd'
import { Link } from 'react-router-dom';
import Logo from '../Logo/logofav3.jsx'
class Header extends React.Component{
    constructor(){
        super()
        this.state={
            size: 'default'
        }
    }
 //GEt all user additional info

 logout = async()=>{
    try {
        localStorage.removeItem("token")
        this.props.UpdateAuth(2)
    } catch (error) {
        console.log(error.message)
    }
}
    render(){
        const {size} = this.state
        return(
            // <header>
            //     <nav class="dt w-100 border-box pa3 ph5-ns">
            //     <div class="dtc v-mid w-30 tl b blue f5">
            //     <a href={'https://palscheck.com'}><div className="header-logo">
            //            <Logo/> 
            //         </div>
            //         </a>
            //     </div>
            //     <SearchField/>
                
            //     {
            //         this.props.fullname?
            //         <Link class="dtc v-mid mid-gray link dim w-25 tr f6" to={this.props.username === 'loading'?null:`${this.props.username}.pal`} title="profile">
            //     <span className="mr3">Hey, {!this.props.fullname?null:`${this.props.fullname}!`}</span>
                
            //     <Avatar size={40} src={this.props.ProfileImg} />
                    
                
                    
            //     </Link>
            //         :
            //         <span class="dtc v-mid mid-gray link dim w-25 tr f6">
            //         ...
            //         </span>
                    
            //     }
                
            //     <Link onClick={this.logout} class="dtc v-mid mid-gray link dim w-10 tr f6" to="/login" title="logout"><LogoutOutlined /> logout</Link>
            //     </nav>
                
            // </header>
            <div className="mpalsHeader">
            <header>
                <div>
                    <span className="blue ml3 f5">Home</span>
                    <span className="absolute right-1 mt1">
                 {
                    this.props.fullname?
                    <Link class="" to={this.props.username === 'loading'?null:`${this.props.username}.pal`} title="profile">
                
                
                <Avatar size={40} src={this.props.ProfileImg} />
               
                </Link>
                    :
                    <span class="dtc v-mid mid-gray link dim w-25 tr f6">
                    ...
                    </span>
                    
                }
                
                    </span>
                </div>
                <ul className="tc mt2">
                    <li className="dib absolute left-1 ">
                        <a href="/home" className="f4 gray"><HomeOutlined /></a>
                    </li>
                    <li className="dib mr6 ">
                        <a href="/chat" className="f4 gray"><MessageOutlined /></a>
                    </li>
                    <li className="dib mr4 ">
                        <a href="search" className="f4 gray"><SearchOutlined /></a>
                    </li>
                    <li className="dib absolute right-1 ">
                        <a href="notification" className="f4 gray"><BellOutlined /></a>
                    </li>
                </ul>
            </header>
        </div>
        )
    }
}
export default Header