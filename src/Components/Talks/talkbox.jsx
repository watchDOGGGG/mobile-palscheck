import React from 'react'
import { Popover, Button } from 'antd';
import {SmileFilled,SendOutlined} from '@ant-design/icons';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
const localLink = 'http://localhost:4000'
const SeverLink = 'https://still-cover-backend.uc.r.appspot.com'
class TalkBox extends React.Component{

    constructor(){
        super()
        this.state = {
            visible: false,
            html: "",
            error:'',
            isLoggedIn:[],
        }
    }
    componentDidMount() {
        try {
            this.getLoggedInUser()
        } catch (error) {
        }
    }

    hide = () => {
        this.setState({
          visible: false,
        });
      };
    
      handleVisibleChange = visible => {
        this.setState({ visible });
      };

    getLoggedInUser = async()=>{
        const getLogginUser = await fetch(`${SeverLink}/Authentication/User/LoggedIn`,{
            headers:{token:localStorage.token}
        })
        const response = await getLogginUser.json()
        this.setState({isLoggedIn:response.loggedIn})
    }

    handleTxtChange = evt => {
        this.setState({ html: evt.target.value });
      };
      
      sendMsg = async()=>{
        let txttone = new Audio(`https://storage.googleapis.com/still-cover/developersFolder/iphone_msg_sent.mp3`)
        this.setState({ html: '',error:''});
        const SendTxt = await fetch(`${SeverLink}/Talk/insertChat`,{
            
            method: 'POST',
            headers:{"Content-Type":"application/json",token:localStorage.token},
            body: JSON.stringify({
                txt:this.state.html,
                address:this.props.address
            })
        })
        const response = await SendTxt.json()
        if(response.msg){
            this.setState({ html: '',error:''});
            txttone.play()
        }
    }

     //setting Emoji
     handleTxtChange = evt => {
        this.setState({html:evt.target.value});
      };
    
      seTemoji = (evt) => {
        this.setState({html:this.state.html + evt.native} );
      }
      seTemojiOut = ()=>{
        this.setState({emojiVisbility:false})
      }
    render(){
       
        const {error,loading,html} = this.state
        return(
           <>
                <div className="chatare3_p chat-box center fixed bottom-0 w-100 pa2">
                    <div className="dib w-80">
                        <input onChange={this.handleTxtChange} value={html} type="text" placeholder="type something here..." className="w-90 br3" />
                    </div>
                    <div className="emojipop dib mr2">
                        <Popover
                            content={
                                <Picker
                                    onSelect={this.seTemoji}
                                    theme="dark"
                                    set='google'
                                    title='Pick your emoji…'
                                    emoji='point_up' i18n={{ search: 'search...', categories: { search: 'search emojis', recent: 'Recent' } }}
                                    size={34}
                                />}
                            trigger="click"
                            visible={this.state.visible}
                            onVisibleChange={this.handleVisibleChange}
                            
                        >
                            <span className="dib ml3 f4 blue"><SmileFilled /></span>
                        </Popover>
                    </div>

                    <div className="dib">
                        <button onClick={this.sendMsg}><SendOutlined /></button>
                    </div>

                </div>
            </>
        )
    }
}
export default TalkBox