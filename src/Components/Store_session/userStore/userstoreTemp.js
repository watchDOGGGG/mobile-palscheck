import React from 'react'
import { Tabs } from 'antd';
import StoreLayout from './UserStoreFeed/storelayout'

import Editing from '../EditPage/edit'

const { TabPane } = Tabs;

class StoreTemp extends React.Component{

    render(){
        return(
            <div className="pa2">
            <Tabs defaultActiveKey="1" centered>
                <TabPane tab={`${this.props.name}`} key="1">
                    <StoreLayout
                    pagename = {this.props.name}
                    id = {this.props.id}
                    ProfileImage={this.props.ProfileImage}
                    about={this.props.about}
                    address={this.props.address}
                    websites = {this.props.websites}
                    phone = {this.props.phone}
                    country = {this.props.country}
                    region = {this.props.region}
                    />
                </TabPane>
                {/* <TabPane tab="contents" key="2" className="">
                    <Contents
                    id={this.props.id}
                    />
                </TabPane>
                <TabPane tab="About" key="3" className="">
                    <About 
                        about={this.props.about}
                        id={this.props.id}
                    />
                </TabPane> */}
                {
                    this.props.loggedIn !== this.props.admin?
                    null:
                    <TabPane tab="settings" key="4" className="">
                    <Editing
                    address={this.props.address}
                    pagename = {this.props.name}
                    about={this.props.about}
                    websites = {this.props.websites}
                    phone = {this.props.phone}
                    country = {this.props.country}
                    region = {this.props.region}
                    id={this.props.id}
                    />
                </TabPane>
                }
                
            </Tabs>
            </div>
        )
    }
}
  


export default StoreTemp