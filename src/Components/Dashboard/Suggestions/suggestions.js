import React,{useState} from 'react'
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import '../../Layout/layout.css'
import SuggestionList from './suggestionList'
import { Divider } from 'antd';
import {UserSwitchOutlined} from '@ant-design/icons';
const Suggestions =()=>{
   
    return(
        <article class="suggestion-card mt3 center bg-white br3 pa3 pa4-ns b--black-10">
            <Divider orientation="left"><span className="gray tl">You should follow</span>&nbsp;<span className="tr"><UserSwitchOutlined /></span></Divider>
            <SuggestionList/>
        </article>
    )
}
export default Suggestions