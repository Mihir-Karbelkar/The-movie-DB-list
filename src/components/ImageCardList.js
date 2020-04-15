import React, { Component } from "react";
import ImageCard from "./ImageCard";
let img_endpoint = "https://image.tmdb.org/t/p/w440_and_h660_face";
export default class ImageCardList extends Component {
  createRow = (items) => {
    const { onScroll, handler } = this.props;
    let row = [];
    items.map((item, index) => {
      console.log(item.original_title);
      row.push(
        <div className="col-sm col-xs-12 mx-auto my-3" key={index}>
          <ImageCard
            title={item.original_title}
            desc={item.overview}
            img={img_endpoint + item.poster_path}
            key={index}
            handler={() => handler(index)}
          />
        </div>
      );
    });
    return row;
  };

  render() {
    const { items } = this.props;

    return <div className="row">{this.createRow(items)}</div>;
  }
}
