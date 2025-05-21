import api from "../lib/axios";
import { isAxiosError } from "axios";
import {
  coursesSelect,
  CourseDetail,
  CreateCourseForm,
  UpdateCourseForm,
  AssignMultipleVolunteersToCourseForm,
} from "../types/courses.schema.ts";
import { Volunteer } from "@/types/volunteer.schema.ts";

export async function getCoursesSelect(volunteerId?: Volunteer["id"]) {
  try {
    const { data } = await api.get("/Course/courses-select", {
      params: { volunteerId },
    });

    const response = coursesSelect.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      if (error.response.status === 404) return [];
      throw new Error(error.response.data.error);
    }
  }
}

export async function getCourses(courseName?: string, page = 1, pageSize = 10) {
  try {
    const { data } = await api.get("/Course/courses", {
      params: { courseName, page, pageSize },
    });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      if (error.response.status === 404) return { data: [], totalPages: 0 };
      throw new Error(error.response.data.error);
    }
    return { data: [], totalPages: 0 };
  }
}

export async function getCourseById(id: number): Promise<CourseDetail | null> {
  try {
    const { data } = await api.get(`/Course/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function createCourse(formData: CreateCourseForm) {
  try {
    const { data } = await api.post("/Course", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function updateCourse(id: number, formData: UpdateCourseForm) {
  try {
    const { data } = await api.patch(`/Course/${id}`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function assignMultipleVolunteersToCourse(formData: AssignMultipleVolunteersToCourseForm) {
  try {
    const { data } = await api.post("/Course/assign-multiple-volunteers", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
