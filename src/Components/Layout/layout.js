import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import './layout.css'
import NavMenu from '../NavMenu/navmenu.jsx'
import Header from '../Header/header.jsx'
import Profile from '../Profile/profile.jsx'
import Home from '../Home/home.jsx';
import SingleFeed from '../Newsfeed/singleFeed/singlefeed'
import Notification from '../Notification/notifications'
import Followers from '../Profile/Followers/followers.jsx'
import Store from '../Store_session/userStore/userStore'
import CreatePage from '../Store_session/Create_store/createStore'
import AllStore from '../Store_session/AllStores/Allstores'
import Login from '../Authentication/welcome'
import Talks from '../Talks/talks.jsx'
import Talkstack from '../Talks/TalkStack/talks_stack.jsx'
import Loading from '../Loading/loading.jsx'
import Polls from '../Polls/polls.jsx'
import Settings from '../Settings/settings.jsx'
import DeleteAcct from "../Profile/DeleteAct/delete.jsx";
import NotFound from '../404/404.jsx'
import styled,{ThemeProvider} from 'styled-components'
import {lightTheme,darkTheme,GlobalStyles} from '../Theme/theme.jsx'
import CookieConsent, { Cookies } from "react-cookie-consent";
import Footer from '../Footer/footer.jsx'
import Search from '../Header/Search/search.jsx'
const localLink = 'http://localhost:4000'
const SeverLink = 'https://still-cover-backend.uc.r.appspot.com'

const StyledApp = styled.div`
color: ${props=> props.theme.fontColor}
`;
class LayoutTemp extends React.Component {
    constructor() {
        super()
        this.state = {
            Auth: 0,
            userID: [],
            isLoading: '',
            isLoggedIn:[],
            theme: 'light'

        }
    }
    componentDidMount() {
        try {
            this.setState({ isLoading: 'loaded' })
            this.CheckLoginsession()
            this.getLoggedInUser()
            this.setUserDT() 
        } catch (error) {
        }
    }
    themeToggler = ()=>{
        this.state.theme === 'light'?
        this.setState({theme:'dark'}):
        this.setState({theme:'light'})
        
    }
    //getLoggedInuser
    getLoggedInUser = async()=>{
        const getLogginUser = await fetch(`${SeverLink}/Authentication/User/LoggedIn`,{
            headers:{token:localStorage.token}
        })
        const response = await getLogginUser.json()
        this.setState({isLoggedIn:response})
    }

    UpdateAuth = (Auth) => {
        this.setState({ Auth: Auth })
    }
    CheckLoginsession = async () => {
        const check = await fetch(`${SeverLink}/Authentication/verifyJwt`, {
            headers:{token:localStorage.token},
        })
        const response = await check.json()
        if (response.true) {
            this.setState({ Auth: 1 })
        } else {
            this.setState({ Auth: 2 })
        }
    }
    setUserDT = async () => {
        const setid = await fetch(`${SeverLink}/Authentication/`, {
            headers: { token: localStorage.token },
        })
        const response = await setid.json()
        if (response) {
            this.setState({ userID: response })
        }
    }
    CookiePolicy = () =>{
        window.location.href = "https://Terms.palscheck.com/cookie-policy"
    }
    redirectHome = (route) =>{
        if(route === true){
            window.location.href = "/home"
        
        }
    }
    render() {
        const {theme,Auth,userID,isLoggedIn} = this.state
        return (
            <Router>
                
                   <ThemeProvider theme={ theme === 'light'?lightTheme:darkTheme}>
                   <GlobalStyles/>
                   <StyledApp className="layout-root absolute">
                        
                        {/* sider */}
                        {
                            Auth === 1 ?
                                <>
                                    {/* header */}
                                    {
                                        Auth === 1 ?
                                            <div className="layout-header fixed right-0 top-0"><Header
                                                ProfileImg={!userID.profileimg ? null : userID.profileimg}
                                                fullname={!userID.fullname ?null : userID.fullname}
                                                username={!userID.username ? null: userID.username}
                                                UpdateAuth={this.UpdateAuth}
                                            /></div> : null
                                    }

                                    {/* content */}
                                    
                                    <div className="layout-content absolute right-0">
                                    
                                    <Switch>
                                        <Route path={`/`} exact component={props =>
                                            Auth === 1 ?
                                                <Home userid={isLoggedIn.loggedIn}/> :
                                                <Redirect to={'/login'} />
                                        } />
                                        <Route path={`/home`} exact component={props =>
                                            Auth === 1 ?
                                                <Home userid={isLoggedIn.loggedIn}/> :
                                                <Redirect to={'/login'} />
                                        } />
                                        <Route path={`/notification`} exact component={props =>
                                            Auth === 1 ?
                                                <Notification /> :
                                                <Redirect to={'/login'} />
                                        } />
                                        <Route path={`/talks`} exact component={props =>
                                            Auth === 1 ?
                                                <Talkstack /> :
                                                <Redirect to={'/login'} />
                                        } />
                                        <Route path={`/:id.pal`} exact component={
                                            Auth === 1 ?
                                                Profile :
                                                <Redirect to={'/login'} />
                                        } />
                                        <Route path={`/:id.feed`} exact component={
                                            Auth === 1 ?
                                                SingleFeed :
                                                <Redirect to={'/login'} />
                                        } />
                                        <Route path={`/follow`} exact component={props =>
                                            Auth === 1 ?
                                                <Followers /> :
                                                <Redirect to={'/login'} />
                                        } />
                                        <Route path={`/:id.page`} exact component={
                                            Auth === 1 ?
                                                Store :
                                                <Redirect to={'/login'} />
                                        } />
                                        <Route path={`/:id.talk`} exact component={
                                            Auth === 1 ?
                                                Talks :
                                                <Login UpdateAuth={this.UpdateAuth} />
                                        } />
                                        <Route path={`/polls`} exact component={props =>
                                            Auth === 1 ?
                                                <Polls /> :
                                                <Login UpdateAuth={this.UpdateAuth} />
                                        } />
                                        <Route path={`/createPage`} exact component={
                                            Auth === 1 ?
                                                CreatePage :
                                                <Redirect to={'/login'} />
                                        } />
                                        <Route path={`/store`} exact component={props =>
                                            Auth === 1 ?
                                                <AllStore /> :
                                                <Redirect to={'/login'} />
                                        } />
                                        <Route path={`/settings`} exact component={props =>
                                            Auth === 1 ?
                                                <Settings themeToggler={this.themeToggler}/> :
                                                <Redirect to={'/login'} />
                                        } />
                                        <Route path={`/delete/Account`} exact component={props =>
                                            Auth === 1 ?
                                                <DeleteAcct UpdateAuth={this.UpdateAuth}/> :
                                                <Redirect to={'/login'} />
                                        } />
                                        <Route path={`/search`} exact component={props =>
                                            Auth === 1 ?
                                                <Search /> :
                                                <Redirect to={'/login'} />
                                        } />
                                        <Route path={`/login`} exact component={props =>
                                            Auth === 2 ?
                                                <Login UpdateAuth={this.UpdateAuth} /> :
                                                <Redirect to={'/home'} />
                                        } />
                                        <Route component={props => <NotFound/>}/>
                                        {/* end layout div */}
                                        </Switch>
                                    </div>
                                    {/* footer */}
                                    
                                </> :
                                Auth === 2 ?
                                <>
                                <Login UpdateAuth={this.UpdateAuth} redirectHome={this.redirectHome}/>
                                <div className="layout-footer tc"><Footer/></div>
                                </>
                                    
                                    :
                                    <Loading />
                        }
                        <CookieConsent
                            location="bottom"
                            buttonText="Accept"
                            cookieName="palscheck"
                            style={{ background: "#000", opacity: '0.7' }}
                            buttonStyle={{ color: "#fff", fontSize: "13px" }}
                            expires={150}
                        >
                            This website uses cookies to enhance the user experience, analyse site traffic, personalise content and server target ads as well as store user inforamtion like ip address and more to help provide better user content and security. &nbsp;&nbsp;<a className="blue underline" onClick={this.CookiePolicy}>Learn more</a>
                        </CookieConsent>
                    </StyledApp>
                </ThemeProvider>
            </Router>
        )
    }
}
export default LayoutTemp