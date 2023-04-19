// import { useEffect, useState } from "react";

// const HomePage = () => {
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
//   };

//   return (
//     <>
//       <h1>Welcome to the home page!</h1>
//       {token && <p>Your token is: {token}</p>}
//       <button onClick={handleLogout}>Logout</button>
//     </>
//   );
// };

// export default HomePage;
