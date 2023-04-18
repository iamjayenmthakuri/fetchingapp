import { useRouter } from "next/router";
import Items from ".";

function Playlist({}) {
  const router = useRouter();

  const { playlistId, title } = router.query;
  return (
    <>
      <div className="heading-playlist">
        <p>{title}</p>
      </div>
      <Items playlistId={playlistId} />
    </>
  );
}

export default Playlist;
