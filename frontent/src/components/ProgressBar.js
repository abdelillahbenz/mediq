function ProgressBar({ current, total }) {
  const percentage = (current / total) * 100;

  return (
    <div className="progress-wrapper">
      <div
        className="progress-bar"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;
