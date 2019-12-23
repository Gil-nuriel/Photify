import React, { Component, Fragment } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

class InfiniteScrolling extends Component {
  state = {
    images: [],
    page: 1
  };

  componentDidMount() {
    const { page } = this.state;
    axios(`https://picsum.photos/v2/list?page=${page}`)
      .then(res => {
        console.log(res.data);
        this.setState({ images: [...res.data] });
      })
      .catch(err => {
        console.log(err);
      });
  }

  fetchData = () => {
    this.setState({ page: this.state.page + 1 });
    axios
      .get(`https://picsum.photos/v2/list?page=${this.state.page}`)
      .then(res => {
        console.log(res.data);
        this.setState({ images: [...this.state.images, ...res.data] });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleDragAndDrop = (e, id) => {
    this.props.handleDrag(e, id);
  };

  render() {
    const { images } = this.state;
    return (
      <Fragment>
        <InfiniteScroll
          dataLength={images.length}
          next={this.fetchData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {images.map(({ id }) => (
            <img
              key={id}
              src={`https://picsum.photos/id/${id}/150/150`}
              alt=" "
              draggable="true"
              onDragEnd={e => this.handleDragAndDrop(e, id)}
            />
          ))}
        </InfiniteScroll>
      </Fragment>
    );
  }
}
export default InfiniteScrolling;
