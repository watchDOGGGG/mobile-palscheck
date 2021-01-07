import React from 'react'
import { Radio } from 'antd';
import {Link} from 'react-router-dom'
import { Button, notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import LOGO from '../Logo/logofav2.jsx'
const localLink = 'http://localhost:4000'
const SeverLink = 'https://still-cover-backend.uc.r.appspot.com'

const optionsWithDisabled = [
    { label: 'male', value: 'male' },
    { label: 'female', value: 'female' },
    { label: 'custom', value: 'custom'},
  ];

class Register extends React.Component{

    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            repass: '',
            gender: 'male',
            error:[],
            loading: ''
        }
    }
   
    openNotification = (type) => {
        notification[type]({
            message: 'Success',
            description:
            'please check your mail for a 5 digit verification code from palscheck copy and paste in the verification box to verify your account.',
          });
        };
     
    onChange4 = e => {
        this.setState({
          gender: e.target.value,
        });
      };

    submitFormToregister = (e)=>{
        e.preventDefault(e)
        this.validatepassword()
    }

    validatepassword = async()=>{
        this.setState({loading:'please wait...',error:''})
        var pass = document.getElementById('pass')
        var cpass = document.getElementById('cpass')

        if(pass.value.length < 6){
            this.setState({error:'password too short',loading:''})
        }else if(cpass.value !== pass.value){
            this.setState({error:'password not match',loading:''})
        }else{
            const Send = await fetch(`${SeverLink}/Authentication/`,{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({
                    firstname:this.state.firstname,
                    lastname:this.state.lastname,
                    email:this.state.email,
                    password:this.state.password,
                    gender:this.state.gender
                })
            })
            const response = await Send.json()
            if(response.success){
               this.openNotification('success')
               this.setState({loading:'done',error:''})
            }else if(response.error){
                this.setState({error:response.error,loading:''})
            }else{
                 this.setState({error:'Error siging in',loading:''})
                // setTimeout(() => {
                //     this.setState({error:'Error siging in',loading:''})
                // }, 1000);
            }
        }
   }


    render(){
        
    const {gender,route,error,loading,firstname,lastname,email,password,repass} = this.state;
        return(    
               <main class="pa4 black-80">
               <form class="measure center" onSubmit={e=>this.submitFormToregister(e)}>
                   <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
                       <legend class="f4 fw6 ph0 mh0 ttu">We just need a few things to get started</legend>
                       <div class="mt3">
                           <label class="db fw6 lh-copy f6" for="email-address">Firstname</label>
                           <input onChange={e=>this.setState({firstname:e.target.value})} placeholder="Firstname" required class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" id="email-address"/>
     </div>
     <div class="mt3">
                           <label class="db fw6 lh-copy f6" for="email-address">Lastname</label>
                           <input onChange={e=>this.setState({lastname:e.target.value})} placeholder="Lastname" required class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" id="email-address"/>
     </div>
     <div class="mt3">
                           <label class="db fw6 lh-copy f6" for="email-address">Email</label>
                           <input onChange={e=>this.setState({email:e.target.value})} placeholder="email" required class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email"  id="email-address"/>
     </div>
     <div class="mt3">
                           <label class="db fw6 lh-copy f6" for="email-address">Password</label>
                           <input onChange={e=>this.setState({password:e.target.value})} placeholder="password" required class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" id="pass"/>
     </div>
                           <div class="mv3">
                               <label class="db fw6 lh-copy f6" for="password">ReType-Password</label>
                               <input onChange={e=>this.setState({repass:e.target.value})} placeholder="ReType-Password" required class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="cpass"/>
     </div>
                      <div className="mt3">
                     <label className="f6 tl">Gender</label>
               <Radio.Group
                    options={optionsWithDisabled}
                    onChange={this.onChange4}
                    value={gender}
                    optionType="button"
                    buttonStyle="solid"
                    className="f6"
                />
                <div className="f6">by clicking on the signUp button, you agree to the <Link href="#" className="blue">terms and conditions</Link>,<Link  href="#" className="blue">policy privacy cookies</Link> that covers palscheck</div>
                <input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign up"/>
                    <span className="red">{error}</span>
                    <span className="green">{loading}</span>
                          </div>        
   </fieldset>
                      
               </form>
               
           </main>

        )
    }
}
export default Register