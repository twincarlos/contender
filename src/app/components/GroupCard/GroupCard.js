import "./GroupCard.css";
import MatchList from "../MatchList/MatchList";
import GroupStandings from "../GroupStandings/GroupStandings";
import { gmsStore, gpsStore } from "@/app/store/store";

export default function GroupCard({ eg }) {
    const gps = gpsStore(state => state.gps[eg.id]);
    const gms = gmsStore(state => state.gms[eg.id]);
    return (
        <div className="group-card card">
            <div className="group-header card-header">
                <p>Group {eg.number}</p>
            </div>
            <GroupStandings gps={Object.values(gps)} />
            <MatchList ms={Object.values(gms)} />
        </div>
    );
};