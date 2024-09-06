import "./DrawRound";
import { dmsStore } from "@/app/store/store";
import DrawMatch from "../DrawMatch/DrawMatch";
import { BeingDrawRoundButton } from "../Buttons/BeginDrawRoundButton";

export default function DrawRound({ round }) {
    const drawRound = dmsStore(state => state.dms[round]);
    return (
        <div className="draw-round">
            <h1>{round}</h1>
            <BeingDrawRoundButton round={round} />
            { Object.values(drawRound).map(dm => <DrawMatch key={dm.id} dm={dm} />) }
        </div>
    );
};