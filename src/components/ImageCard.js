import React, { Component } from "react";
import ReactImageAppear from "react-image-appear";

import "../css/ImageCard.css";
export default class ImageCard extends Component {
  render() {
    const { title, desc, img, handler } = this.props;
    return (
      <div className="img-container" onClick={handler}>
        {/* <img src={img} /> */}
        <ReactImageAppear
          src={img}
          animation="zoomIn"
          animationDuration="1s"
          showLoader={false}
        />
        <div className="overlay">
          <span>
            <h4>{title}</h4>
            <span className="line"></span>
            <p>{desc}</p>
            <button className="like">
              <i className="fa fa-thumbs-up fa-3x "></i>
            </button>
          </span>
        </div>
      </div>
    );
  }
}
