import React from 'react'
import { Modal, Button } from 'antd';
import Form from './form.jsx'

class Createpage extends React.Component {
    state = {
        loading: false,
        visible: false,
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
    
      render() {
        const { visible} = this.state;
        return (
          <>
            <div className="fixed crePlb3 center tc">
            <Button type="primary" onClick={this.showModal}>
             Create Page
            </Button>
            </div>
            <Modal
              visible={visible}
              title="Create your page"
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={[ ]}
            >
              <Form/>
            </Modal>
          </>
        );
      }
    }

export default Createpage