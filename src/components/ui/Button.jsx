const Button = ({ children, onClick, className = '', variant = 'default' }) => {
  const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2';
  const variants = {
    default: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg',
    ghost: 'bg-transparent hover:bg-slate-700 text-slate-300 hover:text-white'
  };
  
  return (
    <button 
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
export default Button;