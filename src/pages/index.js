import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/loginpage.module.css";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    if (!email.match(emailRegex)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!password.match(passwordRegex)) {
      alert(
        "Password must contain at least 8 characters, including 1 uppercase letter, 1 lowercase letter, and 1 number."
      );
      return;
    }
    const token = Math.random().toString(36).substr(2);

    localStorage.setItem("token", token);
    router.push("/homepage");
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      router.push("/homepage");
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.form}>
        <h1 className={styles.h1}>Login </h1>
        <div>
          <label className={styles.label} htmlFor="email">
            Email:
          </label>
          <input
            className={styles.input}
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label className={styles.label} htmlFor="password">
            Password:
          </label>
          <input
            className={styles.input}
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button className={styles.button} type="submit" onClick={handleSubmit}>
          Log in
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
