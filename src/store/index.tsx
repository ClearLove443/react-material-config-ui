import { VariantType } from "notistack";
import { create } from "zustand";

type Store = {
  dataSources: any[];
  setDataSources: (dataSource: any[]) => void;
  dataSourcesTable: any;
  addSourcesTable: (table: any) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  variant: VariantType;
  setVariant: (variant: VariantType) => void;
  message: string;
  setMessage: (message: string) => void;
};

const useStore = create<Store>((set) => ({
  dataSources: [],
  dataSourcesTable: {},
  setDataSources: (dataSources: any[]) => set({ dataSources }),
  addSourcesTable: (table: {}) =>
    set((state: any) => ({
      dataSourcesTable: table,
    })),
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
  variant: "success",
  setVariant: (variant: VariantType) => set({ variant }),
  message: "",
  setMessage: (message: string) => set({ message }),
  reset: () => set({ dataSources: [] }),
}));

export default useStore;
