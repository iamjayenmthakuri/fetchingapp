import React, { useState } from "react";
import useFetch from "@/components/useFetch";
import Items from "@/pages/playlists";
import Router from "next/router";
import { useEffect } from "react";
import { useRouter } from "next/router";

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
    `${process.env.youtubeLink}playlists?part=snippet&channelId=${process.env.channelId}&maxResults=20&key=${process.env.customKey}`
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
  const ViewVideos = (id, title) => {
    // setPlaylistId(id);
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
    <div>
      {token && (
        <h1 className="h1">
          You are loggedIn with token id: <span className="span">{token}</span>
        </h1>
      )}
      <button className="button" onClick={handleLogout}>
        Logout
      </button>
      <div className="playlist-heading-container">
        <h1 className="my-playlist-heading">
          Youtube <span>Playlist</span>
        </h1>
        {playlistId ? (
          playlistId && <Items playlistId={playlistId} />
        ) : (
          <div className="main">
            {" "}
            <div className="playlist-grid">
              {data.map((item) => (
                <div
                  key={item.id}
                  className="playlist-card"
                  onClick={() => ViewVideos(item.id, item.snippet.title)}
                >
                  <img
                    src={item.snippet.thumbnails.high.url}
                    alt={item.snippet.title}
                    className="thumbnail"
                  />
                  <div className="info">
                    <h2 className="title">{item.snippet.title}</h2>
                    {/* <Playlist title={item.snippet.title} /> */}
                    {/* <p className="description">{item.snippet.description}</p> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
