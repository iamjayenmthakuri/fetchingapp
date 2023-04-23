import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import useFetch from "@/components/useFetch";
import styles from "../playlists/playlist.module.css";

const Items = (props) => {
  const router = useRouter();
  const handlePlaylist = () => {
    router.push("/homepage");
  };

  const handlePrevious = () => {
    router.push("/homepage");
  };

  const { playlistId, title, id } = props;
  const url = `${process.env.youtubeLink}playlistItems?part=snippet&maxResults=6&playlistId=${playlistId}&key=${process.env.customKey}`;
  const [detail, setDetail] = useState();
  const [hide, setHide] = useState(false);
  const viewDetail = (id) => {
    if (detail === id) {
      setDetail(null);
    } else {
      setDetail(id);
      setHide(!hide);
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
        {hide ? (
          <>
            {" "}
            <div className={styles.heading}>
              <h1>{title}</h1>
              <p>
                This is the video of {title}, playlist that you have selected
                from Playlist Page
              </p>
              <div className={styles.nav}>
                {" "}
                <button onClick={handlePlaylist} className="button">
                  Back to PLaylist
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.heading}>
              <h1>{title}</h1>
              <p>
                This are the videos of {title}, playlist that you have selected
                from Home page
              </p>
              <div className={styles.nav}>
                {" "}
                <button onClick={handlePrevious} className="button">
                  Back to Main Page
                </button>
              </div>
            </div>
          </>
        )}
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
                    <Head>
                      <title>{item.snippet.title}</title>
                      <meta
                        name="description"
                        content="Login in with our App"
                      />
                      <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                      />
                    </Head>

                    <div className={styles.videoDetail}>
                      <h1 className={styles.detailTitle}>
                        {item.snippet.title}
                      </h1>
                      <img
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
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Items;
