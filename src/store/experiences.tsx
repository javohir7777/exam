import { create } from "zustand";
import Skill from "../types/skill";
import request from "../server";
import { devtools } from "zustand/middleware";

interface ExperiencesState {
  skills: Skill[];
  loading: boolean;
  total: number;
  page: number;
  isModalOpen: boolean;
  getSkills: () => void;
  setPage: (page: number) => void;
 
}

const userId = localStorage.getItem("PORTFOLIO_USER")
  ? JSON.parse(localStorage.getItem("PORTFOLIO_USER") || "")
  : null;

const useExperiences = create<ExperiencesState>()(
  devtools((set, get) => ({
    skills: [],
    loading: false,
    isModalOpen: false,
    total: 0,
    page: 1,
    getSkills: async () => {
      try {
        set((state) => ({ ...state, loading: true }));

        const {
          data: { pagination, data },
        } = await request.get(`/experiences`, {
          params: { page: get().page, user: userId?._id },
        });
        set((state) => ({
          ...state,
          skills: data,
          total: pagination.total,
          loading: false,
        }));
      } finally {
        set((state) => ({ ...state, loading: false }));
      }
    },
    setPage: (page) => {
      set((state) => ({ ...state, page }));
      get().getSkills();
    },
  }))
);
export default useExperiences;
