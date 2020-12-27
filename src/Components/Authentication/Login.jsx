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


    submitFormToLogin = (e) => {
        e.preventDefault()
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
            this.props.updateAuth(1)
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
   
    render() {
        const {msg,errormsg} = this.state
        return(
          
            <main class="pa4 black-80">
                <form class="measure center" onSubmit={e=>this.submitFormToLogin(e)}>
                    <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
                        <legend class="f4 fw6 ph0 mh0"></legend>
                        <div class="mt3">
                            <label class="db fw6 lh-copy f6" for="email-address">Email</label>
                            <input onChange={e=>this.setState({email:e.target.value})} class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address"/>
      </div>
                            <div class="mv3">
                                <label class="db fw6 lh-copy f6" for="password">Password</label>
                                <input onChange={e=>this.setState({password:e.target.value})} class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password"/>
      </div>
                                <label class="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>
    </fieldset>
                                <div class="">
                                    <input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
    </div>
                                    <div class="lh-copy mt3">
                                        <a href="https://forgot-password.palscheck.com/reset-password" class="f6 link dim black db">Forgot your password?</a>
                                    </div>
                </form>
                <span class="red">
                    {errormsg}
                </span>
                {
                    msg === 'delete' ?
                        <div>
                            <span class="green db">this account has been schedule for delete in 15 days if you still need it click the recover button to recover the account</span>
                            <span
                                onClick={this.RecoverAcct}
                                class="bg-white blue br0 pa1 mt1 ba h2 w4 pointer db center">Recover</span>
                        </div> :
                        msg === 'not verified' ?
                            <div>
                                <span class="green db">this account has not yet been verified please check your email for your verification link</span>
                            </div>
                            :
                            <span class="green">
                                {msg}
                            </span>
                }
            </main>


        )
    }
}
export default Login