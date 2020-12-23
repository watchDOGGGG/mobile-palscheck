import React,{useState} from 'react'
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import '../../Layout/layout.css'
import TrendingList from './trendingList'
import { Divider } from 'antd';
import {RedoOutlined} from '@ant-design/icons';

const Trendings =()=>{
   
    return(
        <article className="center bg-white br3 pa3 pa4-ns b--black-10 mt3">
            <Divider orientation="left"><span className="gray tl">Trending for you</span>&nbsp;<span className="tr"><RedoOutlined /></span></Divider>
            <TrendingList/>
            
        </article>
    )
}
export default Trendings