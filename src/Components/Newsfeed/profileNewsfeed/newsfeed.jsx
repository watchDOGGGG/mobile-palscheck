import React from 'react'
import NewsFeedCard from './newsfeedCard'
import { Tabs } from 'antd';
import {EllipsisOutlined} from '@ant-design/icons';
import Media from '../../Dashboard/Media/media.jsx'
import PostPannel from '../postPannel/postpannel';
import BookMark from '../Bookmark/BookMars/bookmark.jsx'
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
        const FetchAll = await fetch(`https://still-cover-backend.uc.r.appspot.com/Feed/getFeed/${this.props.address}`)
        const response = await FetchAll.json()
        if(response.feeds){
            this.setState({Feeds:response.feeds})
        }else{
            this.setState({Feeds:response})
        }
    }
    render(){
        return(

                <article class="newfeed--3-art ba b--black-10">
                <Tabs defaultActiveKey="1" centered>
                    <TabPane tab={this.props.fullname?`${this.props.fullname} Feed`:`Feed`}key="1">
                        <PostPannel/>
                        {
                            this.state.Feeds.length < 1?
                            <PageLoading/>:
                                this.state.Feeds.length > 0?
                                <>
                                <NewsFeedCard
                                    AllFeeds={this.state.Feeds}
                                    loggedIn={this.props.loggedIn}
                                />
                                </>
                                :null
                        }
                        
                    </TabPane>
                    <TabPane tab="Gallery" key="2">
                        <Media 
                        fullname={this.props.fullname}
                        id={this.props.id}
                        />
                    </TabPane>
                    <TabPane tab="Bookmark" key="4">
                        <BookMark/>
                    </TabPane>
                </Tabs>
                </article>

        )
    }
}
export default NewsFeed
