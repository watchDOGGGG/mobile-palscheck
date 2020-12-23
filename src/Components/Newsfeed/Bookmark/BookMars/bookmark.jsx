import React from 'react'
import BookMarkCrd from './bookmarkCard'
import {ClearOutlined} from '@ant-design/icons';
class BookMark extends React.Component{

    constructor(){
        super()
        this.state = {
            bookM:[]
        }
    }
    componentDidMount(){
        this.getAllBookmarks()
    }
    getAllBookmarks = async()=>{
        const fetchAll = await fetch('https://still-cove-26148.herokuapp.com/Feed/getAllbookmark/bookmark',{
            headers:{token:localStorage.token}
        })
        const response = await fetchAll.json()
        if(response.result){
            this.setState({bookM:response.result})
        }
    }
    
    clearAllbookmark = async()=>{
        const clearAll = await fetch('https://still-cove-26148.herokuapp.com/Feed/clearBookmark',{
        method:'POST',    
        headers:{'Content-Type':'application/json',token:localStorage.token}
        })
        const response = await clearAll.json()
        if(response.bookdel){
            this.setState({bookM:[]})
        }else{
            alert('error deleting')
        }
    }
    render(){
        return(
            <div>
                <div className="tr blue f5 pointer" onClick={this.clearAllbookmark}>
                <ClearOutlined /> clear All 
                </div>
                {
                    this.state.bookM.length > 0?
                    <BookMarkCrd
                    bookmarks = {this.state.bookM}
                />
                    :
                    <p>No BookMarks yet</p>
                }
                
            </div>
        )
    }
}
export default BookMark