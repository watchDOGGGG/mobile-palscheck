import React from 'react'
import { Link } from 'react-router-dom'
import StoresCrd from './StoreCrd/storeCrd.jsx'
class AllstoreTemp extends React.Component{
    constructor(){
        super()
        this.state = {
            pages:[]
        }
    }
   componentDidMount(){
       this.filterCategory()
   }
     filterCategory = async()=>{
         const GetAllPage = await fetch('https://still-cover-backend.uc.r.appspot.com/Page/')
         const response = await GetAllPage.json()
         if(response.pages){
            this.setState({pages:response.pages})
         }
     }
    
    render(){
        const {pages} = this.state
        return(
            <div>
               <div className="pa3 ml2 mt2 self-start">
               <Link to="/createpage" className="tl button blue db pointer"><button>Create page</button></Link>
               </div>
               <div>
                   <ul class="imglist">
                   {
                       pages.length > 0?
                       pages.map((page,i)=>{
                           return(
                            
                              <StoresCrd
                              key={i}
                              id={pages[i]._id}
                              name={pages[i].name}
                              address={pages[i].address}
                              desc={pages[i].desc}
                              profileImg={pages[i].profileImg}
                              /> 
                              
                           )
                       })
                       
                       :<p>no pages yet</p>
                   }
                </ul>
               </div>
            </div>
        )
    }
}
export default AllstoreTemp