"use client";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/Navbar/Navbar";
import { useTournamentEvents } from "@/app/store/store";
import Loading from "@/app/components/Loading/Loading";

export default function Event() {
    const { tournamentEvent, setTournamentEvent } = useTournamentEvents();
    const { eventId } = useParams();

    const { loading } = useFetch({
        url: `/api/tournament-event/${eventId}`, cb: ({ tournamentEvent }) => {
            setTournamentEvent(tournamentEvent);
        }
    });

    if (loading) return <Loading />;

    return (
        <main>
            <Navbar>
                <h1>{tournamentEvent.name}</h1>
                <ul>
                    <li>
                        <button>
                            <i className="fa-solid fa-gears" /> Update Event
                        </button>
                    </li>
                </ul>
            </Navbar>
        </main>
    );
};