import React from 'react'
import TalkCrd from './talkCrd.jsx'

class TalkStack extends React.Component{
    constructor(){
        super()
        this.state = {
            allTalks:[]
        }
    }

    componentDidMount(){
        this.GEtAllTalks()
    }

    GEtAllTalks = async()=>{
        const fetchAll = await fetch('https://still-cover-backend.uc.r.appspot.com/Talk/',{
            headers:{token:localStorage.token}
        })
        const response = await fetchAll.json()
        if(response.talks){
            this.setState({allTalks:response.talks})
        }
    }
    render(){
        return(
            <div className="newfeed--3-art br3 center">
               {
                   this.state.allTalks.length > 0?
                   <TalkCrd allTalk = {this.state.allTalks}/>
                   :
                   <>
                   <p>No active Talks yet</p>
                   </>
               }
            </div>
        )
    }
}
export default TalkStack