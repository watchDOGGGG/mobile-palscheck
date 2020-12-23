import React from 'react'
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {Button} from 'antd';

const localLink = 'http://localhost:4000'
const SeverLink = 'https://still-cove-26148.herokuapp.com'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}


class Avatar extends React.Component {
    constructor(){
        super()
      this.state = { 
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [],
        uploading: false,
        msg:'',
        error:''
      };
    }
  

  //image processing and preview
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };
  handleChange = ({ fileList }) => {this.setState({ fileList })
  };

  handleUpload = async() => {
    const { fileList } = this.state;
    const formData = new FormData();
    formData.set('txt',this.state.html)
    for (let i = 0; i < fileList.length; i++) {
      formData.append('files', fileList[i].originFileObj);
     } 
    
    this.setState({
      uploading: true,
    });

    const Sendpost = await fetch(`${SeverLink}/Authentication/`,{
      method:'PATCH',
      headers:{token:localStorage.token},
      body:formData
    })
    const response = await Sendpost.json()
    if(response.update){
      this.setState({uploading:false,fileList:[],msg:response.update,error:''})
    }else{
      this.setState({msg:'',error:response.update})
    }
    
  };

//end image processing and preview

  render() {
    //upload image btn
    const { previewVisible, previewImage, fileList, previewTitle,error,msg } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    const { uploading } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };
    return (
      <>
            {/* image area */}
            <div className="db">
              <Upload
                {...props}
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
                >
                {fileList.length >= 1 ? null : uploadButton}
                </Upload>

                {fileList.length === 0 ?
                <Button
                type="primary"
                disabled
                onClick={this.handleUpload}
                loading={uploading}
                style={{ marginTop: 16 }}
                size="small" 
              >
                {uploading ? 'Uploading' : 'upload profile-IMG'}
              </Button>:
              <Button
              type="primary"
              onClick={this.handleUpload}
              loading={uploading}
              style={{ marginTop: 16 }}
              size="small" 
            >
              {uploading ? 'Uploading' : 'Start Upload'}
            </Button>
              }
                 <span className="db green">
                  {msg}
                </span>
                <span className="db red">
                  {error}
                </span>
            <Modal
            visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={this.handleCancel}
              >
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
            </div>
      </>
    );
  }
}

export default Avatar