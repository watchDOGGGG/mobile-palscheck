import { slide as Menu } from 'react-burger-menu'
import React from 'react'
import {Avatar} from 'antd'

import {Link} from 'react-router-dom'
import { LogoutOutlined,HomeFilled,MessageFilled,BellFilled,MoreOutlined,
    SettingFilled,ShoppingFilled,UserOutlined} from '@ant-design/icons';
    import Footer from '../Footer/footer.jsx'
    import { Badge } from 'antd';
 
var styles = {
   
    bmMenuWrap: {
      position: 'fixed',
      height: '100%',
      left:'0px',
      top:'0px',
    },
    bmMenu: {
      background: '#373a47',
      padding: '2.5em 1.5em 0',
      fontSize: '1.15em'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em'
    },
    bmItem: {
      display: 'block'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)',
      top:'0px',
      left:'0px'
    }
  }
class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
          menuOpen: false,
        }
      }
      logout = async()=>{
        try {
            localStorage.removeItem("token")
            this.props.token(2)
        } catch (error) {
            console.log(error.message)
        }
    }
  // This keeps your state in sync with the opening/closing of the menu
  // via the default means, e.g. clicking the X, pressing the ESC key etc.
  handleStateChange (state) {
    this.setState({menuOpen: state.isOpen})  
  }
  
  // This can be used to close the menu, e.g. when a user clicks a menu item
  closeMenu () {
    this.setState({menuOpen: false})
  }

  // This can be used to toggle the menu, e.g. when using a custom icon
  // Tip: You probably want to hide either/both default icons if using a custom icon
  // See https://github.com/negomi/react-burger-menu#custom-icons
  toggleMenu () {
    this.setState(state => ({menuOpen: !state.menuOpen}))
  }
  showSettings (event) {

  }
styles={
    
}
  render () {
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
      <>
      <Menu left width={ 280 } isOpen={ false } styles={styles} push>
      <nav className="ttc tj nav-con">
                   
                   <Link to="/home" className="db f4 fw5 pa3"><span className="nav-icons mr3 f4"><HomeFilled /></span>home</Link>
                   <Link to="/notification" className="db f4 pa3 fw5"><span className="nav-icons mr3 f4"><Badge size="default" count={this.props.notifyBadge} overflowCount={999}>
                                   <a href="#" className="head-example" />
                               </Badge><BellFilled /></span>notification</Link>
                       <Link to="/talks"  className="db f4 pa3 fw5"><span className="nav-icons mr3 f4"><MessageFilled /></span>Talks</Link>
                       <Link to="/store"  className="db f4 pa3 fw5"><span className="nav-icons mr3 f4 no-underline"><ShoppingFilled /></span>store</Link>
                   <Link to="/polls" className="db f4 pa3 fw5"><span className="nav-icons mr3 f4 b"># </span>Polls</Link>
                   {
                       this.props.username ?
                           <Link to={this.props.username === 'loading' ? null : `/${this.props.username}.pal`}
                               className="db f4 pa3 fw5"><span className="nav-icons mr3 f4"><UserOutlined /></span>profile</Link>
                       :
                       <Link to={'/home'}
                               className="db f4 pa3 fw5"><span className="nav-icons mr3 f4"><UserOutlined /></span>profile</Link>
                   }
                   <Link to="/settings" className="db f4 fw5 pa3"><span className="nav-icons mr3 f4"><SettingFilled /></span>settings</Link>
                   <Link onClick={this.logout} className="db f4 fw5 pa3"><span className="nav-icons mr3 f4"><LogoutOutlined /></span>Logout</Link>
               </nav>
      </Menu>
      <Avatar size={40} src={this.props.ProfileImg} onClick={() => this.toggleMenu()}/>
      </>
    );
  }
}

export default App;