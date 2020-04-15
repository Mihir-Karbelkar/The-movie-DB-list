import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/Navbar";
import ImageCardList from "./components/ImageCardList";
import "react-responsive-modal/styles.css";
import ReactImageAppear from "react-image-appear";

import { Modal } from "react-responsive-modal";
import "./App.css";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      api: "https://api.themoviedb.org/3",
      curr_index: 1,
      next_index: 2,
      api_key: "94ca532a43399c9f7cfca5925376824c",
      open: false,
      selected_index: 0,
    };
  }

  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.trackScrolling);
  }

  trackScrolling = () => {
    const wrappedElement = document.getElementById("movies");
    if (this.isBottom(wrappedElement)) {
      console.log("header bottom reached");
      this.callApi();
    }
  };

  callApi() {
    console.log(this.state.c);
    let params = {
      api_key: this.state.api_key,
      page: this.state.curr_index,
    };

    let query = Object.keys(params)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");

    let endpoint = "/discover/movie";
    fetch(this.state.api + endpoint + "?" + query)
      .then((res) => res.json())
      .then((result) => {
        let arr = this.state.items;
        if (arr.length == 0) {
          arr = result.results;
        } else {
          arr.push(...result.results);
        }
        this.setState({
          items: arr,
          curr_index: this.state.curr_index + 1,
        });
        console.log(this.state.items);
      });
  }

  componentDidMount() {
    document.addEventListener("scroll", this.trackScrolling);
    this.callApi();
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  handler = (id) => {
    console.log(id);
    this.setState({
      selected_index: id,
      open: true,
    });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };
  render() {
    let img_endpoint = "https://image.tmdb.org/t/p/w440_and_h660_face";

    const { open, selected_index, items } = this.state;
    return (
      <div>
        <NavBar />

        <div className="flex" id="movies" align="center">
          <ImageCardList
            items={this.state.items}
            onScroll={this.handleScroll}
            handler={this.handler}
          />
        </div>
        <div className="modal">
          {" "}
          <Modal open={open} onClose={this.onCloseModal} center>
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h2 class="modal-title" id="image-gallery-title">
                    {items.length == 0
                      ? ""
                      : items[selected_index].original_title}
                  </h2>
                </div>
                <div class="modal-body">
                  <ReactImageAppear
                    src={
                      img_endpoint +
                      (items.length == 0
                        ? ""
                        : items[selected_index].poster_path)
                    }
                    animation="zoomIn"
                    animationDuration="1s"
                    showLoader={false}
                  />{" "}
                </div>
                <div class="modal-footer">
                  <div
                    class="col-md-12 text-justify"
                    id="image-gallery-caption"
                  >
                    <p>
                      {items.length == 0 ? "" : items[selected_index].overview}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default App;
