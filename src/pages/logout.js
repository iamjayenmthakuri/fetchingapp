import { useEffect } from "react";
import { useRouter } from "next/router";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("token");

    router.push("/login");
  }, []);

  return (
    <div>
      <h1>Logout Page</h1>
      <p>You have been logged out.</p>
    </div>
  );
};

export default LogoutPage;
