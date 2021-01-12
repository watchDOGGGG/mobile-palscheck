import React from 'react';
import { Modal} from 'antd';
import {
  VideoCameraAddOutlined
} from '@ant-design/icons';
import '../newsfeed.css'
import PostArea from './videopostArea.jsx'

  export default function SpeedDials() {

    const [visible,setVisible] = React.useState(false)
  
    const showModal = () => {
      setVisible(true);
    };
   
   
   
    const handleCancel = e => {
      setVisible(false);
    };
  const UpdatePostModal = (e)=>{
    setVisible(false)
  }

  
    return (
      <>
        <VideoCameraAddOutlined onClick={showModal}/>
        {/* palsfeed modal */}
        <Modal
          visible={visible}
          title="Upload video"
          onCancel={handleCancel}
          footer={[
            
          ]}
        >
          <PostArea UpdatePostModal={UpdatePostModal}/>
        </Modal>
      </>
    );
  }

