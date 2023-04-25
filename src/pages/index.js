import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/loginpage.module.css";

// <iframe
// src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.138380039662!2d85.30164137397479!3d27.68211762660648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19c87db6e921%3A0x398a299e42c965!2sVarosa%20Technology%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1682415519654!5m2!1sen!2snp"
// frameborder="0"
// width="400"
// height="300"
// style={{ border: 0 }}
// allowFullScreen=""
// loading="lazy"
// referrerPolicy="no-referrer-when-downgrade"
// ></iframe>

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [token, setToken] = useState("");

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
        <div className={styles.wrapper}>
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
