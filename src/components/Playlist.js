// import React, { useState } from "react";
// import useFetch from "./useFetch";
// import Items from "@/pages/playlists";
// import Router from "next/router";
// import { useEffect } from "react";

// export default function Mapping() {
//   const [token, setToken] = useState("");

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     setToken(storedToken);
//   }, []);
//   console.log(token, "key");

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     console.log(token, "remove");

//     window.location.href = "/";
//     const { playlistId } = useState(null);

//     const { data, isPending, error } = useFetch(
//       `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${process.env.customId}&maxResults=20&key=${process.env.customKey}`
//     );

//     if (isPending) {
//       return <div className="loading"></div>;
//     }

//     if (error) {
//       return (
//         <div className="error">
//           {error}:<br></br>
//           <span> Something Went Wrong. TRY AGAIN!!!</span>
//           <a href="http://localhost:3000/">
//             Click Here :http://localhost:3000/{" "}
//           </a>
//         </div>
//       );
//     }
//     const handleClick = (id, title) => {
//       // setPlaylistId(id);
//       console.log(data);
//       Router.push({
//         pathname: `playlists/${id}`,
//         query: { title },
//       });
//     };

//     return (
//       <div>
//         <div>
//           <h1>Welcome to the home page!</h1>
//           {token && <p>Your token is: {token}</p>}
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//         <div className="playlist-heading-container">
//           <h1 className="my-playlist-heading">
//             Youtube <span>Playlist</span>
//           </h1>
//           {playlistId ? (
//             playlistId && <Items playlistId={playlistId} />
//           ) : (
//             <div className="main">
//               {" "}
//               <div className="playlist-grid">
//                 {data.map((item) => (
//                   <div
//                     key={item.id}
//                     className="playlist-card"
//                     onClick={() => handleClick(item.id, item.snippet.title)}
//                   >
//                     <img
//                       src={item.snippet.thumbnails.high.url}
//                       alt={item.snippet.title}
//                       className="thumbnail"
//                     />
//                     <div className="info">
//                       <h2 className="title">{item.snippet.title}</h2>
//                       {/* <Playlist title={item.snippet.title} /> */}
//                       {/* <p className="description">{item.snippet.description}</p> */}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };
// }
