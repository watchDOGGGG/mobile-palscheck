import React from 'react'
import io, { Socket } from 'socket.io-client'


const socket = io.connect('http://localhost:4000/')
class WorkSpace extends React.Component{

    componentDidMount(){
        socket.emit('post','we are on post palstform','123456')
    }
    render(){
        return(
            <div>
                this is a show aspect 
            </div>
        )
    }
}
export default WorkSpace