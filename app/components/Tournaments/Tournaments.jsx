"use client";
import useFetch from "../../hooks/useFetch";
import Tournament from "../Tournament/Tournament";
import Gallery from "../Gallery/Gallery";
import Navbar from "../Navbar/Navbar";
import { useModal } from "../../context/ModalContext";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import CreateTournament from "../Forms/CreateTournament";

export default function Tournaments() {
  const { data, setData, error, loading } = useFetch(
    `${process.env.NEXT_PUBLIC_URL}/api/tournaments`,
  );
  const { setContent } = useModal();

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <div>
      <Navbar>
        <li>
          <button
            onClick={() =>
              setContent({
                content: <CreateTournament setTournaments={setData} />,
                title: "Create Tournament",
              })
            }
            className="tertiary"
          >
            <i className="fa-solid fa-plus" /> Create Tournament
          </button>
        </li>
      </Navbar>
      <Gallery>
        {Object.values(data).map((tournament) => (
          <Tournament key={tournament.id} tournament={tournament} />
        ))}
      </Gallery>
    </div>
  );
}
