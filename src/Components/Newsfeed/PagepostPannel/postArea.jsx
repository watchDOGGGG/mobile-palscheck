import React from 'react'
import {
  SmileFilled,InfoCircleOutlined
} from '@ant-design/icons';
import { Upload, Modal} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import ContentEditable from 'react-contenteditable'
import {Tooltip,Button,Select} from 'antd';

const { Option } = Select;
const text = <span>please palscheck expect you to make content description easy for users therefore 
  every post made on the page should have atleast 3 image of same content to clearly describe the content!
</span>;

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

class PostArea extends React.Component {
    constructor(){
        super()
      this.state = { 
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [],
        uploading: false,
        emojiVisbility: false,
        html: "",
        postType:'pageFeed',
        price: '',
        desc: '',
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
    formData.set('feedby',this.props.id)
    formData.set('Feedtype',this.state.postType)
    formData.set('price',this.state.price)
    formData.set('desc',this.state.desc)
    for (let i = 0; i < fileList.length; i++) {
      formData.append('files', fileList[i].originFileObj);
     } 
    
    this.setState({
      uploading: true,
    });

    const Sendpost = await fetch(`${SeverLink}/Feed/pageFeed`,{
      method:'POST',
      headers:{token:localStorage.token},
      body:formData
    })
    const response = await Sendpost.json()
    if(response.msg){
      this.setState({fileList:[],uploading:false,html:''})
      this.props.UpdatePostModal(false)
    }else{
      this.setState({error:response.error})
    }
  };

//end image processing and preview

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  focus = () => {
    this.editor.focus();
  };

  //setting Emoji
  setEmojiVisible = () => {
    this.state.emojiVisbility === false?
    this.setState({emojiVisbility:true}):
    this.setState({emojiVisbility:false})
  }  
 
  handleTxtChange = evt => {
    this.setState({ html: evt.target.value });
  };

  seTemoji = (evt) => {
    this.setState({html:this.state.html + evt.native} );
  }
  seTemojiOut = ()=>{
    this.setState({emojiVisbility:false})
  }
  // end setting Emoji


  //setting postType state

  setPostType = (evt) => {
    this.setState({ postType: evt })
  }
  render() {
    //upload image btn
    const { previewVisible, previewImage, fileList, previewTitle,error} = this.state;
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
        {/* textarea */}
        <div>
        <div className="tr">
        <Tooltip placement="top" title={text}>
        <InfoCircleOutlined /> 
      </Tooltip>
        </div>
          <ContentEditable
            innerRef={this.contentEditable}
            html={this.state.html} // innerHTML of the editable div
            disabled={false}       // use true to disable editing
            onChange={this.handleTxtChange} // handle innerHTML change
            tagName='article' // Use a custom HTML tag (uses a div by default)
            data-placeholder="describe this content here..."
            id="l557r_textarea"
            spellcheck="true"
            className="textarea_13l tl ml2 mt1 fw6 f3 dark-gray"
            />
        <div className="black-70 v-mid  pa1">
       {/* emoji area */}
            <div className="f3 light-blue w2 h2 pa1 flex">
       <span className="ml4 pointer">
       <Tooltip title="Emojis">
         <SmileFilled onClick={this.setEmojiVisible}/>
         </Tooltip>
        </span>
       {
         this.state.emojiVisbility === false?
                  null :
                  <div>
           <Picker 
            onSelect={this.seTemoji} 
            theme="dark" 
            set='google'
              style={{ position: 'absolute',zIndex:99, marginTop:'39px' }} 
              title='Pick your emoji…' 
              emoji='point_up' i18n={{ search: 'search...', categories: { search: 'search emojis', recent: 'Recent' } }} 
              size={34}
              />
           </div>
       }
        
          </div>
            {/* image area */}
            <div className="db mt3">
              <div className="flex">
              <Upload
                {...props}
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
                >
                {fileList.length >= 4 ? null : uploadButton}
                </Upload>
              </div>
      
                {fileList.length < 3 || this.state.html === ''?
                <Button
                type="primary"
                disabled
                onClick={this.handleUpload}
                loading={uploading}
                style={{ marginTop: 16 }}
                className="w-100" 
              >
                {uploading ? 'Uploading' : 'Start Upload'}
              </Button>:
              <Button
              type="primary"
              onClick={this.handleUpload}
              loading={uploading}
              style={{ marginTop: 16 }}
              className="w-100" 
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
            <span className="db red">
            {error}
            </span>
            </Modal>
            </div>
          </div>
        </div>
        {/* media area */}
      </>
    );
  }
}

export default PostArea