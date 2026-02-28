import { create } from "zustand";

interface AddressData {
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

interface RegisterState {
  data: {
    persona: string;
    fullName: string;
    socialName: string;
    pronouns: string;
    cpf: string;
    phone: string;
    address: AddressData;
    isLocationVisible: boolean;
    username: string;
    bio: string;
    avatarUri: string;
    email: string;
    password: string;
  };
  setSimple: (key: string, value: any) => void;
  setAddress: (key: keyof AddressData, value: string) => void;
  reset: () => void;
}

export const useRegisterStore = create<RegisterState>((set) => ({
  data: {
    persona: "individual",
    fullName: "",
    socialName: "",
    pronouns: "",
    cpf: "",
    phone: "",
    address: {
      cep: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
    },
    isLocationVisible: false,
    username: "",
    bio: "",
    avatarUri: "",
    email: "",
    password: "",
  },
  setSimple: (key, value) =>
    set((state) => ({ data: { ...state.data, [key]: value } })),

  setAddress: (key, value) =>
    set((state) => ({
      data: { ...state.data, address: { ...state.data.address, [key]: value } },
    })),

  reset: () =>
    set({
      data: {
        persona: "individual",
        fullName: "",
        socialName: "",
        pronouns: "",
        cpf: "",
        phone: "",
        address: {
          cep: "",
          street: "",
          number: "",
          complement: "",
          neighborhood: "",
          city: "",
          state: "",
        },
        isLocationVisible: false,
        username: "",
        bio: "",
        avatarUri: "",
        email: "",
        password: "",
      },
    }),
}));
