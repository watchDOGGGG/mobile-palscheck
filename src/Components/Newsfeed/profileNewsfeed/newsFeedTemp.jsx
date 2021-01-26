import React from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import { Carousel,Tooltip,Avatar, Spin ,Menu, Dropdown,Image } from 'antd';
import '../newsfeed.css'
import { Row, Col } from 'antd';
import {LoadingOutlined,EllipsisOutlined,CheckCircleFilled} from '@ant-design/icons';
import Comments from '../Comment/Comments.jsx'
import Reaction from '../Reaction/reaction.jsx'
import BookMarkbtn from '../Bookmark/bookmarkbtn.jsx'
import Talkbtn from '../../Talks/TalkStack/joinTalk.jsx'
import DeleteFeed from '../deleteFeed'
import Followbtn from '../../Follow/followbtn'
import RandomString from 'randomstring'
import ReadMoreReact from 'read-more-react';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const Randstring  = RandomString.generate({
  length:50
})
const localLink = 'http://localhost:4000'
const SeverLink = 'https://still-cover-backend.uc.r.appspot.com'
const style = { background: '', padding: '8px 0' };
class NewsFeedTemp extends React.Component {
  state = {
    data: [],
    loading: false,
    hasMore: true,
    contentStyle:{
        maxHeight: '250px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
      background: '#364d79',
    },
      UserDetails:[],
      feedMedia:[]
  };

  componentDidMount() {
    this.UserDetails()
    this.Feedmedia()
  }

  //GEt all user additional info
  UserDetails = async()=>{
    const FetchAllDetails = await fetch(`${SeverLink}/Authentication/by_id/${this.props.feedby}`)
    const response = await FetchAllDetails.json()
    if(response.profiler){
      this.setState({UserDetails:response.profiler})
    }
  }
   //GEt feedMedia
   Feedmedia = async()=>{
    const FetchAllMedia = await fetch(`${SeverLink}/Feed/${this.props.id}`)
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
    const {feedby,loggedIn,id} = this.props
    const readMore = (
      <span class=" black-60 underline-hover pointer f6">
      see more...
    </span>
    )
    const menu = (
      <Menu>
        <Menu.Item key="0">
          {
            loggedIn !== feedby ?
              <Followbtn userid={feedby} followtype={'people'}/>
              : null
          }
          
        </Menu.Item>
        {/* <Menu.Item key="1">
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
            Edit post
          </a>
        </Menu.Item> */}
        
        <Menu.Item key="2">
        {
            loggedIn === feedby ?
            <DeleteFeed address={id} posteby={feedby}/>
              : null
          }
          
        </Menu.Item>
        {/* <Menu.Item key="3">
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
            Report content
          </a>
        </Menu.Item> */}
      </Menu>
    );
    return (
      <div className="demo-infinite-container">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.state.hasMore}
          useWindow={false}
        >
          <>
          <div className="feed-content mt4">
                
                    <div className="right-side pa2"> 
                   
                       {/* content text */}
                       <a className="">
                       <div className="tl mt3">
                     
                        {/* content image */}
                        <div className="feed-images pointer">
                          <Image.PreviewGroup>  
                               <Carousel>
                                 
                              {
                                this.state.feedMedia.length !== 0?
                                this.state.feedMedia.map((element,i)=>{
                                  return(
                                    <Image
                                      style={this.state.contentStyle}
                                      src={element.url}
                                  />
                                  )
                                }):<Spin indicator={antIcon} />
                              }
                        </Carousel>
                        </Image.PreviewGroup>
                        </div>
                        {
                            this.props.feedTxt? <p className="feedtxt pa2 "><ReadMoreReact text={this.props.feedTxt}
                            min={80}
                            ideal={90}
                            max={1000}
                            readMoreText={readMore} /></p>:null
                          }
                      
                       </div>
                       </a>
                       
                          {/* profile image */}
                  
                     <Avatar src={this.state.UserDetails.profileimg} style={{float:'left',marginRight:'15px'}}size={40}/>
                   {/* profile name */}
                   <div className="tl">
                      <a href={`${this.state.UserDetails.username}.pal`}><span className="ttc fw6 feedname ">{this.state.UserDetails.fullname}</span></a>
                      
                        {/* time */}
                        <Dropdown overlay={menu}>
                          <a onClick={e => e.preventDefault()} className="feedmenu b f3 ml3 ant-dropdown-link"><EllipsisOutlined /></a>
                        </Dropdown>
                        
                        <span className="feedtime">{this.time_ago(new Date(this.props.date))}</span>
                        
                    </div>
                        {/* comment like icon */} 
                        <div className="commetLike mt4">
                        <Row gutter={16}>
                            <Col className="gutter-row f3 feed-c-i pointer" span={6}>
                                <Reaction
                                feed_id={this.props.id}
                                feed_by={this.props.feedby}
                                />
                            </Col>
                            <Col className="gutter-row f3 feed-c-i pointer" span={6}>
                            <Talkbtn
                              feed_id={this.props.id}
                              feed_by={this.props.feedby}
                              title= {this.props.feedTxt.length > 0?this.props.feedTxt: Randstring}
                              />
                            </Col>
                            <Col className="gutter-row f3 feed-c-i pointer" span={6}>
                              <BookMarkbtn
                              feed_id={this.props.id}
                              feed_by={this.props.feedby}
                              />
                            </Col>
                        </Row>
                        </div>
                        {/* comments */}
                        <div className="ba b--black-10 mt2 pa2 com3ts">
                          <Comments 
                          feed_id={this.props.id}
                          feed_by={this.props.feedby}
                          />
                        </div>
                </div>
                </div>
            {this.state.loading && this.state.hasMore && (
              <div className="demo-loading-container">
                <Spin />
              </div>
            )}
          </>
        </InfiniteScroll>
      </div>
    );
  }
}

export default NewsFeedTemp