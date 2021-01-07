import React from 'react'
import {BorderlessTableOutlined} from '@ant-design/icons';
import { Tabs } from 'antd';
import FeedbackCrd from './Feedbacks/feedbackCrd'
import PollApp from './pollAp.jsx'
const { TabPane } = Tabs;
class Polls extends React.Component{
  constructor(){
    super()
    this.state = {
      polls:[],
      feedback:[]
    }
  }
  componentDidMount(){
    this.FetchUserPoll()
    this.getAllFeedback()
  }
  getAllFeedback = async()=>{
    const fetchAll = await fetch('https://still-cover-backend.uc.r.appspot.com/Feed/getFeedback/poll',{
        headers:{token:localStorage.token}
    })
    const response = await fetchAll.json()
    if(response.feedback){
      this.setState({feedback:response.feedback})
    }
}
   FetchUserPoll = async()=>{
    const fetchpoll = await fetch('https://still-cover-backend.uc.r.appspot.com/Feed/poll/poll',{
      headers:{token:localStorage.token}
    })
    const response = await fetchpoll.json()
   
    if(response.polls){
      this.setState({polls:response.polls})
    }
  }
    render(){
        return(
            <div>
            <span class="heading mt5 f3 tc"><BorderlessTableOutlined /> Polls</span>

            <Tabs defaultActiveKey="1" centered>
              <TabPane tab="your polls" key="1">
                <PollApp />
              </TabPane>
              <TabPane tab="feedbacks" key="2">
               <FeedbackCrd feedback={this.state.feedback}/>
    </TabPane>
            </Tabs>
        </div>
    )
  }
}
export default Polls