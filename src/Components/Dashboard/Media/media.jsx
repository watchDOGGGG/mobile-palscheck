
import React from 'react'
import {Image} from 'antd'
const localLink = 'http://localhost:4000'
const SeverLink = 'https://still-cover-backend.uc.r.appspot.com'
class Gallery extends React.Component{
    constructor(){
        super()
        this.state = {
            Imggallery:[]
        }
    
    }
    componentDidMount(){
        this.getGallery()
        
    }
  
   
    //fetch All user images to gallery
    getGallery = async()=>{
        const fetchAll = await fetch(`${SeverLink}/Feed//Gallery/${this.props.id}`,{
            headers:{token:localStorage.token}
        })
        const response = await fetchAll.json()
        console.log(response)
        if(response.gallery){
            this.setState({Imggallery:response.gallery})
        }
    }

    
    render(){
       
        return(
            <>

    <h1 className="ttc">{this.props.fullname}</h1>
    
  <section id="portfolio" className="">
  <main class="cf pa2">

      {
          this.state.Imggallery.length > 0?
          this.state.Imggallery.map((imgs,i)=>{
              return (
                  <>
                      <div class="project fl w-100 w-50-ns ph2">
                          <div  class="pv2 grow db no-underline black">
                          <Image class="project__image db w-100 br3" src={imgs.url} />
                          </div>
                      </div>
                  </>
              )
          })
                            : <p>No photos!</p>
                    }


    
</main>
  </section>
            </>
        )
    }
}
export default Gallery
