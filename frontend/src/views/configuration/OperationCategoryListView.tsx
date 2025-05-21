import { useState } from 'react';
import ExpandableTable from '../../components/common/ExpandableTable/ExpandableTable';
import { useOperationCategories } from '../../hooks/configuration/querys/useOperationCategories';
import { OperationCategoryFilters } from '../../components/configuration/OperationCategoryFilters';
import { OperationCategoryHeader } from '../../components/configuration/OperationCategoryHeader';
import { useBreadcrumb } from '@/hooks/components/useBreadcrumb';
import { ColumnDef } from '@tanstack/react-table';
import { CategoryActionsColumn, OperationTypeActionsColumn } from '@/constants/configuration/OperationCategoryColumnsDef';
import { RiArrowRightSLine, RiArrowDownSLine } from '@remixicon/react';
import { OperationCategoryFormModal } from '@/components/configuration/modals/OperationCategoryFormModal';
import { OperationTypeFormModal } from '@/components/configuration/modals/OperationTypeFormModal';
import { EditOperationTypeModal } from '@/components/configuration/modals/EditOperationTypeModal';
import Loader from '@/components/common/Loader';

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

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends unknown> {
    expandedRows?: { [key: number]: boolean };
    toggleExpanded?: (categoryId: number) => void;
  }
}

export default function OperationCategoryListView() {
  const {
    data, 
    isLoading, 
    isError, 
    error, 
    searchValue, 
    setSearchValue, 
    pageIndex, 
    setPageIndex, 
    pageSize, 
    setPageSize 
  } = useOperationCategories();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(undefined);
  const [selectedCategoryData, setSelectedCategoryData] = useState<{ name: string } | undefined>(undefined);

  const [typeModalOpen, setTypeModalOpen] = useState(false);
  const [editTypeModalOpen, setEditTypeModalOpen] = useState(false);
  const [selectedTypeId, setSelectedTypeId] = useState<number | undefined>(undefined);
  const [selectedTypeName, setSelectedTypeName] = useState<string | undefined>(undefined);

  const openEditModal = (categoryId: number) => {
    const selectedCategory = data?.data.find(category => category.categoryId === categoryId);
    if (selectedCategory) {
      setSelectedCategoryData({ name: selectedCategory.categoryName });
      setSelectedCategoryId(categoryId);
      setEditModalOpen(true);
    }
  };

  const openTypeModal = () => {
    setTypeModalOpen(true);
  };

  const closeTypeModal = () => {
    setTypeModalOpen(false);
  };

  const openEditTypeModal = (operationTypeId: number, _operationCategoryId: number) => {
    let foundOperation = null;
    
    for (const category of data?.data || []) {
      for (const operation of category.operations) {
        if (operation.operationTypeId === operationTypeId) {
          foundOperation = operation;
          break;
        }
      }
      if (foundOperation) break;
    }
    
    if (foundOperation) {
      setSelectedTypeId(operationTypeId);
      setSelectedTypeName(foundOperation.name);
      setEditTypeModalOpen(true);
    }
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedCategoryId(undefined);
  };

  const closeEditTypeModal = () => {
    setEditTypeModalOpen(false);
    setSelectedTypeId(undefined);
    setSelectedTypeName(undefined);
  };

  useBreadcrumb([
    { label: "Configuración", path: "/configuration/operation-category/list" },
    { label: "Categorías de Operación", path: "/configuration/operation-category/list" }
  ]);
  
  const handlePaginationChange = (newPagination: { pageIndex: number; pageSize: number }) => {
    setPageIndex(newPagination.pageIndex);
    if (newPagination.pageSize !== pageSize) {
      setPageSize(newPagination.pageSize);
    }
  };

  const categoryColumns: ColumnDef<Category>[] = [
    {
      id: 'expander',
      header: '',
      size: 50,
      cell: ({ row, table }) => {
        const toggleExpanded = table.options.meta?.toggleExpanded;
        const expandedRows = table.options.meta?.expandedRows || {};
        
        return (
          <button 
            onClick={() => toggleExpanded && toggleExpanded(row.original.categoryId)}
            className="flex items-center"
          >
            {expandedRows[row.original.categoryId] ? <RiArrowDownSLine size={20} /> : <RiArrowRightSLine size={20} />}
          </button>
        );
      },
    },
    {
      accessorKey: 'categoryName',
      header: 'Categoría de operación',
      cell: (info: any) => info.getValue(),
    },
    {
      id: 'actions',
      header: 'Acciones',
      cell: ({ row }) => <CategoryActionsColumn row={row} openEditModal={openEditModal} />,
      enableSorting: false,
    }
  ];

  const operationColumns: ColumnDef<Operation>[] = [
    {
      accessorKey: 'name',
      header: 'Tipos de operación',
      cell: (info: any) => info.getValue(),
    },
    {
      id: 'actions',
      header: 'Acciones',
      cell: ({ row }) => <OperationTypeActionsColumn row={row} openEditModal={openEditTypeModal} />,
      enableSorting: false,
    }
  ];

  return (
    <div className="container mx-auto"> 
      <OperationCategoryHeader
        onOpenTypeModal={openTypeModal}
      />
      <OperationCategoryFilters 
        searchValue={searchValue} 
        setSearchValue={setSearchValue} 
      />
      {isLoading ? (
        <Loader message="Cargando lista de categorías y tipos de operación" />
      ) : isError ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-red-500">Error al cargar los datos: {error?.message}</p>
        </div>
      ) : (
        <ExpandableTable 
          data={data?.data || []} 
          totalPages={data?.totalPages || 1}
          pagination={{
            pageIndex: pageIndex,
            pageSize: pageSize
          }}
          onPaginationChange={handlePaginationChange}
          categoryColumns={categoryColumns}
          operationColumns={operationColumns}
        />
      )}

      <OperationCategoryFormModal
        isOpen={editModalOpen}
        onClose={closeEditModal}
        categoryId={selectedCategoryId}
        categoryData={selectedCategoryData}
      />
      
      <OperationTypeFormModal
        isOpen={typeModalOpen}
        onClose={closeTypeModal}
        typeId={undefined}
        typeData={undefined}
      />
      
      <EditOperationTypeModal
        isOpen={editTypeModalOpen}
        onClose={closeEditTypeModal}
        typeId={selectedTypeId}
        typeName={selectedTypeName}
      />
    </div>
  );
}
