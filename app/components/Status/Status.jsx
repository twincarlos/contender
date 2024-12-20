import './Status.css';

export default function Status ({ status }) {
  return (
    <span className={`status ${status.toLowerCase()}`}>
      {status.toUpperCase()}
    </span>
  );
};