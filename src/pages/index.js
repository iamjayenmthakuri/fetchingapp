import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
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
    <>
      <Head>
        <title>Login Page</title>
        <meta name="description" content="Login in with our App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <section className={styles.loginsection}>
        <div>
          <div>
            <h1 className={styles.heading}>Login</h1>
            <p className={styles.description}>
              Please fill and submit to login{" "}
            </p>
          </div>
          <form onSubmit={handleLogin} className={styles.form}>
            <div className={styles.formLogin}>
              <label htmlFor="email">
                Email or Phone number
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>
              <label htmlFor="password">
                password{" "}
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </label>
            </div>
          </form>
          <div className={styles.rem}>
            <div>
              <input type="checkbox" className={styles.checkbox} />
              <span>Remember me</span>{" "}
            </div>
            <div>
              <Link href="/forget" legacyBehavior>
                <a className={styles.link}>Forgot Password?</a>
              </Link>
            </div>
          </div>
          <div className={styles.mainbutton}>
            <button
              className={styles.loginButton}
              type="submit"
              onClick={handleSubmit}
            >
              Login{" "}
            </button>
          </div>
          <div className={styles.loginreference}>
            Don't have an account?
            <Link href="/signup" legacyBehavior>
              <a className={styles.register}>Register</a>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
