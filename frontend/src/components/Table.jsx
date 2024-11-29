/* eslint-disable no-unused-vars */
import { useQuery } from "react-query";
import axios from "axios";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

const retrievWingData = async (wing) => {
  console.log("called for wing", wing);
  const response = await axios({
    url: `/api/clients?wing=${wing}`,
    method: "GET",
    responseType: "json",
  });
  // console.log(response.data.data[0])
  return response.data.data;
};

// eslint-disable-next-line react/prop-types
const TableWithPDFPreview = ({ wing }) => {
  console.log("component rendered!");
  const { data, isLoading, error } = useQuery({
    queryKey: [`wingData-${wing}`, wing],
    queryFn: () => retrievWingData(wing),
  });

  const columns = [
    { header: "ID", accessorKey: "id" },
    { header: "Name", accessorKey: "name" },
    { header: "E-mail", accessorKey: "emailId" },
    {
      header: "Address",
      cell: ({ row }) => {
        const address = row.original.address;
        return `FlatNo${address?.flatNo}, Floor ${address?.floorNo}, Wing ${address?.wing}, Near ${address?.landmark}, ${address?.city}, ${address?.State}`;
      },
    },
    {
      header: "Agreement",
      cell: ({ row }) => (
        <button className="viewBtn" onClick={() => handlePreviewPDF(row.original?.id)}>View</button>
      ),
    },
  ];
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error)
    return (
      <p>
        Error occurred:{" "}
        {error.response?.data?.message || error.message || "Unknown error"}
      </p>
    );
  if (data?.length === 0)
    return <p>No data available for the selected wing.</p>;

  const handlePreviewPDF = async (id) => {
    try {
      const response = await axios.get(
        `/api/client/${id}`,
        {
          responseType: "blob",
        }
      );
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (err) {
      alert("Failed to fetch PDF.");
    }
  };

  return (
    <div style={{overflowX:"auto"}}>
      <h3>Showing Results for wing {wing}: </h3>
      <table className="w3-table w3-striped w3-hoverable">
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} style={{ paddingRight: "15" }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableWithPDFPreview;
