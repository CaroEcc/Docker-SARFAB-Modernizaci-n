import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, SortingState } from '@tanstack/react-table';
import { useState } from 'react';
import { SimpleSortableTableProps } from './SimpleSortableTableProps.type';

const SimpleSortableTable = <T,>({ columns, data, initialPageSize = 10 }: SimpleSortableTableProps<T>) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: initialPageSize });

    const table = useReactTable({
        columns,
        data,
        state: { sorting, pagination },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,  // Ahora onSortingChange debe funcionar correctamente
        onPaginationChange: setPagination,
        manualPagination: false,
    });

    return (
        <div className="rounded-sm border border-stroke bg-white mt-3 px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto text-center">
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className="bg-gray-2 text-left dark:bg-meta-4">
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} colSpan={header.colSpan} className="py-4 px-4 text-center font-bold text-black dark:text-white">
                                        {header.isPlaceholder ? null : (
                                            <div
                                                className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {{ asc: ' 🔼', desc: ' 🔽' }[header.column.getIsSorted() as string] ?? null}
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
                                    <td key={cell.id} className="py-5 px-4 text-black dark:text-white">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="h-2" />
                <div className="flex justify-between my-4">
                    <div>
                        Mostrando {table.getRowModel().rows.length.toLocaleString()} de {data.length.toLocaleString()} filas
                    </div>
                    <div className='flex items-center gap-2'>
                        <button className="border rounded p-1" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                            {'<'}
                        </button>
                        <span className="flex items-center gap-1">
                            Página <strong>{pagination.pageIndex + 1}</strong>
                        </span>
                        <button className="border rounded p-1" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                            {'>'}
                        </button>
                        <span className="flex items-center gap-1">
                            | Ir a página:
                            <input
                                type="number"
                                min="1"
                                max={table.getPageCount()}
                                value={pagination.pageIndex + 1}
                                onChange={(e) => {
                                    const page = Number(e.target.value) - 1;
                                    setPagination(prev => ({ ...prev, pageIndex: page }));
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

export default SimpleSortableTable;
