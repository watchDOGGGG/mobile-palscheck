import React from 'react'
import { Menu, Dropdown,Skeleton } from 'antd';
import {Link} from 'react-router-dom'
import { DownOutlined,HomeFilled,MessageFilled,BellFilled,MoreOutlined,
    SettingFilled,ShoppingFilled,UserOutlined} from '@ant-design/icons';
    import Footer from '../Footer/footer.jsx'

const more = (
    <Menu>
      <Menu.Item key="0">
      <Link to="/settings" className="f5 fw3 ttc"><span className="nav-icons mr3 f4 no-underline"><SettingFilled /></span>settings</Link>
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
    
    render(){
        const {size,style} = this.state
        return(
            <div>
                <nav className="ttc tj nav-con">
                   
                    <Link to="/home" className="db f4 fw5 pa3"><span className="nav-icons mr3 f4"><HomeFilled /></span>home</Link>
                    <Link to="/notification" className="db f4 pa3 fw5"><span className="nav-icons mr3 f4"><BellFilled /></span>notification</Link>
                        <Link to="/talks"  className="db f4 pa3 fw5"><span className="nav-icons mr3 f4"><MessageFilled /></span>Talks</Link>
                        <Link to="/store"  className="db f4 pa3 fw5"><span className="nav-icons mr3 f4 no-underline"><ShoppingFilled /></span>store</Link>
                    <Link to="/polls" className="db f4 pa3 fw5"><span className="nav-icons mr3 f4 b"># </span>Polls</Link>
                    {
                        this.props.username ?
                            <Link to={this.props.username === 'loading' ? null : `${this.props.username}.pal`}
                                className="db f4 pa3 fw5"><span className="nav-icons mr3 f4"><UserOutlined /></span>profile</Link>
                        :
                        <Link to={'/home'}
                                className="db f4 pa3 fw5"><span className="nav-icons mr3 f4"><UserOutlined /></span>profile</Link>
                    }
                    <Dropdown overlay={more} trigger={['click']}>
                        <Link className="ant-dropdown-link db f4 pa3 fw5 underline" onClick={e => e.preventDefault()}>
                        <span className="nav-icons mr3 f4 no-underline"><MoreOutlined /></span>see more <DownOutlined/>
                        </Link>
                    </Dropdown>
                </nav>
                <div className="absolute bottom-1 left-1">
                    <Footer/>
                </div> 
            </div>
        )
    }
}
export default NavMenu