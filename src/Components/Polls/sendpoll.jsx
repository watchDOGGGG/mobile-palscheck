import React from 'react'
import { Modal, Button } from 'antd';
import {BorderlessTableOutlined } from '@ant-design/icons';

class Poll extends React.Component {
  state = {
    loading: false,
    visible: false,
    html: "",
    charLimit: 50
  };
  handleTxtChange = evt => {
    this.setState({ html: evt.target.value });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  Sendpoll = async()=>{
      const sendpoll = await fetch('https://still-cover-backend.uc.r.appspot.com/Feed/post/poll',{
          method:'POST',
          headers:{"Content-Type":"application/json",token:localStorage.token},
          body: JSON.stringify({
              txt:this.state.html,
              to:this.props.userid
          })
      })
      const res = await sendpoll.json()
      if(res.success){
          this.setState({loading:false,visible:false})
      }
  }
  render() {
    const { visible} = this.state;
    return (
      <>
      <span className=" f6 pointer f-name" onClick={this.showModal}>
        <BorderlessTableOutlined />
        <span className="db">send poll</span>
        </span>
        <Modal
          visible={visible}
          title={`send Poll to ${this.props.username}`}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
              this.state.html.length>1?
            <Button key="send" className="w-50" onClick={this.Sendpoll}>
              send
            </Button>:
            <Button key="send" className="w-50" disabled>
            send
          </Button>
          ]}
        >
          <input
          onChange={this.handleTxtChange}
          value={this.state.html}
          type="text" maxLength="50" className="w-100 f4 h3 pa2" spellCheck={true}
          onChange={this.handleTxtChange}
          placeholder="write poll here......"
          id="l557r_textarea"
          />
          <span className="f4 gray">Remaining Characters: {this.state.charLimit - this.state.html.length}</span>
        </Modal>
      </>
    );
  }
}

export default Poll