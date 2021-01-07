import React from 'react'
import {SearchOutlined} from '@ant-design/icons';
import { Tabs } from 'antd';
import UsersResult from './results/users.jsx'
import Pageresult from './results/pages.jsx'
const { TabPane } = Tabs;
class  SearchField extends React.Component{
    constructor(){
        super()
        this.state = {
            Searchinput : '',
            filterBoxstyle:{
                width:"300px",
                border:"none",
                background:"none"
            },
            filterStyle:{
                width:"430px"
            },
            Users:[],
            pages:[],
            isLoggedIn:[],
            searchVisible:false
        }
    }
    componentDidMount(){
        try {
            this.SearchUsers()
        this.searchPages()
        this.getLoggedInUser()
        } catch (error) {
            
        }
    }
     getLoggedInUser = async()=>{
        const getLogginUser = await fetch('https://still-cover-backend.uc.r.appspot.com/Authentication/User/LoggedIn',{
            headers:{token:localStorage.token}
        })
        const response = await getLogginUser.json()
        this.setState({isLoggedIn:response.loggedIn})
    }
     SearchUsers = async()=>{
        const fetchAll = await fetch('https://still-cover-backend.uc.r.appspot.com/Authentication/All/user')
        const res = await fetchAll.json()
        if(res.result){
            this.setState({Users:res.result})
        }
    }

    searchPages = async()=>{
            const GetAllPage = await fetch('https://still-cover-backend.uc.r.appspot.com/Page/')
            const response = await GetAllPage.json()
            if(response.pages){
               this.setState({pages:response.pages})
            }
        }    

    onSearchchange = (event)=>{
        this.setState({Searchinput:event.target.value,searchVisible:true})
    }
    closeSearch = ()=>{
        this.setState({searchVisible:false})
    }
    render(){
        const {searchVisible,Searchinput} = this.state
        // search for Users
        const filterSearch = this.state.Users.filter(users=>{
            return users.fullname.toLowerCase().includes(Searchinput.toLowerCase())
        })
        //searchFor pages
        const filterPages = this.state.pages.filter(page=>{
            return page.name.toLowerCase().includes(Searchinput.toLowerCase())
        })
        return(
            <>
            <div className="header-filter tl br3 center" style={this.state.filterStyle}>
                    <span className="f4 pointer"><SearchOutlined /></span>
                    <input value={Searchinput} onChange={e => this.onSearchchange(e)} className="ml2 black" style={this.state.filterBoxstyle} type="text" placeholder={'search on palscheck'} />
                </div>
                {
                   searchVisible === true && Searchinput.length>0?
                    <div className="bg-white br2 db center searchbar tc pa2">
                        <div className="tr b f3 black pointer"
                        onClick={this.closeSearch}
                        >&times;</div>
                    <Tabs defaultActiveKey="1" >
                        <TabPane tab="People" key="1">
                            <UsersResult result={filterSearch} isLoggedIn={this.state.isLoggedIn}/>
    </TabPane>
                        <TabPane tab="Pages" key="2">
                            <Pageresult result={filterPages}/>
    </TabPane>
                       
                    </Tabs>
                </div>
                    :null
                }
               
            </>
        )
    }
}
export default SearchField