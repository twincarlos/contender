"use client";
import Tournaments from "./components/Tournaments/Tournaments";
import Navbar from "./components/Navbar/Navbar";
import CreateTournament from "./components/Forms/CreateTournament";
import { useModal } from "./context/ModalContext";
import useFetch from "./hooks/useFetch";
import Error from "./components/Error/Error";
import Loading from "./components/Loading/Loading";

export default function Home() {
  const { setContent } = useModal();

  const { data, setData, error, loading } = useFetch("/api/tournaments");

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
                  content: (
                    <CreateTournament
                      setTournaments={setData}
                      closeModal={() => setContent(null)}
                    />
                  ),
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
      <Tournaments tournaments={data} />
    </main>
  );
};