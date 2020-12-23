import React from 'react'
import { List,Button, Skeleton } from 'antd';
import { Link } from 'react-router-dom';

class TrendingList extends React.Component {
  state = {
    initLoading: true,
    loading: false,
    data: [],
    list: [],
  };

  componentDidMount() {
  }


  render() {
    const { initLoading, loading, list } = this.state;
    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={this.onLoadMore}>loading more</Button>
        </div>
      ) : null;

    return (
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={item => (
                <Skeleton avatar title={false} loading={item.loading} active>
                <ul class="list f6 pl0 mt3 tl">
                  <li class="pv2">
                    <Link class="link blue lh-title">
                      <span class="fw7 underline-hover">#AmazingSerena</span>
                      <span class="db black-60">134.5k mentions</span>
                    </Link>
                  </li>   
                </ul>
            </Skeleton>
        )}
      />
    );
  }
}

export default TrendingList
