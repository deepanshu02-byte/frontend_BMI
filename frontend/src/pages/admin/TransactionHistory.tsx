import React, { useState } from "react";
import { Table } from "../../components/reusable/Table";
import { useGetAllTransactionDetailsByAdminQuery } from "../../redux/api/transactionApi";

interface Transaction {
  _id: string;
  toAccountNumber: string;
  fromAccountNumber: string;
  amount: number;
  transactionType: string;
  status: string;
  createdAt: string;
  userName: string;
}

const TransactionHistory: React.FC = () => {
  const [startDate, setStartDate] = useState("2000-01-01");
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<keyof Transaction>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;

  const { data, isLoading, error } = useGetAllTransactionDetailsByAdminQuery({
    startDate,
    endDate,
    search,
    sortBy,
    sortOrder,
    limit,
    offset,
  });

  const transactions: Transaction[] = data?.response?.totalTransactions || [];
  const totalCount: number = data?.response?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / limit);

  const columns = [
    { label: "User", key: "userName" },
    { label: "From Account", key: "fromAccountNumber" },
    { label: "To Account", key: "toAccountNumber" },
    { label: "Amount", key: "amount" },
    { label: "Type", key: "transactionType" },
    { label: "Status", key: "status" },
    {
      label: "Date",
      key: "createdAt",
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
  ];

  const handleSortChange = (
    key: keyof Transaction,
    direction: "asc" | "desc"
  ) => {
    setSortBy(key);
    setSortOrder(direction);
    setPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearch(query);
    setPage(1);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Transaction History</h2>

      <div className="flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setPage(1);
            }}
            className="border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              setPage(1);
            }}
            className="border px-2 py-1 rounded"
          />
        </div>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Failed to load transactions.</p>
      ) : (
        <Table
          data={transactions}
          columns={columns}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          onSortChange={handleSortChange}
          sortKey={sortBy}
          sortDirection={sortOrder}
          onSearchChange={handleSearchChange}
        />
      )}
    </div>
  );
};

export default TransactionHistory;
