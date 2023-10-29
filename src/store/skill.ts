import { create } from "zustand";
import Skill from "../types/skill";
import request from "../server";
import { devtools } from "zustand/middleware";

interface SkillState {
  skills: Skill[];
  loading: boolean;
  total: number;
  page: number;
  isModalOpen: boolean;
  getSkills: () => void;
  setPage: (page: number) => void;
  controlModal: (data: boolean) => void;
  showModal: () => void;
  setSelected: (selected: null | string) => void;
  selected: null | string;
}

const useSkill = create<SkillState>()(
  devtools((set, get) => ({
    skills: [],
    loading: false,
    isModalOpen: false,
    selected: null,
    total: 0,
    page: 1,
    getSkills: async () => {
      try {
        set((state) => ({ ...state, loading: true }));

        const {
          data: { pagination, data },
        } = await request.get(`/skills?user=6537b00efd51940018b21314`, {
          params: { page: get().page },
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
    controlModal: (data) => {
      set((state) => ({ ...state, isModalOpen: data }));
    },
    showModal: () => {
      get().controlModal(true);
      get().setSelected(null);
    },
    setSelected: (selected) => {
        set((state) => ({ ...state, selected }));
      },
  }))
);
export default useSkill;
