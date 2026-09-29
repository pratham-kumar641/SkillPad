import React from 'react';

const Table = ({ headers, data, renderRow }) => {
  return (
    <div className="overflow-x-auto relative shadow-sm rounded-lg border border-gray-200">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {headers.map((header, index) => (
              <th key={index} scope="col" className="py-3 px-6">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => renderRow(item, index))
          ) : (
            <tr className="bg-white border-b">
              <td colSpan={headers.length} className="py-4 px-6 text-center">
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
