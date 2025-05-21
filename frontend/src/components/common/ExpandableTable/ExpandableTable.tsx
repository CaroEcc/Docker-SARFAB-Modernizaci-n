import React, { useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table';
import { RiArrowDownSLine, RiArrowRightSLine } from '@remixicon/react';

interface Operation {
  operationTypeId: number;
  name: string;
  operationCategoryId: number;
}

interface Category {
  categoryId: number;
  categoryName: string;
  operations: Operation[];
}

interface ExpandableTableProps {
  data: Category[];
  totalPages: number;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  onPaginationChange: (pagination: { pageIndex: number; pageSize: number }) => void;
  categoryColumns?: ColumnDef<Category>[];
  operationColumns?: ColumnDef<any>[];
}

const ExpandableTable: React.FC<ExpandableTableProps> = ({
  data,
  totalPages,
  pagination,
  onPaginationChange,
  categoryColumns,
  operationColumns
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>({});

  const toggleRowExpansion = (categoryId: number) => {
    setExpandedRows(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const defaultCategoryColumns: ColumnDef<Category>[] = [
    {
      id: 'expander',
      header: '',
      size: 50,
      cell: ({ row }) => (
        <button
          onClick={() => toggleRowExpansion(row.original.categoryId)}
          className="flex items-center"
        >
          {expandedRows[row.original.categoryId] ? <RiArrowDownSLine size={20} /> : <RiArrowRightSLine size={20} />}
        </button>
      ),
    },
    {
      accessorKey: 'categoryName',
      header: 'Categoría de operación',
      cell: (info: any) => info.getValue(),
    },
  ];

  const defaultOperationColumns = [
    {
      accessorKey: 'name',
      header: 'Tipo de operación',
      cell: (info: any) => info.getValue(),
    }
  ];

  const columns = categoryColumns || defaultCategoryColumns;
  const operationCols = operationColumns || defaultOperationColumns;

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    meta: {
      expandedRows,
      toggleExpanded: toggleRowExpansion
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // Quitamos manualPagination: true para que no intente paginar los datos
  });

  return (
    <div className="rounded-sm border border-stroke bg-white mt-3 px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto text-left">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="bg-gray-2 text-left dark:bg-meta-4">
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={`py-4 text-left font-bold text-black dark:text-white ${header.id === 'expander' ? 'w-10 px-0 pl-1' :
                        header.id === 'categoryName' ? 'pl-0' :
                          header.id === 'actions' ? 'px-4 text-center' : 'px-4'
                      }`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())
                    }
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map(row => (
                <React.Fragment key={row.id}>
                  <tr className="border-b border-[#eee] dark:border-strokedark">
                    {row.getVisibleCells().map(cell => (
                      <td
                        key={cell.id}
                        className={`py-5 ${cell.column.id === 'expander' ? 'px-0 pl-1' :
                            cell.column.id === 'categoryName' ? 'pl-0' :
                              cell.column.id === 'actions' ? 'px-4 text-center' : 'px-4'
                          }`}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                  {expandedRows[row.original.categoryId] && (
                    <tr>
                      <td colSpan={row.getVisibleCells().length} className="p-0">
                        <div className="border-l-2 border-primary ml-3 pl-4">
                          <table className="w-full">
                            <thead>
                              <tr className="border-t border-stroke dark:border-strokedark">
                                {operationCols.map((col: any) => (
                                  <th
                                    key={col.accessorKey || col.id}
                                    className={`py-2 text-left font-bold text-gray-500 dark:text-gray-400 ${col.id === 'actions' ? 'px-4 text-center' : 'px-4'
                                      }`}
                                  >
                                    {col.header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {row.original.operations.length > 0 ? (
                                row.original.operations.map((operation: Operation) => (
                                  <tr
                                    key={operation.operationTypeId}
                                    className="border-b last:border-b-0"
                                  >
                                    {operationCols.map((col: any) => (
                                      <td
                                        key={col.accessorKey || col.id}
                                        className={`py-2 ${col.id === 'actions' ? 'px-4 text-center' : 'px-4'
                                          }`}
                                      >
                                        {col.accessorKey
                                          ? (operation as any)[col.accessorKey]
                                          : col.cell
                                            ? col.cell({ row: { original: operation } })
                                            : null
                                        }
                                      </td>
                                    ))}
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td
                                    colSpan={operationCols.length}
                                    className="py-6 px-4 text-center text-gray-500"
                                  >
                                    No se han registrado tipos de operación en esta categoría aún
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-8 text-gray-500 dark:text-gray-400"
                >
                  No se encontraron resultados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="h-2" />
      <div className="flex flex-col md:flex-row justify-center md:justify-end my-4 gap-4 text-center">
        {/*<div className="text-sm">
          Mostrando {table.getRowModel().rows.length.toLocaleString()} de{' '}
          {data.length.toLocaleString()} Filas
        </div>*/}
        <div className="flex flex-wrap justify-center items-center gap-2">
          <button
            className="border rounded p-1"
            onClick={() => onPaginationChange({ pageIndex: pagination.pageIndex - 1, pageSize: pagination.pageSize })}
            disabled={pagination.pageIndex <= 1}
          >
            {'<'}
          </button>
          <span className="flex items-center gap-1 text-sm">
            <span className="hidden sm:inline">Página</span>
            <strong>{pagination.pageIndex}</strong>
            <span className="sm:hidden">/</span>
            <span className="hidden sm:inline">de</span>
            <strong>{totalPages}</strong>
          </span>

          <button
            className="border rounded p-1"
            onClick={() => onPaginationChange({ pageIndex: pagination.pageIndex + 1, pageSize: pagination.pageSize })}
            disabled={pagination.pageIndex >= totalPages}
          >
            {'>'}
          </button>
          <span className="flex items-center gap-1 text-sm">
            <span className="hidden sm:inline">| Ir a página:</span>
            <span className="sm:hidden">|</span>
            <input
              type="number"
              min="1"
              max={totalPages}
              value={pagination.pageIndex}
              onChange={(e) => {
                const page = Number(e.target.value);
                if (page >= 1 && page <= totalPages) {
                  onPaginationChange({ pageIndex: page, pageSize: pagination.pageSize });
                }
              }}
              className="border p-1 rounded w-12 sm:w-16 dark:bg-form-input"
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ExpandableTable;