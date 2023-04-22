import { useRouter } from "next/router";
import Items from ".";
import Head from "next/head";

function Playlist({}) {
  const router = useRouter();

  const { playlistId, title } = router.query;
  return (
    <>
      {" "}
      <Head>
        <title>{title}</title>
        <meta name="description" content="Login in with our App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Items playlistId={playlistId} title={title} />
    </>
  );
}

export default Playlist;
