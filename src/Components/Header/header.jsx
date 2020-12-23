import React from 'react'
import { Avatar,Skeleton } from 'antd';
import {LogoutOutlined} from '@ant-design/icons';
import SearchField from './Search/search.jsx'
import '../Layout/layout.css'
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
            <header>
                <nav class="dt w-100 border-box pa3 ph5-ns">
                <div class="dtc v-mid w-30 tl b blue f5">
                <a href={'https://palscheck.com'}><div className="header-logo">
                       <Logo/> 
                    </div>
                    </a>
                </div>
                <SearchField/>
                
                {
                    this.props.fullname?
                    <Link class="dtc v-mid mid-gray link dim w-25 tr f6" to={this.props.username === 'loading'?null:`${this.props.username}.pal`} title="profile">
                <span className="mr3">Hey, {!this.props.fullname?null:`${this.props.fullname}!`}</span>
                
                <Avatar size={40} src={this.props.ProfileImg} />
                    
                
                    
                </Link>
                    :
                    <span class="dtc v-mid mid-gray link dim w-25 tr f6">
                    ...
                    </span>
                    
                }
                
                <Link onClick={this.logout} class="dtc v-mid mid-gray link dim w-10 tr f6" to="/login" title="logout"><LogoutOutlined /> logout</Link>
                </nav>
                
            </header>
        )
    }
}
export default Header