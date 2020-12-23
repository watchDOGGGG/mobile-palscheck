import React, { createElement} from 'react';
import { Comment, Tooltip, Avatar, Upload, Modal,message } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled,SmileFilled,CameraOutlined,
  SendOutlined} from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import ContentEditable from 'react-contenteditable'
class ParentComment extends React.Component{
    constructor(){
        super()
        this.state = {
            likes: 0,
            dislikes:0,
            action:null,
            replyRoute:false,
            html:'',
            emojiVisbility:false,
            commentTxt:[],
            Allcomments:[]
        }
    }

    componentDidUpdate(){
        
      setInterval(() => {
        this.getAllcomment()
      }, 4000)
    }
     like = () => {
       this.setState({likes:1});
       this.setState({dislikes:0});
       this.setState({action:'liked'});
      };
    
       dislike = () => {
        this.setState({likes:0});
       this.setState({dislikes:1});
       this.setState({action:'disliked'});
      };
    
       reply_Route=(route)=>{
        this.setState({replyRoute:route});
      }
    
     //setting Emoji
       handleTxtChange = evt => {
        this.setState({html:evt.target.value});
      };
    
      
    
       setEmojiVisible = () => {
        this.state.emojiVisbility === false?
        this.setState({emojiVisbility:true}):
        this.setState({emojiVisbility:false})
      } 
     
      seTemoji = (evt) => {
        this.setState({html:this.state.html + evt.native} );
      }
      seTemojiOut = ()=>{
        this.setState({emojiVisbility:false})
      }
      //post comments
       PostComment = async()=>{
        const post_C = await fetch('http://still-cove-26148.herokuapp.com/Feed/commentFeed',{
          method:'POST',
          headers:{"Content-Type":"application/json",token:localStorage.token},
          body:JSON.stringify({
            to:this.props.feed_by,
            txt:this.state.html,
            feed_id:this.props.feed_id
          })
        })
        const response = await post_C.json()
        if(response.comments){
          this.setState({html:''})
          this.setState({commentTxt:'posted....'})
        }
      }

       getAllcomment = async()=>{
        const fetchAll = await fetch(`http://still-cove-26148.herokuapp.com/Feed/getAllcomments/${this.props.feed_id}`)
        const response = await fetchAll.json()
        if(response.comments){
          this.setState({Allcomments:response.comments})
        }
      }

    render(){
       const actions = [
            <Tooltip key="comment-basic-like" title="Like">
              <span onClick={this.like} className="b tl">
                {React.createElement(this.state.action === 'liked' ? LikeFilled : LikeOutlined)}
                <span className="comment-action b">{this.state.likes}</span>
              </span>
            </Tooltip>,
            <Tooltip key="comment-basic-dislike" title="Dislike">
              <span onClick={this.dislike}>
                {React.createElement(this.state.action === 'disliked' ? DislikeFilled : DislikeOutlined)}
                <span className="comment-action tl">{this.state.dislikes}</span>
              </span>
            </Tooltip>,
             <span key="comment-basic-reply-to" className="f6" onClick={()=>this.reply_Route(true)}>Reply to</span>,
              <>
                {
                this.state.replyRoute === false?
                null:
                 <>
                 <span className="commentIn flex ba b--black-10 mt2 pa1">
                  <span className ="dib f4 gray blue"><SendOutlined /></span>
                </span>
                 <span key="comment-basic-reply-to" className="f6" onClick={()=>this.reply_Route(false)}>cancel</span>
                 </>
              }
              </>
              ,
          ];
        return (
            <div>
              <div className="commentIn flex br4 bb b--black-10 mt2 pa1">
              
              <ContentEditable
                    html={this.state.html} // innerHTML of the editable div
                    disabled={false}       // use true to disable editing
                    onChange={this.handleTxtChange} // handle innerHTML change
                    tagName='article' // Use a custom HTML tag (uses a div by default)
                    data-placeholder="write comment here..."
                    id="l557r_Commentbox"
                    spellcheck="true"
                    className="w-80 tl ml2 mt1 f5 textarea_13l"
                    />
                    <Tooltip title="Emojis">
                  <span className="dib ml3 f4 blue"><SmileFilled onClick={()=>this.setEmojiVisible()}/></span>
                  </Tooltip>
                    {
                    this.state.emojiVisbility === false?
                            null : 
                   <Picker 
                    onSelect={this.seTemoji} 
                    theme="dark" 
                    set='google'
                      style={{ position: '', left: '20px',zIndex:99 }} 
                      title='Pick your emoji…' 
                      emoji='point_up' i18n={{ search: 'search...', categories: { search: 'search emojis', recent: 'Recent' } }} 
                      size={34}
                      />
               }
              <Tooltip title="send">
                {
                  this.state.html.length > 0?
                  <span className="dib ml3 f6 pointer blue lh-copy mt1 b" onClick={this.PostComment}>post</span>
                  :
                  <span className="dib ml3 f6 pointer blue lh-copy mt1 b" disabled>post</span>
                }
                  </Tooltip>
                </div>
                <p>{this.state.commentTxt}</p>
              {
                this.state.Allcomments.map((comment,i)=>{
                  return (
                    <Comment
                      actions={actions}
                      author={<a>{comment.name}</a>}
                      avatar={
                        <Avatar
                          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                          alt="palscheck"
                        />
                      }
                      content={
                        <p className="tl ">
                          {comment.comment_txt}
                        </p>
                      }
                      datetime={
                        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                          <span>{moment().fromNow()}</span>
                        </Tooltip>
                      }
                    >
                      {/* <ChildComment /> */}
                    </Comment>
                  )
                })
              }
              
            </div>
            
          );
    }
}
export default ParentComment