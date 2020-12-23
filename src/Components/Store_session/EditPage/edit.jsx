import React from 'react'
import ProfileAvater from './editImg.jsx'
import {Button } from 'antd';
import {ArrowRightOutlined,ToolOutlined,
    PhoneOutlined,GlobalOutlined,InfoCircleFilled,FlagOutlined,SettingOutlined,CloseCircleOutlined} from '@ant-design/icons';
import Phone from './EditExtra/editPhone.jsx'
import { CountryDropdown, RegionDropdown} from 'react-country-region-selector';
import { Select,Alert } from 'antd';
import ContentEditable from 'react-contenteditable'
const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];

const localLink = 'http://localhost:4000'
const SeverLink = 'https://still-cove-26148.herokuapp.com'

class EditingPage extends React.Component{
    constructor(){
        super()
        this.state = {
           
            name: '',
            fullname: '',
            edit_name:false,
            success:'',
            country:'',
            edit_country:false,
            region:'',
            edit_region:false,
            website:'',
            weburls:'',
            error:'',
            phone:[],
            html:"",
            aboutMe:'',

          };
    }
   componentDidMount(){       
        try{
            const {pagename,about,websites,phone,country,region} = this.props
            
            this.setState({aboutMe:about,fullname:pagename,weburls:websites,country:country,region:region})
            if( phone.length > 0){
                this.setState({phone:phone})
            }
        }catch(error){

        }
    }
    handleTxtChange = evt => {
        this.setState({ html: evt.target.value });
      };
    
    UploadData = async()=>{
        const sendData = await fetch(`https://still-cove-26148.herokuapp.com/Page/editingDT/${this.props.address}`,{
            method:'PATCH',
            headers:{"Content-Type":"application/json",token:localStorage.token},
            body:JSON.stringify({
                pagename:this.state.name,
            })
        })
        const response = await sendData.json()
        if(response){
            this.setState({error:response})
        }
    }

    //CHANGE NAME
    onSetName = async()=>{
        const nameChange = await fetch(`https://still-cove-26148.herokuapp.com/Patch/Editname/${this.props.address}`,{
            method:"PATCH",
            headers:{'Content-Type':"application/json",token:localStorage.token},
            body: JSON.stringify({
                pagename:this.state.fullname
            })
        })
        const response = await nameChange.json()
        if(response.update){
            this.setState({fullname:response.update,edit_name:false})
        }else{
            this.setState({error:'failed updating info check details or network connection'})
        }
    }
    //set WebsiteAddress
    onSetwebsite = async()=>{
       
            const setaddress = await fetch(`${SeverLink}/Patch/website/${this.props.address}`,{
                method:'PATCH',
                headers:{'Content-Type':'application/json',token:localStorage.token},
                body:JSON.stringify({
                    website:this.state.website
                })
            })
            const response = await setaddress.json()
            if(response.update){
                this.setState({success:'success updating page info',website:''})
            }else if(response.error){
              this.setState({error:response.error})
            }
        
        
    }
// set About for users 
setAbout = async() => {
    const About = await fetch(`https://still-cove-26148.herokuapp.com/Patch/about/${this.props.address}`,{
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
 // set country to allow users update their country
 async selectCountry (val) {
    this.setState({ country: val });
    const country = await fetch(`https://still-cove-26148.herokuapp.com/Patch/country/${this.props.address}`,{
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
    const Region = await fetch(`https://still-cove-26148.herokuapp.com/Patch/region/${this.props.address}`,{
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
  redirectTopage=(address)=>{
    window.location.href = `${address}`;
}
    render(){
       
        const {error,edit_country,edit_name,edit_region, country, region,fullname,phone,weburls,aboutMe,success,website} = this.state
            
        return(
            <div style={{marginBottom:'0%'}} className="center">
               
                {/* full names */}
                <div style={{ marginBottom: '0%' }} className="">
                <div className="w-80">
                   
                    <p className="b f5 fw6 tl ml3">About</p>
                    <span class="red">{error}</span>
                    <span className="green">{success}</span>
                    <p className="b f6 fw6 tr blue mr4"><SettingOutlined /> Edit profile</p>
                    <p className="b f6 fw6 tl ml3 bb b--black-10 w-30 gray ttu">General</p>
                     {/* profile image avater */}
                <div className="center pa2">
                    <div className="dib">
                        <ProfileAvater address={this.props.address} />
                    </div>
                </div>
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
                                            <button class="pointer" onClick={this.onSetName}><ArrowRightOutlined /></button>
                                        </div></td>
                                        : null
                                }
                                
                            </tr>
                        </table>
                    </div>

                    {/* contact info */}
                    <p className="b f6 fw6 tl ml3 bb b--black-10 w-30 gray ttu mt2">Contact details</p>
                    <div className="tl ml3" style={{ lineHeight: 3 }}>
                            <div className="gray"><PhoneOutlined /> <span className="blue b f6 ml3 pointer dib">+ Enter phone number</span>
                            <Phone address={this.props.address}/>
                            {phone}
                        </div>
                        
                    <div className="gray"><GlobalOutlined /> <span className="blue b f6 ml3 pointer">+ Enter website </span>
                        <span className="db color f6 pointer">
                            <a onClick={e=>this.redirectTopage(weburls)} href={weburls}>{weburls}</a>
                        </span>
                        </div>
                        <div class="webflow-style-input flex ">
                            <input class="" onChange={e=>this.setState({website:e.target.value})} type="text" placeholder="enter web address url" value={website}/>
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
                                 <button class="pointer" onClick={this.setAbout}><ArrowRightOutlined /></button>
                            </div>
                            <div className="w-50 f6 lh-copy">{aboutMe}</div>
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
            </div>
        )
    }
}
export default EditingPage