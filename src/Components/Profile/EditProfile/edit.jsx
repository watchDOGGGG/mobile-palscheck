import React from 'react'
import ProfileAvater from './editImg.jsx'
import AvatarCover from './editcover.jsx'
import {ArrowRightOutlined,ToolOutlined,
    PhoneOutlined,GlobalOutlined,InfoCircleFilled,FlagOutlined,SettingOutlined,CloseCircleOutlined} from '@ant-design/icons';
import Phone from './EditExtra/editPhone.jsx'
import { CountryDropdown, RegionDropdown} from 'react-country-region-selector';
import { Select,Alert } from 'antd';
import ContentEditable from 'react-contenteditable'
const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];

const localLink = 'http://localhost:4000'
const SeverLink = 'https://still-cover-backend.uc.r.appspot.com'

class Editing extends React.Component{
    constructor(){
        super()
        this.state = {
            fullname: '',
            edit_name:false,
            profession: [],
            username:'',
            edit_username:false,
            country:'',
            edit_country:false,
            region:'',
            edit_region:false,
            website:[],
            weburls:[],
            error:'',
            phone:[],
            html:"",
            aboutMe:''
            
          };
    }
    componentDidMount(){
        const {fullname,username,country,region,website,about,profession,phone} = this.props
        this.setState({fullname:fullname,username:username,country:country,region,region
        })
      
        if( phone){
            this.setState({phone:phone})
        }
        if( website){
            this.setState({weburls:website})
        }
        if( about){
            this.setState({aboutMe:about})
        }
    }

    handleTxtChange = evt => {
        this.setState({ html: evt.target.value });
      };
    
    // select profession
     handleChange = async(val) => {
        this.setState({ profession:val });
        const Setprofession = await fetch(`${SeverLink}/Patch/profession`,{
            method: 'PATCH',
            headers : {'Content-Type':'application/json',token:localStorage.token},
            body: JSON.stringify({
               profession:val//input to pass
            })
         })
         const response = await Setprofession.json()
         if(response.update){
            this.setState({profession:response.update})
         }
      };
  
    //upload data
    UploadData = async()=>{
        const sendData = await fetch(`${SeverLink}/Authentication/editingInfo`,{
            method:'PATCH',
            headers:{"Content-Type":"application/json",token:localStorage.token},
            body:JSON.stringify({
                name:this.state.fullname,
                prof:this.state.profession,
                username: this.state.username

            })
        })
        const response = await sendData.json()
        if(response){
            return(null)
        }
    }
    // set country to allow users update their country
    async selectCountry (val) {
        this.setState({ country: val });
        const country = await fetch(`${SeverLink}/Patch/country`,{
            method: 'PATCH',
            headers : {'Content-Type':'application/json',token:localStorage.token},
            body: JSON.stringify({
               country:val//input to pass
            })
         })
         const response = await country.json()
         if(response.update){
            this.setState({country:response.update})
         }
      }
     
      //select region
      async selectRegion (val) {
        this.setState({ region: val });
        const Region = await fetch(`${SeverLink}/Patch/region`,{
       method: 'PATCH',
       headers : {'Content-Type':'application/json',token:localStorage.token},
       body: JSON.stringify({
          region:val//input to pass
       })
    })
    const response = await Region.json()
    if(response.update){
       //set data
       this.setState({region:response.update})
    }
      }

      //Update Database
      //fullname
      onSetName = async()=>{
          if (this.state.fullname.length > 1) {
              const setName = await fetch(`${SeverLink}/Patch/fullname`,{
                  method:'PATCH',
                  headers:{'Content-Type':'application/json',token:localStorage.token},
                  body:JSON.stringify({
                      fullname:this.state.fullname
                  })
              })
              const response = await setName.json()
              if(response.update){
                  this.setState({fullname:response.update})
              }else if(response.error){
                this.setState({fullname:response.error})
              }
          }else{
            
          }
      }
      //username
      onSetUserName = async()=>{
        if (this.state.username.length > 1) {
            const setName = await fetch(`${SeverLink}/Patch/username`,{
                method:'PATCH',
                headers:{'Content-Type':'application/json',token:localStorage.token},
                body:JSON.stringify({
                    username:this.state.username
                })
            })
            const response = await setName.json()
            if(response.update){
                localStorage.removeItem("token")
                window.location = '/login'
                this.setState({error:<Alert message="username has been changed you will be redirected to login with your new username" type="success" />})

            }else if(response.error){
              this.setState({username:response.error})
            }
        }else{
          
        }
    }

    //set WebsiteAddress
    onSetwebsite = async()=>{
        if (this.state.website.length > 1) {
            const setaddress = await fetch(`${SeverLink}/Patch/website`,{
                method:'PATCH',
                headers:{'Content-Type':'application/json',token:localStorage.token},
                body:JSON.stringify({
                    website:this.state.website
                })
            })
            const response = await setaddress.json()
            if(response.update){
                this.setState({error:'success',website:''})
            }else if(response.error){
              this.setState({error:response.error})
            }
        }
    }

 // set region to allow users update their region
 
 // set About for users 
  setAbout = async() => {
    const About = await fetch(`${SeverLink}/Patch/about`,{
       method: 'PATCH',
       headers : {'Content-Type':'application/json',token:localStorage.token},
       body: JSON.stringify({
          about:this.state.html//input to pass
       })
    })
    const response = await About.json()
    if(response.update){
       //set data
       this.setState({html:'',aboutMe:response.update})
    }
 }
 
 //

    render(){
       const {error,edit_country,edit_name,edit_region,edit_username,
        country, region,fullname,profession,username,phone,weburls,aboutMe} = this.state
        const filteredOptions = OPTIONS.filter(o => !profession.includes(o));
      
        return (
            <div style={{ marginBottom: '0%' }} className="">
                <div className="w-100">
                    <div className="tl ml3 f5 gray b pointer" onClick={e=>this.props.close(false)}><CloseCircleOutlined /></div>
                    <p className="b f5 fw6 tl ml3">About</p>
                    <p className="b f6 fw6 tr blue mr4"><SettingOutlined /> Edit profile</p>
                    <p className="b f6 fw6 tl ml3 bb b--black-10 w-30 gray ttu">General</p>

                    {/* profile image avater */}

                    <div className="">
                        <div className="dib w-20">
                            <ProfileAvater />
                        </div>
                        <div className="dib w-20 mt2">
                            <AvatarCover />
                        </div>

                    </div>
                    {/* profile cover avater */}
                    <div className="tl ml3">
                        {/* fullname */}
                        <table className="w-75" style={{ lineHeight: 3 }}>
                            <tr>
                                <td className="gray fw6 b w-50">Name</td>
                                <td>{fullname}</td>
                                {
                                    edit_name === true ?
                                        <td className="blue b pointer f6" onClick={e=>this.setState({edit_name:false})}>Done</td>
                                        :
                                        <td className="blue b pointer f6" onClick={e=>this.setState({edit_name:true})}>Edit</td>
                                }
                                
                                {
                                    edit_name === true ?
                                        <td><div class="webflow-style-input flex">
                                            <input class="" onChange={e=>this.setState({fullname:e.target.value})} type="text" placeholder="change name?"></input>
                                            <button className="pointer" onClick={this.onSetName}><ArrowRightOutlined /></button>
                                        </div></td>
                                        : null
                                }
                                
                            </tr>
                            {/* username */}
                            <tr>
                                {error}
                                <td className="gray fw6 b w-50">Username</td>
                                <td>{username}</td>
                                {
                                    edit_username === true ?
                                        <td className="blue b pointer f6" onClick={e=>this.setState({edit_username:false})}>Done</td>
                                        :
                                        <td className="blue b pointer f6" onClick={e=>this.setState({edit_username:true})}>Edit</td>
                                }
                                
                                {
                                    edit_username === true ?
                                        <td><div class="webflow-style-input flex">
                                            <input class="" onChange={e=>this.setState({username:e.target.value})} type="text" placeholder="palscheck.username"></input>
                                            <button className="pointer" onClick={this.onSetUserName}><ArrowRightOutlined /></button>
                                        </div></td>
                                        : null
                                }
                                
                                
                            </tr>
                            {/* email */}
                            <tr>
                                <td className="gray fw6 b w-50">Email</td>
                                <td>palscheck@gmail.com</td>
                            </tr>
                        </table>
                    </div>

                    {/* contact info */}
                    <p className="b f6 fw6 tl ml3 bb b--black-10 w-30 gray ttu mt2">Contact details</p>
                    <div className="tl ml3" style={{ lineHeight: 3 }}>
                            <div className="gray"><PhoneOutlined /> <span className="blue b f6 ml3 pointer dib">+ Enter phone number</span>
                            <Phone/>
                            {phone}
                        </div>
                        
                    <div className="gray"><GlobalOutlined /> <span className="blue b f6 ml3 pointer">+ Enter website <span className="green">{error}</span></span>
                        <span className="db color f6 pointer">
                            {weburls }
                        </span>
                        </div>
                        <div class="webflow-style-input flex ">
                            <input class="" onChange={e=>this.setState({website:e.target.value})} type="text" placeholder="enter web address url"></input>
                            <button className="pointer" onClick={this.onSetwebsite}><ArrowRightOutlined /></button>
                        </div>
                    </div>

                    {/* moreInfo */}
                    <p className="b f6 fw6 tl ml3 bb b--black-10 w-30 gray ttu mt2">More info</p>
                    <div className="tl ml3" style={{ lineHeight: 3 }}>
                        <div className="gray"><InfoCircleFilled /> <span className="blue b f6 ml3 pointer">Edit About</span>
                        <div className="db webflow-style-input flex ">
                                <ContentEditable
                                    innerRef={this.contentEditable}
                                    html={this.state.html} // innerHTML of the editable div
                                    disabled={false}       // use true to disable editing
                                    onChange={this.handleTxtChange} // handle innerHTML change
                                    tagName='article' // Use a custom HTML tag (uses a div by default)
                                    data-placeholder="tell people about yourself.."
                                    spellcheck="true"
                                    className="w-50 aboutTxt ba b--black-10 pa1"
                                />
                                 <button className="pointer" onClick={this.setAbout}><ArrowRightOutlined /></button>
                            </div>
                            <span className="w-50 f6 ">{aboutMe}</span>
                        </div>
                    </div>

                    {/* location */}
                    <p className="b f6 fw6 tl ml3 bb b--black-10 w-30 gray ttu mt2">Location</p>
                    <table className="w-75" style={{ lineHeight: 3 }}>
                        <tr>
                            <td className="gray fw6 b w-50"><FlagOutlined /> Country</td>
                            <td>{country}</td>
                            {
                                    edit_country === true ?
                                        <td className="blue b pointer f6" onClick={e=>this.setState({edit_country:false})}>Done</td>
                                        :
                                        <td className="blue b pointer f6" onClick={e=>this.setState({edit_country:true})}>Edit</td>
                                }
                                
                                {
                                edit_country === true ?
                                    <td><div class="webflow-style-input flex">
                                        <CountryDropdown
                                            value={country}
                                            onChange={(val) => this.selectCountry(val)} />
                                    </div>
                                    </td>
                                    : null
                                }
                            
                        </tr>
                        {/* state */}
                        <tr>
                            <td className="gray fw6 b w-50">Region</td>
                            <td>{region}</td>
                            {
                                    edit_region === true ?
                                        <td className="blue b pointer f6" onClick={e=>this.setState({edit_region:false})}>Done</td>
                                        :
                                        <td className="blue b pointer f6" onClick={e=>this.setState({edit_region:true})}>Edit</td>
                                }
                                
                                {
                                edit_region === true ?
                                    <td><div class="webflow-style-input flex">
                                        <RegionDropdown
                                    country={country}
                                    value={region}
                                    onChange={(val) => this.selectRegion(val)} /> 
                                    </div></td>
                                    : null
                                }
                            
                        </tr>
                        {/* address */}
                        
                    </table>
                </div>
            </div>
        )
    }
}
export default Editing