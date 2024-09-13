import "./GroupList.css";
import GroupCard from "../GroupCard/GroupCard";
import { egsStore } from "@/app/store/store";

export default function GroupList({ swapPlayers, swapPlayersData, setSwapPlayersData }) {
    const egs = egsStore(state => state.egs);
    return (
        <section>
            <div className="group-list">
                {
                    Object.values(egs).map(eg => (
                        <GroupCard
                            key={eg.id}
                            eg={eg}
                            swapPlayers={swapPlayers}
                            swapPlayersData={swapPlayersData}
                            setSwapPlayersData={setSwapPlayersData}
                        />
                    ))
                }
            </div>
        </section>
    );
};