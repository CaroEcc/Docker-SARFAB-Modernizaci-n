import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { SortableTableProps } from './SortableTableProps.type';

const SortableTable = <T,>({
    columns,
    data,
    pagination,
    totalPages,
    totalRecords,
    onPaginationChange,
}: SortableTableProps<T>) => {
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        columns,
        data,
        state: { sorting, pagination },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        manualPagination: true,
        onSortingChange: setSorting,
        initialState: {
            columnVisibility: {
                recruitmentId: false,
                id: false,
            },
        },
    });

    return (
        <div className="rounded-sm border border-stroke bg-white mt-3 px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto sm:overflow-x-visible">
                <table className="w-full table-auto text-center">
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className="bg-gray-2 text-left dark:bg-meta-4">
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        className="py-4 px-4 text-center font-bold text-black dark:text-white"
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div
                                                className={
                                                    header.column.getCanSort()
                                                        ? 'cursor-pointer select-none'
                                                        : ''
                                                }
                                                onClick={header.column.getToggleSortingHandler()}
                                                title={
                                                    header.column.getCanSort()
                                                        ? header.column.getNextSortingOrder() === 'asc'
                                                            ? 'Sort ascending'
                                                            : header.column.getNextSortingOrder() === 'desc'
                                                            ? 'Sort descending'
                                                            : 'Clear sort'
                                                        : undefined
                                                }
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {{
                                                    asc: ' 🔼',
                                                    desc: ' 🔽',
                                                }[header.column.getIsSorted() as string] ?? null}
                                            </div>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="border-b border-[#eee] dark:border-strokedark">
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="py-5 px-4 text-black dark:text-white relative">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="h-2" />

                <div className="flex justify-between items-center my-4 flex-wrap gap-4">
                    <div>
                        Mostrando {data.length.toLocaleString()} de {totalRecords} registros
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            className="border rounded p-1"
                            onClick={() =>
                                onPaginationChange({
                                    pageIndex: pagination.pageIndex - 1,
                                    pageSize: pagination.pageSize,
                                })
                            }
                            disabled={pagination.pageIndex === 1}
                        >
                            {'<'}
                        </button>
                        <span className="flex items-center gap-1">
                            Página <strong>{pagination.pageIndex}</strong> de <strong>{totalPages}</strong>
                        </span>
                        <button
                            className="border rounded p-1"
                            onClick={() =>
                                onPaginationChange({
                                    pageIndex: pagination.pageIndex + 1,
                                    pageSize: pagination.pageSize,
                                })
                            }
                            disabled={pagination.pageIndex >= totalPages}
                        >
                            {'>'}
                        </button>
                        <span className="flex items-center gap-1">
                            | Ir a página:
                            <input
                                type="number"
                                min="1"
                                max={totalPages}
                                value={pagination.pageIndex}
                                onChange={(e) => {
                                    let page = Number(e.target.value);
                                    if (isNaN(page)) return;
                                    if (page < 1) page = 1;
                                    if (page > totalPages) page = totalPages;

                                    onPaginationChange({
                                        pageIndex: page,
                                        pageSize: pagination.pageSize,
                                    });
                                }}
                                className="border p-1 rounded w-16 dark:bg-form-input"
                            />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SortableTable;