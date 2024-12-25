import './Status.css';

export default function Status ({ status }) {
  return (
    <span className={`Status caption ${status.split(' ').join('-').toLowerCase()}`}>
      {status.toUpperCase()}
    </span>
  );
};