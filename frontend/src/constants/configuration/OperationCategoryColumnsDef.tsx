import { RiEdit2Line, RiMore2Line } from "@remixicon/react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

export const CategoryActionsColumn = ({ row, openEditModal }: { row: any; openEditModal: (categoryId: number) => void }) => {
  return (
    <div className="flex justify-center items-center w-full">
      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center justify-center p-1.5 rounded-full hover:bg-gray-100">
          <RiMore2Line size={20} className="text-gray-500" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:border-strokedark dark:bg-boxdark py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
            <Menu.Item>
              {({}) => (
                <button
                  type="button"
                  className="px-3 py-1 text-sm leading-6 flex items-center text-left justify-start gap-3.5 font-medium duration-300 ease-in-out lg:text-base"
                  onClick={() => openEditModal(row.original.categoryId)}
                >
                  <span className="mr-2"><RiEdit2Line size={20} /></span>
                  Editar categoría
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export const OperationTypeActionsColumn = ({ row, openEditModal }: { row: any; openEditModal: (typeId: number, categoryId: number) => void }) => {
  return (
    <div className="flex justify-center items-center w-full">
      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center justify-center p-1.5 rounded-full hover:bg-gray-100">
          <RiMore2Line size={20} className="text-gray-500" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:border-strokedark dark:bg-boxdark py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className={`px-3 py-1 text-sm leading-6 flex items-center text-left justify-start gap-3.5 font-medium duration-300 ease-in-out lg:text-base ${
                    active ? 'bg-gray-100' : ''
                  }`}
                  onClick={() => openEditModal(row.original.operationTypeId, row.original.operationCategoryId)}
                >
                  <span className="mr-2"><RiEdit2Line size={20} /></span>
                  Editar tipo
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
