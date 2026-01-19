import React from "react";

const DataTable = ({ columns, data, emptyMessage = "No data available" }) => {
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-300 shadow-sm">
            <tr className="hover:bg-red-100">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`text-gray-700 font-bold text-left p-4 text-sm ${
                    column.className || ""
                  }`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="h-24 text-center text-black/60 p-4"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-300 shadow-sm hover:bg-secondary/50"
                >
                  {columns.map((column, index) => (
                    <td key={index} className={`text-sm p-4 ${column.className || ""}`}>
                      {typeof column.accessor === "function"
                        ? column.accessor(row)
                        : String(row[column.accessor] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
