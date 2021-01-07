import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import React from 'react'

const localLink = 'http://localhost:4000'
const SeverLink = 'https://still-cover-backend.uc.r.appspot.com'
const DeleteFeed = ({address,posteby}) =>{
    console.log({address:address,posteby:posteby})
    const confirm = () =>{
  Modal.confirm({
    title: 'Confirm',
    icon: <ExclamationCircleOutlined />,
    content: 'you are about to delete this feed!',
    okText: <span onClick={Del}>Delete</span>,
    cancelText: 'Cancel',
  });
}
const Del = async()=>{
    const DeleteUserFeed = await fetch(`${SeverLink}/Feed/DeletePost/${address}/${posteby}`,{
        headers:{token:localStorage.token}
    })
    const result = await DeleteUserFeed.json()
    if(result.deleted){
        window.location.href="https://palscheck.com"
    }
   
}
return(
  <Space>
    <Button onClick={confirm}>Delete</Button>
  </Space>
);
}


export default DeleteFeed