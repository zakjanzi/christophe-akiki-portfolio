import "./styles/videos.css";

const VideoCard = (props) => {
  const { url, description, link, title } = props.video;
  return (
    <div
      className="card video-card-bg position-relative"
      style={{ width: "100%" }}
    >
      <div className="video-wrapper">
        <img
          src={url}
          className="card-img-top video-wrapper__img"
          alt={title}
        />
      </div>
      <div className="card-body px-3">
        <h5 className="card-title text-white text-center">{title}</h5>
        <p className="card-text">{description}</p>
        <a
          href={link}
          style={{ backgroundColor: props.buttonColor, color: "#fff" }}
          target="_blank"
          className="btn w-100 fixed-bottom position-absolute watch-button"
          rel="noreferrer"
        >
          Watch
        </a>
      </div>
    </div>
  );
};

export default VideoCard;
