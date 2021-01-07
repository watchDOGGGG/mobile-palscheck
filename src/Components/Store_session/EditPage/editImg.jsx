import React from 'react'
import { Upload, Modal} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {Button} from 'antd';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const localLink = 'http://localhost:4000'
const SeverLink = 'https://still-cover-backend.uc.r.appspot.com'
class Avatar extends React.Component {
    constructor(){
        super()
      this.state = { 
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [],
        uploading: false,
        success: '',
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
    formData.set('Feedtype',this.state.postType)
    for (let i = 0; i < fileList.length; i++) {
      formData.append('files', fileList[i].originFileObj);
     } 
    
    this.setState({
      uploading: true,
    });

    const Sendpost = await fetch(`${SeverLink}/Page/editing/${this.props.address}`,{
      method:'PATCH',
      headers:{token:localStorage.token},
      body:formData
    })
    const response = await Sendpost.json()
    if(response.update){
      this.setState({uploading:false,fileList:[],success:'upload successfull'})
    }else{
      this.setState({error:'failed to upload '})
    }
    
  };

//end image processing and preview

  render() {
    //upload image btn
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
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
            <div className="db mt3">
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
                className="" 
              >
                {uploading ? 'Uploading' : 'upload profile-IMG'}
              </Button>:
              <Button
              type="primary"
              onClick={this.handleUpload}
              loading={uploading}
              style={{ marginTop: 16 }}
              className="" 
            >
              {uploading ? 'Uploading' : 'Start Upload'}
            </Button>
              }
                
            <Modal
            visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={this.handleCancel}
              >
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
            <span className="green">{this.state.success}</span>
            <span className="red">{this.state.error}</span>
            </div>
      </>
    );
  }
}

export default Avatar