import React from 'react'
import Register from './Register.jsx'
import LOGO from '../Logo/logofav2.jsx'

const localLink = 'http://localhost:4000'
const SeverLink = 'https://still-cove-26148.herokuapp.com'
class Login extends React.Component {

    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            msg:'',
            errormsg:''
        }
    }

    componentDidMount() {
        this.switchEffect()
    }
    switchEffect() {
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

    submitFormToLogin = () => {
        this.validatepassword()
    }

    validatepassword = async()=>{
        const Send = await fetch(`${SeverLink}/Authentication/login`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                username:this.state.email,
                password:this.state.password
            })
        })
        const response = await Send.json()
        if (response.token) {
            localStorage.setItem("token", response.token)
            this.props.UpdateAuth(1)
            this.props.redirectHome(true)
        } else if(response.error) {
            this.setState({errormsg:response.error,msg:''})
        }else if(response.verified) {
            this.setState({msg:response.verified,errormsg:''})
        }else if(response.delete) {
            this.setState({msg:response.delete,errormsg:''})
        }
   }

   RecoverAcct = async()=>{
       if(this.state.email !== ''){
        const recover = await fetch(`https://still-cove-26148.herokuapp.com/Authentication/cancel/Delete/${this.state.email}`)
        const response = await recover.json()
        if(response.success){
            this.setState({msg:'recovered you can now logIn',errormsg:''})
        }
       }
       
   }
    UpadetRoute = e => {
       this.props.UpdateAuth(e)
    }
    redirectTopage=()=>{
        window.location.href = 'https://forgot-password.palscheck.com/reset-password';
    }
    render() {
        const {msg,errormsg} = this.state
        return(
            <div className="lg53l center black">
                
                <div class="container" id="container">

                    {/* register */}
                    <div class="form-container sign-up-container">
                        <Register />
                    </div>

                    {/* login */}
                    <div class="form-container sign-in-container">
                        <div className="signin-box">
                            <h1 className="flex" style={{lineHeight:3}}><LOGO/>Sign in</h1>
                            <div class="social-container">
                            </div>
                            <input type="text" onChange={e=>this.setState({email:e.target.value})} placeholder="Email/username" value={this.state.email} required/>
                            <input type="password" onChange={e=>this.setState({password:e.target.value})} placeholder="Password" value={this.state.password} required/>
                            <a target="_blank" onClick={this.redirectTopage} className="blue">Forgot your password?</a>
                            <button className="pointer" onClick={this.submitFormToLogin}>Sign In</button>
                           
                            <span class="red">
                                    {errormsg}
                                </span>
                                {
                                    msg === 'delete'?
                                    <div>
                                        <span class="green db">this account has been schedule for delete in 15 days if you still need it click the recover button to recover the account</span>
                                        <span 
                                        onClick={this.RecoverAcct}
                                        class="bg-white blue br0 pa1 mt1 ba h2 w4 pointer db center">Recover</span>
                                    </div>:
                                    msg === 'not verified'?
                                    <div>
                                        <span class="green db">this account has not yet been verified please check your email for your verification link</span>
                                     </div>
                                    :
                                <span class="green">
                                    {msg}
                                </span>
                                }
                                
                        </div>
                    </div>
                    <div class="overlay-container">
                        <div class="overlay ">
                            <div class="overlay-panel overlay-left ">
                            <div className="left-overlay"></div>
                                <div className="left-effect">
                                <p>welcome to palscheck</p>
                                <p>get connected with people round the world and things you love</p>
                                <button class="ghost db center pointer" id="signIn">Sign In</button>
                               </div>
                                
                                
                            </div>
                            <div class="overlay-panel overlay-right">
                                <div className="right-overlay"></div>
                               <div className="right-effect">
                               <h1 className="white">Palscheck!</h1>
                                <span className="f3 b w-75">See how people feel about your content!</span>
                                <button className="ghost db center pointer" id="signUp">Sign Up</button>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        )
    }
}
export default Login