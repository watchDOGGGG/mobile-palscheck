import React from 'react'
import NewsFeedCard from './newsfeedCard'
import { Tabs } from 'antd';
import PagePostPannel from '../PagepostPannel/postpannel.jsx';
import PageLoading from '../../Loading/pageLoading'
const { TabPane } = Tabs;

class NewsFeed extends React.Component{
    constructor(){
        super()
        this.state = {
            Feeds:[]
        }
    }
    componentDidUpdate(){
        this.FetchAllFeed()
    }
    FetchAllFeed = async()=>{
        const FetchAll = await fetch(`https://still-cove-26148.herokuapp.com/Feed/pageFeed/${this.props.id}`,)
        const response = await FetchAll.json()
        if(response.results){
            this.setState({Feeds:response.results})
        }else{
            this.setState({Feeds:response})
        }
    }
    render(){
        
        return(

                <article class="newfeed--3-art center br4 pa3 pa4-ns ba b--black-10">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="palsFeed" key="1">
                        <PagePostPannel
                        pagename={this.props.pagename}
                        id={this.props.id}
                        />
                        {
                            this.state.Feeds.length === 0?
                                <PageLoading/>:
                                <NewsFeedCard
                                    AllFeeds={this.state.Feeds}
                                />
                        }
                        
                    </TabPane>
                </Tabs>
                </article>

        )
    }
}
export default NewsFeed
