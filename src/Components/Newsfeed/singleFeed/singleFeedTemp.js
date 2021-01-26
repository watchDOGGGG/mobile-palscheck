import React from 'react'
import { Carousel, Avatar,Image,Menu, Dropdown } from 'antd';
import '../newsfeed.css'
import { Row, Col } from 'antd';
import {ShareAltOutlined,EllipsisOutlined,CheckCircleFilled} from '@ant-design/icons';
import Comment from '../Comment/Comments.jsx'
import Reaction from '../Reaction/reaction.jsx'
import BookMarkbtn from '../Bookmark/bookmarkbtn.jsx'
import Talkbtn from '../../Talks/TalkStack/joinTalk.jsx'
import RandomString from 'randomstring'

const Randstring  = RandomString.generate({
  length:50
})
const localLink = 'localhost:4000'
const SeverLink = 'https://still-cover-backend.uc.r.appspot.com'

const style = { background: '', padding: '8px 0' };
class SingleFeedTemp extends React.Component {
  state = {
    contentStyle:{
      maxHeight: '250px',
      color: '#fff',
      lineHeight: '160px',
      textAlign: 'center',
      background: '#364d79',
    },
    UserDetails: [],
    feed: [],
    errorpage: '',
    feedMedia:[],
    PageDetails:[]
  };
  componentDidMount(){
    this.GetSinglePost()
    this.Feedmedia()

  }
componentDidUpdate(){
  this.UserDetails()
  if(this.state.feed.feedType === 'pageFeed'){
    this.pageData()
  }
  
}
  GetSinglePost = async()=>{
    const FetchData = await fetch(`${SeverLink}/Feed/single/${this.props.address}`)
    const response = await FetchData.json()
    if(response.result){
      this.setState({feed:response.result})
    }else{
      this.setState({errorpage:'not found'})
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
  //GEt all user additional info
  UserDetails = async()=>{
    const FetchAllDetails = await fetch(`${SeverLink}/Authentication/by_id/${this.state.feed.feedby}`)
    const response = await FetchAllDetails.json()
    if(response.profiler){
      this.setState({UserDetails:response.profiler})
    }
  }
   //GEt feedMedia
   Feedmedia = async()=>{
    const FetchAllMedia = await fetch(`${SeverLink}/Feed/${this.props.address}`)
    const response = await FetchAllMedia.json()
    if(response.results){
      this.setState({feedMedia:response.results})
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
  
    if (seconds === 0) {
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
  render() {
    
    return (
          <>
          {
            this.state.feed.length < 1?
            <p>loading..</p>
            :
            this.state.feed.feedType === 'palsfeed'?
<div className="feed-content mt4">
                  {/* profile image */}
                  
                     <Avatar src={this.state.UserDetails.profileimg} style={{float:'left',marginRight:'15px'}}size={40}/>
                   
                    <div className="right-side pa2"> 
                    {/* profile name */}
                    <div className="tl">
                      <a href={`/${this.state.UserDetails.username}.pal`}><span className="ttc fw6 feedname ">{this.state.UserDetails.fullname}</span></a>
                      {
                        this.state.UserDetails.verified === 1?
                        <span className="blue ml2"><CheckCircleFilled /></span>
                        :null
                      }
                      
                        <span className="gray ml1 f6">@{this.state.UserDetails.username}</span>
                        {/* time */}
                    
                        <span className="feedtime">{this.time_ago(new Date(this.state.feed.date))}</span>
                        
                    </div>
                       {/* content text */}
                       <div className="tl mt3">
                       {
                       this.state.feed.feedTxt? <p className="feedtxt br3 ba b--black-10 pa2 ">{this.state.feed.feedTxt}</p>:null
                          }
                      
                        {/* content image */}
                        <div className="feed-images pointer">
                          
                        <Carousel autoplay>
                        
                              {
                                this.state.feedMedia.length !== 0?
                                this.state.feedMedia.map((element,i)=>{
                                  return(
                                    
                                    <Image
                                    style={this.state.contentStyle}
                                    src={element.url}
                                    />
                                  )
                                }):null
                              }
                               
                        </Carousel>
                        </div>
                       </div>
                        {/* comment like icon */} 
                        <div className="commetLike mt4">
                        <Row gutter={16}>
                            <Col className="gutter-row f4 feed-c-i pointer" span={6}>
                            <Reaction
                                feed_id={this.props.address}
                                feed_by={this.state.feed.feedby}
                                />
                            </Col>
                            <Col className="gutter-row f4 feed-c-i pointer" span={6}>
                            <Talkbtn
                              feed_id={this.props.address}
                              feed_by={this.state.feed.feedby}
                              title= {this.state.feed.feedTxt.length > 0?this.state.feed.feedTxt: Randstring}
                              />
                            </Col>
                            <Col className="gutter-row f4 feed-c-i pointer" span={6}>
                              <BookMarkbtn
                                feed_id={this.props.address}
                                feed_by={this.state.feed.feedby}
                                />
                            </Col>
                        </Row>
                        </div>
                        {/* comments */}
                        <div className="ba b--black-10 mt2 pa2">
                          <Comment
                          feed_id={this.props.address}
                          feed_by={this.state.feed.feedby}
                          />
                        </div>
                </div>
                </div>
            :this.state.feed.feedType === 'pageFeed'?
            <div className="feed-content mt4">
                  {/* profile image */}
                  
                     <Avatar src={this.state.PageDetails.profileImg} style={{float:'left',marginRight:'15px'}}size={40}/>
                   
                    <div className="right-side pa2"> 
                    {/* profile name */}
                    <div className="tl">
                    <a href={`/${this.state.PageDetails.address}.page`}><span className="ttc fw6 feedname black"><span className="gray ml1 f6"># </span>{this.state.PageDetails.name}</span></a>
               
                        {/* time */}
                     
                        <span className="feedtime">{this.time_ago(new Date(this.state.feed.date))}</span>
                        
                    </div>
                       {/* content text */}
                       <div className="tl mt3">
                       <p className="feedtxt">{this.state.feed.feedTxt}</p>
          {
                       this.state.feed.feedTxt? <p className="feedtxt br3 ba b--black-10 pa2 ">{this.state.feed.feedTxt}</p>:null
                          }
                        {/* content image */}
                        <div className="feed-images pointer">
                          
                        <Carousel autoplay>
                              {
                                this.state.feedMedia.length !== 0?
                                this.state.feedMedia.map((element,i)=>{
                                  return(
                                    <Image
                                    style={this.state.contentStyle}
                                    src={element.url}
                                    />
                                  )
                                }):null
                              }
                        </Carousel>
                        </div>
                       </div>
                        {/* comment like icon */} 
                        <div className="commetLike mt4">
                        <Row gutter={16}>
                            <Col className="gutter-row f4 feed-c-i pointer" span={6}>
                            <Reaction
                                feed_id={this.props.address}
                                feed_by={this.state.feed.feedby}
                                />
                            </Col>
                            <Col className="gutter-row f4 feed-c-i pointer" span={6}>
                            <Talkbtn
                              feed_id={this.props.address}
                              feed_by={this.state.feed.feedby}
                              title= {this.state.feed.feedTxt.length > 0?this.state.feed.feedTxt: Randstring}
                              />
                            </Col>
                            <Col className="gutter-row f4 feed-c-i pointer" span={6}>
                              <BookMarkbtn
                                feed_id={this.props.address}
                                feed_by={this.state.feed.feedby}
                                />
                            </Col>
                        </Row>
                        </div>
                        {/* comments */}
                        <div className="ba b--black-10 mt2 pa2 com3ts">
                          <Comment
                          feed_id={this.props.address}
                          feed_by={this.state.feed.feedby}
                          />
                        </div>
                </div>
                </div>
            :null
      
          }
          
          </>
    );
  }
}

export default SingleFeedTemp