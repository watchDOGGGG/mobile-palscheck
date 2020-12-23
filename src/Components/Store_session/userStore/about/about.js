import React from 'react'
import PublicIcon from '@material-ui/icons/Public';
import { CompassOutlined,EnvironmentOutlined,LinkOutlined,GlobalOutlined,
    InstagramOutlined,LinkedinOutlined,GooglePlusOutlined,FacebookOutlined,
    TwitterOutlined,
 } from '@ant-design/icons';

class About extends React.Component{
    constructor(){
        super()
        this.state = {
            offers:[]
        }
    }

    componentDidMount(){
        try{
            this.getPageOffers()
        }catch(error){

        }
    }
    
    getPageOffers = async()=>{
        const fetchOffers = await fetch(`https://still-cove-26148.herokuapp.com/Page/offers/${this.props.id}`)
        const response = await fetchOffers.json()
        if(response.offers){
            this.setState({offers:response.offers})
        }
    }

    render(){
        return(
            <div>
                  {/* All info */}
                <div className="dib center tl">

                <article class=" bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
                    
                <section class="mw5 bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
                    <h4 className="f5"><PublicIcon/>intro</h4>
                    
                <div class="tc">
                    <p className="De35t">
                        {this.props.about}
                    </p>
                </div>
                </section>
               
                <div class="dt dt--fixed w-100 tl" >
                    <span>
                    <LinkOutlined />offers
                    </span>
                        <div class=" black-70 v-mid bt b--black-10 pa2">
                            {
                                    this.state.offers.length > 0 ?
                                        this.state.offers.map((offer, i) =>{
                                            return(
                                                <>
                                                <span className="ml4 f5 ba br3 b--black-10 pa1">{offer.offers}</span>
                                                </>
                                            )
                                            
                                        }) :
                                        null
                                }
                            </div>
                    </div>

                   <div className="Lo24t">
                    {/* location */}
                    <span>
                    <CompassOutlined />Location
                    </span>
                    <section class="pa4 pa5-l black-70 bt b--black-10">
                    <div class="mb4-l cf">
                        <h1 class="fl w-100 pv0 f6 fw6 ttu tracked mb4"><EnvironmentOutlined /> places</h1>
                        <article class="fl w-50 dib-ns w-auto-ns mr4-m mr5-l mb4 pr2 pr0-ns">
                        <h4 class="f5 f4-l fw6">SF</h4>
                        <span class="f7 f6-l db black-70">837 Larkin St.</span>
                        <span class="f7 f6-l black-70">San Francisco, CA 94109 </span>
                        <a class="f6 db fw6 pv3 black-70 link dim" title="Call SF" href="tel:+12075555555">
                            +1 207-555-5555
                        </a>
                        </article>
                        <article class="fl w-50 dib-ns w-auto-ns mr4-m mr5-l mb4 pl2 pl0-ns">
                        <h4 class="f5 f4-l fw6">LA</h4>
                        <span class="f7 f6-l db black-70">
                            1111 Manor Way
                        </span>
                        <span class="f7 f6-l di black-70">
                            Los Angeles, CA 90048
                        </span>
                        <a href="tel:+13235555555" class="f6 db fw6 pv3 link dim black-70" title="Call the LA office.">
                            +1 323-555-5555
                        </a>
                        </article>
                        <article class="fl w-50 dib-ns w-auto-ns mr4-m mr5-l mb4 pr2 pr0-ns">
                        <h4 class="f5 f4-l fw6">London</h4>
                        <span class="f7 f6-l db black-70">11 Downey St.</span>
                        <span class="f7 f6-l black-70">London, UK</span>
                        <a href="tel:+5555555555" class="link dim f6 db fw6 pv3 black-70" title="Call the London office">+44 0 5555-5555</a>
                        </article>
                        <article class="fl w-50 dib-ns w-auto-ns mb4 pl2 pl0-ns">
                        <h4 class="f5 f4-l fw6">Tokyo</h4>
                        <span class="f7 f6-l db black-70">1982 Flangan Rd.</span>
                        <span class="f7 f6-l">Shinjuku, Tokyo</span>
                        <a href="tel:+444444444444" class="f6 db dim fw6 pv3 link black-70" title="Call Tokyo Office">
                            +99 5555-5555
                        </a>
                        </article>
                    </div>

                    <div class="dt dt--fixed w-100 tl " >
                    <span>
                    <LinkOutlined />External link and social media's
                    </span>
                        <div class=" black-70 v-mid bt b--black-10 pa1">
                            <a href="#" className="f5 ml4"><GlobalOutlined /> amzonon.com</a>
                            <a href="#" className="f5 ml4"><FacebookOutlined /> facebook</a>
                            <a href="#" className="f5 ml4"><TwitterOutlined /> twitter</a>
                            <a href="#" className="f5 ml4"><GooglePlusOutlined /> google+</a>
                            <a href="#" className="f5 ml4"><LinkedinOutlined /> linkedin</a>
                            <a href="#" className="f5 ml4"><InstagramOutlined /> instagram</a>
                        </div>
                    </div>
                    </section>

                </div>
                <div className="pr3dc2">
                    {/* shop description */}

                </div>
                </article>
                </div>

                
            </div>
        )
    }
}
export default About