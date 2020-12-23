import React from 'react'
import { Radio } from 'antd';
import {Link} from 'react-router-dom'
import { Button, notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import LOGO from '../Logo/logofav2.jsx'

const localLink = 'http://localhost:4000'
const SeverLink = 'https://still-cove-26148.herokuapp.com'

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
    componentDidMount(){
        this.submitFormToregister()
        this.switchEffect()
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
    
      
    switchEffect(){
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');

        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
});
    }

    submitFormToregister = ()=>{
        var form = document.querySelector('form')
        form.addEventListener('submit',(e)=>{
            e.preventDefault(e)
            this.validatepassword()
        })
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
            <>
           
                <form action="#">
                <h1 className="flex" style={{lineHeight:3}}><LOGO/>Create Account</h1>
                <div class="social-container">
                    we just need few info to get started
                </div>
                
                <input type="text" id="fname" value={firstname} onChange={e=>this.setState({firstname:e.target.value})} placeholder="Firstname" required/>
                <input type="text" id="lname" value={lastname} onChange={e=>this.setState({lastname:e.target.value})} placeholder="Lastname" required/>
                <input type="email" id="email" value={email} onChange={e=>this.setState({email:e.target.value})} placeholder="email" required/>
                <input type="password" id="pass" value={password} onChange={e=>this.setState({password:e.target.value})} placeholder="password" required/>
                <input type="password" id="cpass" value={repass} onChange={e=>this.setState({repass:e.target.value})} placeholder="ReType-Password" required/>
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
                <button htmlType="submit" className="pointer">Sign Up</button>
                    <span className="red">{error}</span>
                    <span className="green">{loading}</span>
            </form>
           
            </>     
               
        )
    }
}
export default Register