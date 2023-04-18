import { useState } from "react";
import useFetch from "@/components/useFetch";

const Items = (props) => {
  const { playlistId } = props;
  const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=${playlistId}&key=${process.env.customKey}`;
  const [detail, setDetail] = useState();
  const handleClick = (id) => {
    if (detail === id) {
      setDetail(null);
    } else {
      setDetail(id);
    }
  };
  const { data, isPending, error } = useFetch(url);

  if (isPending) {
    return <div className="loading"></div>;
  }

  if (error) {
    return (
      <div className="error">
        {error}:<br></br>
        <span> Something Went Wrong. TRY AGAIN!!!</span>
        <a href="http://localhost:3000/">Click Here :http://localhost:3000/ </a>
      </div>
    );
  }

  return (
    <div>
      <div className="playlist-grid">
        {data.map((item) => (
          <div
            key={item.id}
            className="playlist-cards"
            style={{
              height: detail === item?.etag ? "auto" : "300px",
              width: detail === item?.etag ? "400px" : "auto",
            }}
            onClick={() => handleClick(item.etag)}
          >
            {/* <img
              src={item.snippet.thumbnails.high.url}
              alt={item.snippet.title}
              className="thumbnail"
            /> */}
            <div className="info">
              {detail !== item?.etag ? (
                <>
                  <img
                    src={item.snippet.thumbnails.high.url}
                    alt={item.snippet.title}
                    className="thumbnail"
                  />
                </>
              ) : (
                <>
                  <img
                    src={item.snippet.thumbnails.high.url}
                    alt={item.snippet.title}
                    className="thumbnails"
                  />
                  <h2 className="title">{item.snippet.title}</h2>
                  <p className="author">Author:{item.snippet.channelTitle}</p>
                  <p className="publishedDate">
                    Published Date:{item.snippet.publishedAt}
                  </p>
                  <p className="description">
                    <span>Description:</span>
                    <br></br>
                    {item.snippet.description}
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
