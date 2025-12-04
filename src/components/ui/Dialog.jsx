const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
      <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

const DialogContent = ({ children }) => <div className="p-6">{children}</div>;

const DialogHeader = ({ children }) => <div className="mb-4">{children}</div>;

const DialogTitle = ({ children }) => (
  <h2 className="text-xl font-semibold text-gray-900">{children}</h2>
);

const DialogDescription = ({ children }) => (
  <p className="text-sm text-gray-600 mt-2">{children}</p>
);
export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
};