import { TransferWithinAStationOutlined } from '@material-ui/icons'
import React from 'react'
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
    componentDidUpdate(){
        // this.renderImg()
    }
    renderImg = () => {
        const buttons = document.querySelectorAll('.project');
        const overlay = document.querySelector('.overlay');
        const overlayImage = document.querySelector('.overlay__inner img');

        function open(e) {
            overlay.classList.add('open');
            const src = e.currentTarget.querySelector('img').src;
            overlayImage.src = src;
        }

        function close() {
            overlay.classList.remove('open');
        }

        buttons.forEach(button => button.addEventListener('click', open));
        overlay.addEventListener('click', close);
    }


  
    //fetch All user images to gallery
    getGallery = async()=>{
        const fetchAll = await fetch(`https://still-cove-26148.herokuapp.com/Feed//Gallery/${this.props.id}`,{
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
                          <img class="project__image db w-100 br3" src={imgs.url} />
                          </div>
                      </div>

                      <div class="overlay3l">
                          <div class="overlay__inner">
                              <button class="close">close X</button>
                              <img />
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
