import api from "@/lib/axios";
import {
  CreateItemForm,
  UpdateItemForm,
  InventoryMovementForm,
  InventoryBatchMovementForm,
  ItemWithPendingTable,
  Item,
  InventoryItem,
  VolunteerPendingReturn,
  MovementHistory,
  VolunteerWithPending,
  ExtractableItem
} from "@/types/invetory.schema";
import { GetInventoryItemsParams, GetMovementHistoryParams } from "@/api/types/InventoryAPIType.type";
import { isAxiosError } from "axios";

// Create item
export async function createItem(formData: CreateItemForm) {
  try {
    const { data } = await api.post("/Item", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) throw new Error(error.response.data.error);
  }
}

// Update item
export async function updateItem(id: number, formData: UpdateItemForm) {
  try {
    const { data } = await api.patch(`/Item/${id}`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) throw new Error(error.response.data.error);
  }
}

// Get item by ID
export async function getItemById(id: number): Promise<Item> {
  const { data } = await api.get(`/Item/${id}`);
  return data;
}

// Get item with pending table
export async function getItemByIdWithPendingTable(id: number): Promise<ItemWithPendingTable> {
  const { data } = await api.get(`/Item/detail-with-pending-table/${id}`);
  return data;
}

// Get inventory items
export async function getInventoryItems(params?: GetInventoryItemsParams): Promise<{ data: InventoryItem[]; totalPages: number, totalRecords: number }> {
  const { data } = await api.get("/Item/inventory-items", { params });
  return { data: data.data, totalPages: data.totalPages, totalRecords: data.totalRecords };
}

// Extract item
export async function extractItem(formData: InventoryMovementForm) {
  const { data } = await api.post("/Item/extract", formData);
  return data;
}

// Return item
export async function returnItem(formData: InventoryMovementForm) {
  const { data } = await api.post("/Item/return", formData);
  return data;
}

// Extract batch items
export async function extractBatchItems(formData: InventoryBatchMovementForm) {
  const { data } = await api.post("/Item/extract-batch", formData);
  return data;
}

// Return batch items
export async function returnBatchItems(formData: InventoryBatchMovementForm) {
  const { data } = await api.post("/Item/return-batch", formData);
  return data;
}

// Get all items (id + name)
export async function getAllItems(): Promise<ExtractableItem[]> {
  const { data } = await api.get("/Item/all-items");
  return data;
}

// Get items owed by volunteer
export async function getItemsOwedByVolunteer(volunteerId: number): Promise<Item[]> {
  const { data } = await api.get(`/Item/owed-by-volunteer/${volunteerId}`);
  return data;
}

// Get volunteer pending returns
export async function getVolunteerPendingReturns(itemId: number): Promise<VolunteerPendingReturn[]> {
  const { data } = await api.get(`/Item/volunteer-pending-returns/${itemId}`);
  return data;
}

// Get movement history
export async function getMovementHistory(params?: GetMovementHistoryParams): Promise<{ data: MovementHistory[]; totalPages: number, totalRecords: number }> {
  const { data } = await api.get("/Item/movement-history", { params });
  return { data: data.data, totalPages: data.totalPages, totalRecords: data.totalRecords };
}

export async function getVolunteersWithAnyPendingReturns(): Promise<VolunteerWithPending[]> {
  const { data } = await api.get("/Item/all-volunteer-pending-returns");
  return data;
}


