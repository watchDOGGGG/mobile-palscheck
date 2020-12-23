import React from 'react'
import { List, Avatar, Button, Skeleton } from 'antd';
import { Timeline, } from 'antd';

class SuggestionList extends React.Component {
  state = {
    initLoading: true,
    loading: false,
    data: [],
    list: [],
    mode: 'left'
  };

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
            <Timeline mode={this.state.mode}>
                <Skeleton avatar title={false} loading={item.loading} active>
                <main class="mw6 center">
                    <article class="dt w-100 bb b--black-05 pb2 mt2" href="#0">
                    <div class="dtc w2 w3-ns v-mid">
                    <Avatar size={40}>USER</Avatar>
                    </div>
                    <div class="dtc v-mid pl3">
                        <h1 class="f6 f5-ns fw6 lh-title black mv0">Young Gatchell </h1>
                        <h2 class="f6 fw4 mt0 mb0 black-60">@yg</h2>
                    </div>
                    <div class="dtc v-mid">
                        <form class="w-100 tr">
                        <button class="f6 button-reset bg-white ba b--black-10 dim pointer pv1 black-60" type="submit">+ Follow</button>
                        </form>
                    </div>
                    </article>
                    <article class="dt w-100 bb b--black-05 pb2 mt2" href="#0">
                    <div class="dtc w2 w3-ns v-mid">
                    <Avatar size={40}>USER</Avatar>
                    </div>
                    <div class="dtc v-mid pl3">
                        <h1 class="f6 f5-ns fw6 lh-title black mv0">Young Gatchell </h1>
                        <h2 class="f6 fw4 mt0 mb0 black-60">@yg</h2>
                    </div>
                    <div class="dtc v-mid">
                        <form class="w-100 tr">
                        <button class="f6 button-reset bg-white ba b--black-10 dim pointer pv1 black-60" type="submit">+ Follow</button>
                        </form>
                    </div>
                    </article>
                    <article class="dt w-100 bb b--black-05 pb2 mt2" href="#0">
                    <div class="dtc w2 w3-ns v-mid">
                    <Avatar size={40}>USER</Avatar>
                    </div>
                    <div class="dtc v-mid pl3">
                        <h1 class="f6 f5-ns fw6 lh-title black mv0">Young Gatchell </h1>
                        <h2 class="f6 fw4 mt0 mb0 black-60">@yg</h2>
                    </div>
                    <div class="dtc v-mid">
                        <form class="w-100 tr">
                        <button class="f6 button-reset bg-white ba b--black-10 dim pointer pv1 black-60" type="submit">+ Follow</button>
                        </form>
                    </div>
                    </article>
                </main>
            </Skeleton>
            </Timeline>
        )}
      />
    );
  }
}

export default SuggestionList
