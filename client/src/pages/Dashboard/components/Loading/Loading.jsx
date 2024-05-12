import "./styles/loading.css";

const Loading = () => {
  return (
    <div className="load" onClick={(e) => e.stopPropagation()}>
      <div className="one"></div>
      <div className="two"></div>
      <div className="three"></div>
    </div>
  );
};

export default Loading;
