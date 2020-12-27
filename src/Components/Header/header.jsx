import React from 'react'
import { Avatar,Skeleton } from 'antd';
import {LogoutOutlined} from '@ant-design/icons';
import SearchField from './Search/search.jsx'
import '../Layout/layout.css'
import { Link } from 'react-router-dom';
import Nav from '../NavMenu/navmenu.jsx'
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
                    <Nav username={this.props.username}/>
                <SearchField/>
             
                <div className="tc">
                <Avatar size={30} src={this.props.ProfileImg} />
                
                </div>
                
                <Link onClick={this.logout} class="dtc v-mid mid-gray link dim w-10 tr ml5 f4" to="/login" title="logout"><LogoutOutlined /></Link>
                </nav>
                
            </header>
        )
    }
}
export default Header