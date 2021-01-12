import React from 'react'
import ContentEditable from 'react-contenteditable'
import {SendOutlined} from '@ant-design/icons';
import io from 'socket.io-client'

const localLink = 'http://localhost:4000'
const SeverLink = 'https://still-cover-backend.uc.r.appspot.com'
const socket = io.connect('https://still-cover-backend.uc.r.appspot.com')
class TalkBox extends React.Component{

    constructor(){
        super()
        this.state = {
            html: "",
            error:'',
            isLoggedIn:[]
        }
    }
    componentDidMount() {
        try {
            this.getLoggedInUser()
        } catch (error) {
        }
    }


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
        socket.emit('talks',this.props.address,this.state.html,this.state.isLoggedIn)
        
        socket.on('success',data=>{
            this.setState({ html: '',error:''});
        })
        
    }

    render(){
       
        const {error} = this.state
        return(
           <>
            <div id="chat-container">
                <div className="chat-box center fixed bottom-0 w-100" >
                    <ContentEditable
            innerRef={this.contentEditable}
            html={this.state.html} // innerHTML of the editable div
            disabled={false}       // use true to disable editing
            onChange={this.handleTxtChange} // handle innerHTML change
            tagName='article' // Use a custom HTML tag (uses a div by default)
            data-placeholder="let's talk..."
            id="l557r_textarea"
            spellcheck="true"
            className="textarea_13l tl ml2 mt1 f5 bt b--black-10"
            />
            <div className="tr f3" title="send" >
            <SendOutlined onClick={this.sendMsg}/>
            <p className="red tl">{error}</p> 
            </div>
            </div>
                </div>
           </>
        )
    }
}
export default TalkBox