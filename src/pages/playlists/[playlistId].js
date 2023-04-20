import { useRouter } from "next/router";
import Items from ".";

function Playlist({}) {
  const router = useRouter();
  const handlePrevious = () => {
    router.push("/homepage");
  };

  const { playlistId, title } = router.query;
  return (
    <div>
      <button onClick={handlePrevious} className="button">
        Main Page
      </button>
      <div className="heading-playlist">
        <p>{title}</p>
      </div>
      <Items playlistId={playlistId} />
    </div>
  );
}

export default Playlist;
