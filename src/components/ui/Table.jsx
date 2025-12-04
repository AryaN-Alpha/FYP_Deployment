const Table = ({ children }) => (
  <div className="w-full overflow-x-auto">
    <table className="w-full">{children}</table>
  </div>
);

const TableHeader = ({ children }) => (
  <thead className="border-b">{children}</thead>
);

const TableBody = ({ children }) => (
  <tbody>{children}</tbody>
);

const TableRow = ({ children, className = '' }) => (
  <tr className={`border-b transition-colors ${className}`}>{children}</tr>
);

const TableHead = ({ children, className = '' }) => (
  <th className={`h-10 px-4 text-left align-middle font-medium text-gray-700 ${className}`}>
    {children}
  </th>
);

const TableCell = ({ children, className = '', colSpan }) => (
  <td className={`p-4 align-middle ${className}`} colSpan={colSpan}>
    {children}
  </td>
);
export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
};