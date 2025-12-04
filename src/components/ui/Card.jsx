const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-gray-100 rounded-xl border border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

export default Card;