import { setHomeLoader } from "../Client/ClientState";

const NetworkError = ({ setError }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "10vw",
      }}>
      <div className="error-container">
        <h1 className="error-title">Network Error</h1>
        <p className="error-message">
          We're experiencing connectivity issues. Please try again later
        </p>
        <button
          className="try-again"
          onClick={() => {
            setError(false);
            setHomeLoader(true);
          }}>
          Try again
        </button>
      </div>
    </div>
  );
};

export default NetworkError;
