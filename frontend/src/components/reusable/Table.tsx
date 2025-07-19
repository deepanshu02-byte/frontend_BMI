import React from "react";
import { Pagination } from "./Pagination";

interface Column<T> {
  label: string;
  key: keyof T;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onSortChange?: (key: keyof T, direction: "asc" | "desc") => void;
  sortKey?: keyof T;
  sortDirection?: "asc" | "desc";
  onSearchChange?: (query: string) => void;
  emptyMessage?: string;
}

export const Table = <T extends Record<string, string | number | boolean | null | undefined>>({
  data,
  columns,
  page,
  totalPages,
  onPageChange,
  onSortChange,
  sortKey,
  sortDirection,
  onSearchChange,
  emptyMessage = "No records found.",
}: TableProps<T>) => {
  return (
    <div className="space-y-4">
      {onSearchChange && (
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-3 py-2 border rounded-md text-sm"
        />
      )}

      <div className="w-full overflow-auto rounded-md border border-gray-200 dark:border-gray-700">
        <table className="w-full caption-bottom text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="h-12 px-4 text-left align-middle font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
                  onClick={() => {
                    if (onSortChange) {
                      const newDirection =
                        sortKey === col.key && sortDirection === "asc" ? "desc" : "asc";
                      onSortChange(col.key, newDirection);
                    }
                  }}
                >
                  {col.label}
                  {sortKey === col.key && (
                    <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900">
            {data.length > 0 ? (
              data.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {columns.map((col) => {
                    const value = row[col.key];
                    return (
                      <td key={String(col.key)} className="px-4 py-3 align-middle">
                        {col.render ? col.render(value, row) : value}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={onPageChange} />
      )}
    </div>
  );
};
