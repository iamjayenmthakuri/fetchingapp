import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import useFetch from "@/components/useFetch";
import styles from "../playlists/playlist.module.css";

const Items = (props) => {
  const router = useRouter();

  const handlePrevious = () => {
    router.back();
  };

  const { playlistId, title } = props;
  const url = `${process.env.youtubeLink}playlistItems?part=snippet&maxResults=6&playlistId=${playlistId}&key=${process.env.customKey}`;
  const [detail, setDetail] = useState();
  const [hide, setHide] = useState(false);
  console.log("hide", hide);
  const viewDetail = (id) => {
    if (detail !== id) {
      setDetail(id);
      setHide(!hide);
    } else if (detail === id) {
      setHide(null);
      setDetail(id);
    }
  };
  const { data, isPending, error } = useFetch(url);

  if (isPending) {
    return <div className={styles.loading}></div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        {error}:<br></br>
        <span className={styles.spans}>You are not LoggedIn Click Here :</span>
        <a href={`${process.env.baseurl}`}>
          {" "}
          <span className={styles.span}>Login Page</span>
        </a>
      </div>
    );
  }

  return (
    <main>
      <div className={styles.wrapper}>
        <div className={styles.heading}>
          <h1>{title}</h1>
          <p>
            This are the videos of {title}, playlist that you have selected from
            playlist page
          </p>
          <div className={styles.nav}>
            {" "}
            <button onClick={handlePrevious} className="button">
              Back to Main Page
            </button>
          </div>
        </div>

        <div className={styles.playlistsWrapper}>
          {data.map((item) => (
            <div
              className={styles.playlists}
              key={item.id}
              onClick={() => viewDetail(item.etag)}
            >
              <div>
                {detail !== item?.etag ? (
                  <>
                    {!hide && (
                      <div className={styles.playlist}>
                        {" "}
                        <p>{item.snippet.title}</p>
                        <img
                          src={item.snippet.thumbnails.high.url}
                          alt={item.snippet.title}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {hide && (
                      <div className={styles.videoDetail}>
                        <h1 className={styles.detailTitle}>
                          {item.snippet.title}
                        </h1>
                        <img
                          // onClick={setHide(false)}
                          src={item.snippet.thumbnails.high.url}
                          alt={item.snippet.title}
                          className={styles.detailImage}
                        />

                        <h4 className={styles.author}>
                          <span>Author: </span>
                          {item.snippet.channelTitle}
                        </h4>
                        <p className={styles.publishedDate}>
                          Published Date:{item.snippet.publishedAt}
                        </p>
                        <h3 className={styles.description}>
                          <span>Description:</span>
                          <br></br>
                          {item.snippet.description}
                        </h3>
                      </div>
                    )}
                  </>
                )}
              </div>
              {/* <div>
                {{
                  if(detail = !item?.etag) {
                    <>
                      {!hide && (
                        <div className={styles.playlist}>
                          {" "}
                          <p>{item.snippet.title}</p>
                          <img
                            src={item.snippet.thumbnails.high.url}
                            alt={item.snippet.title}
                          />
                        </div>
                      )}
                    </>;
                  },
                }}
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Items;
