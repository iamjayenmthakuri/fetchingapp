import React, { useState } from "react";
import useFetch from "@/components/useFetch";
import Items from "@/pages/playlists";
import Router from "next/router";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/homepage.module.css";
import { darkModeState, toggleDarkModeState } from "@/components/gobalState";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function Homepage() {
  const isDarkModeEnabaled = useRecoilValue(darkModeState);
  const toggleDarkMode = useSetRecoilState(toggleDarkModeState);

  const router = useRouter();
  const [token, setToken] = useState("");
  const [search, setSearch] = useState("");
  // const [filteredData, setFilteredData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
    if (event.target.value === "") {
      setSuggestions([]);
    } else {
      setSuggestions(
        data.filter((item) =>
          item.snippet.title
            .toLowerCase()
            .includes(event.target.value.toLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/");
    } else {
      setToken(storedToken);
    }
  }, [router]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log(token, "remove");
    window.location.href = "/";
  };

  const { playlistId } = useState(null);

  const { data, isPending, error } = useFetch(
    `${process.env.youtubeLink}playlists?part=snippet&channelId=${process.env.channelId}&maxResults=9&key=${process.env.customKey}`
  );

  // useEffect(() => {
  //   if (data) {
  //     setFilteredData(
  //       data.filter((item) =>
  //         item.snippet.title.toLowerCase().includes(search.toLowerCase())
  //       )
  //     );
  //   }
  // }, [data, search]);

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
    localStorage.setItem("playlistId", id);
    Router.push({
      pathname: `playlists/${id}`,
      query: { title },
    });
  };

  return (
    <>
      <Head>
        <title>Welcome to the Homepage</title>
        <meta name="description" content="Login in with our App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main
        className={styles.container}
        style={{
          backgroundColor: isDarkModeEnabaled ? "#2a2a2a" : "#A9A9A9",
        }}
      >
        <div></div>
        <div
          className={styles.searchBar}
          style={{
            backgroundColor: isDarkModeEnabaled ? "#A9A9A9" : "#2a2a2a",
          }}
        >
          <div>
            <input
              className={styles.handleChange}
              type="text"
              placeholder="Search"
              value={search}
              onChange={handleInputChange}
            />
            <ul
              className={styles.suggestions}
              style={{
                backgroundColor: isDarkModeEnabaled ? "#A9A9A9" : "#151515",
              }}
            >
              {suggestions.map((item) => (
                <li
                  key={item.id}
                  onClick={() => ViewPlaylist(item.id, item.snippet.title)}
                >
                  <span
                    style={{
                      color: isDarkModeEnabaled ? "black" : "white",
                    }}
                  >
                    {item.snippet.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.mode}>
            <input
              className={styles.darkMode}
              type="checkbox"
              value={isDarkModeEnabaled}
              onChange={toggleDarkMode}
            />
          </div>
        </div>
        <div className={styles.wrapper}>
          <div
            className={styles.heading}
            style={{ color: isDarkModeEnabaled ? "white" : "black" }}
          >
            <h1>Welcome to Youtube Playlist</h1>
            <p>
              This are the playlist of Mr.Arun Maini, the UK youtuber from his
              channel MR.whosetheboss.
            </p>
            <div className={styles.nav}>
              <button value={toggleDarkMode} onClick={handleLogout}>
                Logout
              </button>
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
