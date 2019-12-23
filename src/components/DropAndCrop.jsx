import React, { Component, Fragment } from "react";
import Dropzone from "react-dropzone";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import getCropImage from "../CropUtil";

class DropAndCrop extends Component {
  state = {
    selectedFile: null,
    crop: { x: 10, y: 10, aspect: 1 / 1 },
    canvasRef: React.createRef()
  };

  handleDrop = files => {
    console.log(files, this.props.selectedImage, this.props.dragEvent);
    this.setState({ selectedFile: URL.createObjectURL(files[0]) });
  };

  handleCrop = crop => {
    this.setState({ crop });
  };

  handleComplete = (crop, pixelCrop) => {
    const canvasRef = this.state.canvasRef.current;
    const sourceImage = this.props.selectedImage || this.state.selectedFile;
    getCropImage(canvasRef, sourceImage, pixelCrop);
  };

  render() {
    const { selectedFile, crop } = this.state;
    return (
      <Fragment>
        {selectedFile || this.props.selectedImage ? (
          <Fragment>
            <ReactCrop
              src={this.props.selectedImage || selectedFile}
              className="imagecrop"
              crop={crop}
              onChange={this.handleCrop}
              onComplete={this.handleComplete}
            />
            <br />
            <p>previw</p>
            <canvas ref={this.state.canvasRef} />
          </Fragment>
        ) : (
          <Dropzone
            onDrop={file => this.handleDrop(file)}
            accept="image/*"
            multiple={false}
            className="dropzone"
          >
            {({ getRootProps, getInputProps }) => (
              <div className="container">
                <div
                  {...getRootProps({
                    className: "dropzone",
                    onDrop: event => event.stopPropagation()
                  })}
                >
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </div>
            )}
          </Dropzone>
        )}
      </Fragment>
    );
  }
}

export default DropAndCrop;
