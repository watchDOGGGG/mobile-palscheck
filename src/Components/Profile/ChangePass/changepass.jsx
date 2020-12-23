import React from 'react'
import { useState } from 'react';
import { Modal, Button } from 'antd';
import Newpassword from './Newpassword.jsx'

const Changepassword = ()=>{

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
    return(
        <div>
            <div className="">
                <Button onClick={showModal}>
        Change password
      </Button>
            </div>
 
      <Modal
        title="Password security"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Newpassword/>
      </Modal>
        </div>
    )
}
export default Changepassword