import React, { Component } from "react";
import InfiniteScrolling from "./components/InfiniteScrolling";
import DropAndCrop from "./components/DropAndCrop";
import "./App.css";

class App extends Component {
  state = {
    selectedImage: null,
    dragEvent: null
  };

  handleDrag = (e, id) => {
    this.setState({ selectedImage: `https://picsum.photos/id/${id}/150/150` });
    this.setState({ dragEvent: e });
  };

  render() {
    const { dragEvent, selectedImage } = this.state;
    return (
      <div className="App bg-info">
        <h1 className="display-3 ">Photify</h1>
        <h4>search and modify over hundreds of images</h4>
        <DropAndCrop selectedImage={selectedImage} dragEvent={dragEvent} />
        <InfiniteScrolling handleDrag={this.handleDrag} />
      </div>
    );
  }
}

export default App;
