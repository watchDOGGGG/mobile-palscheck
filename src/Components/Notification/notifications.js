import React from 'react'
import {Divider} from 'antd'
import NotificationCrd from './notificationCrd.jsx'
class Notifications extends React.Component{
    constructor(){
        super()

        this.state = {
            notifications:[]
        }
    }

    componentDidMount(){
        this.getNotifications()
    }
    //fetch All notifications
    getNotifications = async()=>{
        const fetchAll = await fetch('https://still-cove-26148.herokuapp.com/Authentication/all/notify',{
            headers:{token:localStorage.token}
        })
        const response = await fetchAll.json()
        if(response.notify){
            this.setState({notifications:response.notify})
        }
    }
    render(){
    
        return(
            <div>
                {/* profileNewsfeed */}
                <div className="center newfeed--3-art br3 pa2">
                   <Divider>
                        <span className="blue">Notifications</span>
                    </Divider>
                    <NotificationCrd notifies={this.state.notifications}/>
                </div> 
            </div>
        )
    }
}
export default Notifications