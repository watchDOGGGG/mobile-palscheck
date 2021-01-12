import React,{useState,useEffect} from 'react'
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import '../../Layout/layout.css'
import SuggestionList from './suggestionList'
import { Divider } from 'antd';
import {UserSwitchOutlined} from '@ant-design/icons';
import io from 'socket.io-client'

const Socket = io.connect('https://still-cover-backend.uc.r.appspot.com')
// const Socket = io.connect('http://localhost:4000')
class Suggestions extends React.Component{
    constructor(){
        super()
        this.state = {
            suggestion:[],//if they follow a user the return value of other users will be stored to this state
            suggestionFirstTime:[]//this holds the suggestions of users if the user hasn't follow any one yet
        }
    }


    render(){
        Socket.on('foundUsers',(data)=>{
            this.setState({suggestion:data})
        })
        Socket.on('foundSuggestions',(data)=>{
            this.setState({suggestionFirstTime:data})
        })
        const {following,loggedIn} = this.props

        if (this.props.following.length > 0) {
            Socket.emit('myfollowers', following, loggedIn)  
        }
        Socket.emit('suggestFollowers', loggedIn)

        const {suggestion,suggestionFirstTime} = this.state
        return(
            <article class="suggestion-card">
                <Divider orientation="left"><span className="gray tl">You should follow</span>&nbsp;<span className="tr"><UserSwitchOutlined /></span></Divider>
                <div className="card-container">
                    <div class="card__collection clear-fix ba b--black-10">
                        {
                            suggestion.length > 0 ?
                                suggestion.map((users, i) => {
                                    return (
                                        <SuggestionList 
                                        key={i}
                                        name={suggestion[i].fullname}
                                        id={suggestion[i]._id}
                                        username={suggestion[i].username}
                                        profileimg = {suggestion[i].profileimg}
                                        />
                                    )
                                })
                                : suggestion.length < 1?
                                suggestionFirstTime.map((users, i) => {
                                    return (
                                        <SuggestionList 
                                        key={i}
                                        name={suggestionFirstTime[i].fullname}
                                        id={suggestionFirstTime[i]._id}
                                        username={suggestionFirstTime[i].username}
                                        profileimg = {suggestionFirstTime[i].profileimg}
                                        />
                                    )
                                })
                                :null
                        }
                    </div>
                </div>
            </article>
        )
    }
}
export default Suggestions