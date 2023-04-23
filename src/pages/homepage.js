import React, { useState } from "react";
import useFetch from "@/components/useFetch";
import Items from "@/pages/playlists";
import Router from "next/router";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/homepage.module.css";

export default function Homepage() {
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/");
    } else {
      setToken(storedToken);
    }
  }, [router]);

  const { playlistId } = useState(null);

  const { data, isPending, error } = useFetch(
    `${process.env.youtubeLink}playlists?part=snippet&channelId=${process.env.channelId}&maxResults=6&key=${process.env.customKey}`
  );
  if (isPending) {
    return <div className="loading"></div>;
  }

  if (error) {
    return (
      <div className="error">
        {error}:<br></br>
        <span className="spans">You are not LoggedIn Click Here :</span>
        <a href={`${process.envbaseurl}`}>
          {" "}
          <span className="span">Login Page</span>
        </a>
      </div>
    );
  }
  const ViewPlaylist = (id, title) => {
    Router.push({
      pathname: `playlists/${id}`,
      query: { title },
    });
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log(token, "remove");
    window.location.href = "/";
  };
  return (
    <>
      <Head>
        <title>Welcome to the Homepage</title>
        <meta name="description" content="Login in with our App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.heading}>
            <h1>Welcome to Youtube Playlist</h1>
            <p>
              This are the playlist of Mr.Arun Maini, the UK youtuber from his
              channel MR.whosetheboss.
            </p>
            <div className={styles.nav}>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
          {playlistId ? (
            playlistId && <Items playlistId={playlistId} />
          ) : (
            <div className={styles.playlistsWrapper}>
              {data.map((item) => (
                <div
                  className={styles.playlists}
                  key={item.id}
                  onClick={() => ViewPlaylist(item.id, item.snippet.title)}
                >
                  {" "}
                  <div className={styles.playlist}>
                    <p>{item.snippet.title}</p>
                    <img
                      src={item.snippet.thumbnails.high.url}
                      alt={item.snippet.title}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
