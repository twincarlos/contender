"use client";
import Tournaments from "./components/Tournaments/Tournaments";
import Navbar from "./components/Navbar/Navbar";
import CreateTournament from "./components/Forms/CreateTournament";
import { useModal } from "./context/ModalContext";
import useFetch from "./hooks/useFetch";
import Error from "./components/Error/Error";
import Loading from "./components/Loading/Loading";
import { useTournaments } from "./store/store";

export default function Home() {
  const { setContent } = useModal();
  const { tournaments, setTournaments } = useTournaments();

  const { error, loading } = useFetch({
    url: "/api/tournaments",
    cb: setTournaments
  });

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <main>
      <Navbar>
        <h1>Tournaments</h1>
        <ul>
          <li>
            <button
              onClick={() =>
                setContent({
                  content: <CreateTournament />,
                  title: "Create Tournament",
                })
              }
              className="tertiary"
            >
              <i className="fa-solid fa-plus" /> Create Tournament
            </button>
          </li>
        </ul>
      </Navbar>
      <Tournaments tournaments={tournaments} />
    </main>
  );
};