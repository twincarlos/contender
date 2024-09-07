import "./Status.css";

export default function Status({ status }) {
    // return <i className={`status ${status.split(" ").join("-")} fa-solid fa-circle`} />;
    return <span className={`status ${status.split(" ").join("-")}`}>{status}</span>
};