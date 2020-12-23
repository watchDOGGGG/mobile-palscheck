import React from 'react'
import ContentEditable from 'react-contenteditable'
import {SendOutlined} from '@ant-design/icons';

class TalkBox extends React.Component{

    constructor(){
        super()
        this.state = {
            html: "",
            error:'',
        }
    }
    
    handleTxtChange = evt => {
        this.setState({ html: evt.target.value });
      };
      sendMsg = async()=>{
        
        const sendMesg = await fetch(`https://still-cove-26148.herokuapp.com/Talk/${this.props.address}`,{
            method:'POST',
            headers:{"Content-Type":"application/json",token:localStorage.token},
            body: JSON.stringify({
                txt:this.state.html
            })
        })
        const response = await sendMesg.json()
        if(response.error){
            this.setState({error:'failed check your internet connection'})
        }else{
            this.setState({ html: ''});
        }
    }
    render(){
        const {error} = this.state
        return(
           <>
            <div id="chat-container">
                <div className="center fixed bottom-0" style={{width:'35%'}}>
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