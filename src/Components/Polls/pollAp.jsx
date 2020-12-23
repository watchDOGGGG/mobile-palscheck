import React from 'react'
import PollCrd from './pollCrd.jsx'

class PollApp extends React.Component{
  constructor(){
    super()
    this.state = {
      polls:[],
    }
  }
  componentDidMount(){
    this.FetchUserPoll()
  }
   FetchUserPoll = async()=>{
    const fetchpoll = await fetch('https://still-cove-26148.herokuapp.com/Feed/poll/poll',{
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
                <PollCrd polls={this.state.polls} />
        </div>
    )
  }
}
export default PollApp