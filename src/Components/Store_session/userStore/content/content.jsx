import React from 'react'
import ContentCrd from './contentCrd.jsx'

class Content extends React.Component{

    constructor(){
        super()
        this.state = {
            contents:[]
        }
    }

   componentDidMount(){
       this.getAllcontents()
      
   }
    getAllcontents = async()=>{
        const FetchAll= await fetch(`https://still-cover-backend.uc.r.appspot.com/Feed/pageMedia/${this.props.id}`)
        const response = await FetchAll.json()
        if(response.results){
          this.setState({contents:response.results})
        }
      }
     
    render(){
       
        return(
            <div className="flex">
                <ContentCrd
                contents={this.state.contents}
                />
            </div>
        )
    }
}
export default Content