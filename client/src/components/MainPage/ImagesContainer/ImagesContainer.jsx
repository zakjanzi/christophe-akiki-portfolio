import React, { useState } from "react";
import "./ImagesContainer.css";
import Masonry from "react-masonry-css";
import { NODE_ENV, DEV_BASE_URL, PROD_BASE_URL } from "../../../api/urlConfig";
import ImageWindow from "../ImageWindow/ImageWindow";

export default function ImagesContainer(props) {
  const { allImages, loadingImages } = props;
  const [currentImage, setCurrentImage] = useState("");
  const [isNew, setIsNew] = useState(false);
  const SERVER_URL = NODE_ENV === "prod" ? PROD_BASE_URL : DEV_BASE_URL;

  const openImage = (e) => {
    const image = allImages.find((img) => img._id === e.target.id);
    setCurrentImage(image);
    setIsNew(true);
  };

  const imgs = allImages.map((img) => {
    return (
      <div
        className="image-holder"
        style={{
          backgroundImage: `url(${SERVER_URL}/images/${img.originalName})`,
        }}
        key={img._id}
      >
        <div className="overly" onClick={openImage} id={img._id}>
          <h3>{img.album}</h3>
        </div>
      </div>
    );
  });

  const myBreakPoints = {
    default: 4,
    1100: 3,
    700: 2,
  };

  return (
    <div className="images-wraper w-100">
      {loadingImages && (
        <div className="load-images">
          <div className="one"></div>
          <div className="two"></div>
          <div className="three"></div>
        </div>
      )}
      {imgs.length === 0 && !loadingImages ? (
        <div className="no-posts-wraper">
          <h1 className="no-posts">No Posts to show</h1>
        </div>
      ) : (
        <Masonry
          breakpointCols={myBreakPoints}
          className="images-container container"
          columnClassName="images-container-column"
        >
          {imgs}
        </Masonry>
      )}

      <div className="w-100 d-flex justify-content-center">
        {currentImage && (
          <ImageWindow
            image={currentImage}
            isNew={isNew}
            setIsNew={() => setIsNew((prev) => false)}
          />
        )}
      </div>
    </div>
  );
}
