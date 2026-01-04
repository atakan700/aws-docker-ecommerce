import React from 'react';
import type { TableColumn } from '../../assets/types/table';

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  emptyMessage?: string;
}

const Table = <T extends { id?: number | string }>({ 
  data, 
  columns, 
  emptyMessage = "Gösterilecek veri yok." 
}: TableProps<T>) => {
  
  // Veri yoksa gösterilecek ekran
  if (!data || data.length === 0) {
    return (
      <div className="p-8 text-center">
        <svg
          className="w-16 h-16 mx-auto text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <p className="text-gray-500 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={`header-${index}`}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => {
            const rowKey = row.id !== undefined ? `row-${row.id}` : `row-${rowIndex}`;
            
            return (
              <tr
                key={rowKey}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                {columns.map((column, colIndex) => {
                  
                  // --- DEĞİŞİKLİK BURADA BAŞLIYOR ---
                  
                  let content: React.ReactNode;

                  // 1. Eğer sütun için özel bir 'render' fonksiyonu tanımlanmışsa onu çalıştır
                  if (column.render) {
                    content = column.render(row);
                  } 
                  // 2. Yoksa varsayılan metin gösterme işlemini yap
                  else {
                    const cellValue = row[column.accessor];
                    content = cellValue !== null && cellValue !== undefined 
                      ? String(cellValue) 
                      : '-';
                  }

                  return (
                    <td
                      key={`${rowKey}-col-${colIndex}`}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {content}
                    </td>
                  );
                  // --- DEĞİŞİKLİK BURADA BİTİYOR ---

                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;