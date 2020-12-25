import React from 'react'
import { Menu, Dropdown,Skeleton } from 'antd';
import {Link} from 'react-router-dom'
import { DownOutlined,HomeFilled,MessageFilled,BellFilled,MoreOutlined,
    SettingFilled,ShoppingFilled,UserOutlined} from '@ant-design/icons';
    import Footer from '../Footer/footer.jsx'
    import Logo from '../Logo/logofav3.jsx'

    const closeNav = ()=> {
        document.getElementById("myNav").style.width = "0%";
      }
const more = (
    <Menu>
      <Menu.Item key="0">
      <Link to="/settings" onClick={closeNav} className="f5 fw3 ttc"><span className="nav-icons mr3 f4 no-underline"><SettingFilled /></span>settings</Link>
      </Menu.Item>
    </Menu>
  );
 
class NavMenu extends React.Component{
    constructor(){
        super()
        this.state={
            size: 'default',
        }
    }
    openNav=()=> {
        document.getElementById("myNav").style.width = "100%";
      }
      
       closeNav = ()=> {
        document.getElementById("myNav").style.width = "0%";
      }
    render(){
        const {} = this.state
        return (
            <div>

                <div id="myNav" class="overlay-menu">
                    <a class="closebtn white f3" onClick={this.closeNav}>&times;</a>
                    <nav className="ttc tj nav-con">

                        <Link  onClick={this.closeNav} to="/home"  className="db f4 fw5 pa3"><span className="nav-icons mr3 f4"><HomeFilled /></span>home</Link>
                        <Link  onClick={this.closeNav} to="/notification" className="db f4 pa3 fw5"><span className="nav-icons mr3 f4"><BellFilled /></span>notification</Link>
                        <Link  onClick={this.closeNav} to="/talks" className="db f4 pa3 fw5"><span className="nav-icons mr3 f4"><MessageFilled /></span>Talks</Link>
                        <Link  onClick={this.closeNav} to="/store" className="db f4 pa3 fw5"><span className="nav-icons mr3 f4 no-underline"><ShoppingFilled /></span>store</Link>
                        <Link  onClick={this.closeNav} to="/polls" className="db f4 pa3 fw5"><span className="nav-icons mr3 f4 b"># </span>Polls</Link>
                        {
                            this.props.username ?
                                <Link  onClick={this.closeNav} to={this.props.username === 'loading' ? null : `${this.props.username}.pal`}
                                    className="db f4 pa3 fw5"><span className="nav-icons mr3 f4"><UserOutlined /></span>profile</Link>
                                :
                                <Link  onClick={this.closeNav} to={'/home'}
                                    className="db f4 pa3 fw5"><span className="nav-icons mr3 f4"><UserOutlined /></span>profile</Link>
                        }
                        <Dropdown overlay={more} trigger={['click']}>
                            <Link  onClick={this.closeNav} className="ant-dropdown-link db f4 pa3 fw5 underline" onClick={e => e.preventDefault()}>
                                <span className="nav-icons mr3 f4 no-underline"><MoreOutlined /></span>see more <DownOutlined />
                            </Link>
                        </Dropdown>
                    </nav>
                    <div className="absolute bottom-1 left-1">
                        <Footer />
                    </div>
                </div>

                <span className="absolute" style={{left: '10px' }} onClick={this.openNav}><Logo /></span>

            </div>
        )
    }
}
export default NavMenu