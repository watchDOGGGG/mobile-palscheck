import {Avatar} from 'antd';
import React from 'react'
import TalkBox from './talkbox.jsx'
import TalkCard from './talkCrd.jsx'

const localLink = 'localhost:4000'
const SeverLink = 'https://still-cover-backend.uc.r.appspot.com'
class Talks extends React.Component{
    constructor(){
        super()
        this.state = {
            userID:[],
            talks:[],
            feedMedia:[],
            feed: [],
            UserDetails:[],
            PageDetails:[],
            isLoggedIn:[]

        }
    }
    componentDidMount(){
        try {
          this.getLoggedInUser()
          this.setUserDT()
        this.Feedmedia()
        this.getPostDT()
        setInterval(() => {
         this.fetchChats() 
        }, 500);
        } catch (error) {
          
        }

    }
    componentDidUpdate(){
        try {
      if(this.state.feed.feedType === 'pageFeed'){
        this.pageData()
      }else{
        this.UserDetails()
      }
        } catch (error) {
          
        }
    }

       //getLoggedInuser
       getLoggedInUser = async()=>{
        const getLogginUser = await fetch(`${SeverLink}/Authentication/User/LoggedIn`,{
            headers:{token:localStorage.token}
        })
        const response = await getLogginUser.json()
        this.setState({isLoggedIn:response.loggedIn})
    }

      //GEt all user additional info
  UserDetails = async()=>{
    const FetchAllDetails = await fetch(`${SeverLink}/Authentication/by_id/${this.state.feed.feedby}`)
    const response = await FetchAllDetails.json()
    if(response.profiler){
      this.setState({UserDetails:response.profiler})
    }
  }
    //GEt all data info for page post
    pageData = async()=>{
      const FetchAllDetails = await fetch(`${SeverLink}/Page/getD/${this.state.feed.feedby}`)
      const response = await FetchAllDetails.json()
      if(response.data){
        this.setState({PageDetails:response.data})
      }
    }
    fetchChats = async()=>{
      const fetchtalks = await fetch(`${SeverLink}/Talk/${this.props.match.params.id}`)
      const response = await fetchtalks.json()
      if(response.result){
          this.setState({talks:response.result})
      }
    }
    setUserDT = async()=>{
        const setid = await fetch('${SeverLink}/Authentication/',{
            headers:{token:localStorage.token},
        })
        const response = await setid.json()
        if(response){
            this.setState({userID:response})
        }
    }
      //GEt feedMedia
   Feedmedia = async()=>{
    const FetchAllMedia = await fetch(`${SeverLink}/Feed/${this.props.match.params.id}`)
    const response = await FetchAllMedia.json()
    if(response.results){
      this.setState({feedMedia:response.results})
    }
  }
  getPostDT = async()=>{
    const FetchData = await fetch(`${SeverLink}/Feed/single/${this.props.match.params.id}`)
    const response = await FetchData.json()
    if(response.result){
      this.setState({feed:response.result})
    }
  }
    // convey Time Frame
    time_ago = (time) =>{

        switch (typeof time) {
          case 'number':
            break;
          case 'string':
            time = +new Date(time);
            break;
          case 'object':
            if (time.constructor === Date) time = time.getTime();
            break;
          default:
            time = +new Date();
        }
        var time_formats = [
          [60, 'seconds', 1], // 60
          [120, '1 minute ago', '1 minute from now'], // 60*2
          [3600, 'minutes', 60], // 60*60, 60
          [7200, '1 hour ago', '1 hour from now'], // 60*60*2
          [86400, 'hours', 3600], // 60*60*24, 60*60
          [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
          [604800, 'days', 86400], // 60*60*24*7, 60*60*24
          [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
          [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
          [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
          [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
          [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
          [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
          [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
          [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
        ];
        var seconds = (+new Date() - time) / 1000,
          token = 'ago',
          list_choice = 1;
      
        if (seconds == 0) {
          return 'Just now'
        }
        if (seconds < 0) {
          seconds = Math.abs(seconds);
          token = 'from now';
          list_choice = 2;
        }
        var i = 0,
          format;
        while (format = time_formats[i++])
          if (seconds < format[0]) {
            if (typeof format[2] == 'string')
              return format[list_choice];
            else
              return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
          }
        return time;
      }
    render(){
        const {isLoggedIn,PageDetails} = this.state
  
        return(
            
            <div className="w-100 center newfeed--3-art talkq3e">
                <div className="">
                  
                {/* info detail */}
                {/* <div className="w-100 db b--black-10">
                    {
                        this.state.feed.feedType === 'palsfeed'?
                        <>
                        <div className="flex pa2">
                        
                          <Avatar src={ this.state.UserDetails.profileimg} style={{float:'left',marginRight:'15px'}}size={40}/>
                        
                             <a href={`${this.state.UserDetails.username}.pal`}><span className="ttc fw6 feedname">{this.state.UserDetails.fullname}</span></a>
                     <span className="gray ml1 f6">@{this.state.UserDetails.username}</span>
                          </div>   
                         <h3 className="ttc tl ml3 mr3 w-70 f6">{this.state.feed.feedTxt}</h3>
                         
                        <div className=" flex flex-wrap">
                        {
                             this.state.feedMedia.length > 0?
                             this.state.feedMedia.map((media,i)=>{
                                 return(
                                     <div className="w-40 pa3 mr2">
                                         <img src={media.url} className=""/>
                                     </div>
                                 )
                             })
                             :<p>No media file</p>
                         }
                         
                        </div>
                        </>
                   :this.state.feed.feedType === 'pageFeed'?
                   <>
                   <div className="flex pa2">
                   {
                    PageDetails.profileImg?
                     <Avatar src={PageDetails.profileImg} style={{float:'left',marginRight:'15px'}}size={40}/>
                    :null
                  }
                        <a href={`${PageDetails.address}.page`}><span className="ttc fw6 feedname"><span className="gray ml1 f6"># </span>{PageDetails.name}</span></a>
                        <span className="feedtime ml3 f6">{this.time_ago(new Date(this.state.feed.date))}</span>
                     </div>   
                    <h3 className="ttc tl ml3 mr3 w-70 f6">{this.state.feed.feedTxt}</h3>
                    
                   <div className=" flex flex-wrap">
                   {
                        this.state.feedMedia.length > 0?
                        this.state.feedMedia.map((media,i)=>{
                            return(
                                <div className="w-40 pa3 mr2">
                                    <img src={media.url} className=""/>
                                </div>
                            )
                        })
                        :<p>No media file</p>
                    }
                    
                   </div>
                   </>
                   :null
                    }
                </div> */}
                  {/* chat area */}
                  <div style={{marginBottom:'20%',height: "100vh",overflowY: 'scroll'}} className=" db w-100 b--black-10">
                    {
                        this.state.talks.length > 0?
                         <TalkCard talks = {this.state.talks} isLoggedIn={isLoggedIn}/>
                        :
                        <p>No talks on this</p>
                    }
                   
                </div>
                </div>
                {/* chatbox */}
                <TalkBox
                userIDT = {this.state.userID.id}
                address = {this.props.match.params.id}
                fullname = {this.state.userID.fullname}
                profileIMG = {this.state.userID.profileimg}
                />
            </div>
        )
    }
}
export default Talks