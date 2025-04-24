export default function Square({ value, onSquareClick }) {
  return (
    <button 
      className="btn btn-secondary btn-lg shadow-lg"
      style={{
        width: '50px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}