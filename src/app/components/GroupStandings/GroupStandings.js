import "./GroupStandings.css";

export default function GroupStandings({ gps }) {
    return (
        <div className="group-standings">
            {
                gps.map(gp => (
                    <div key={gp.id}>
                        <p>{gp.ep.tp.name}</p>
                    </div>
                ))
            }
        </div>
    );
};