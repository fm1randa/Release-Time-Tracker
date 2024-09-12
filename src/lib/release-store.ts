import { create } from "zustand";

interface Release {
  id: string;
  name: string;
  startDate: string;
  releaseDate: string;
}

interface ReleaseState {
  selectedRelease: Release | null;
  setSelectedRelease: (release: Release) => void;
}

export const useReleaseStore = create<ReleaseState>((set) => ({
  selectedRelease: null,
  setSelectedRelease: (release: Release) =>
    set(() => ({ selectedRelease: release })),
}));
