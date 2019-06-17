import { useState } from 'react'
import { connect } from "react-redux"
import { List, message, Avatar, Spin } from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import moment from 'moment'

moment.locale('es')

function handleInfiniteOnLoad() {  
  setLoading(!loading)
  if (travels.length > 14) {
    message.warning('Infinite List loaded all')
    setLoading(!loading)
    setHasMore(!hasMore)
    return;
  }
  this.fetchData(res => {
    data = data.concat(res.results);
    this.setState({
      data,
      loading: false,
    });
  });
};

function ContentComponent (props) {
  // console.log('props: ', props);
  const [loading, setLoading] = useState(false)
  const [hasMore, sethasMore] = useState(false)
  const {travels} = props
  // console.log('travels: ', travels);
  const typeSelected = props.type
  const travelsType = travels.filter((travel => travel.traveltype === typeSelected))
  return (
    <div className="demo-infinite-container">
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={handleInfiniteOnLoad}
        hasMore={!loading && hasMore}
        useWindow={false}
      >
        <List
          dataSource={travelsType}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                // avatar={
                //   // <Avatar src={avatarData.url} />
                // }
                title={<><p>Desde: {item.nameFrom}</p><p>Hasta: {item.nameTo}</p></>}
                description={item.email}
              />
              <div>Fecha: {moment(item.date).format('l')}</div>
            </List.Item>
          )}
        >
          {loading && hasMore && (
            <div className="demo-loading-container">
              <Spin />
            </div>
          )}
        </List>
      </InfiniteScroll>
      <style scoped>{`
        .demo-infinite-container {
          border: 1px solid #e8e8e8;
          border-radius: 4px;
          overflow: auto;
          padding: 8px 24px;
          height: 300px;
        }
        .demo-loading-container {
          position: absolute;
          bottom: 40px;
          width: 100%;
          text-align: center;
        }
      `}</style>
    </div>
  )
}


function mapStateToProps(state) {
  return {
    travels: state.travelsReducer.travels,
    state
  }
}

export default connect(mapStateToProps)(ContentComponent)