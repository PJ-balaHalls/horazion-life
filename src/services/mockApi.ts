// Simula busca de CEP (ViaCEP style)
export const fetchAddressByCep = async (cep: string) => {
  // Simulando delay de rede
  await new Promise((r) => setTimeout(r, 1000));

  if (cep.length >= 8) {
    return {
      street: "Av. Paulista",
      city: "São Paulo",
      state: "SP",
      neighborhood: "Bela Vista",
    };
  }
  throw new Error("CEP Inválido");
};

// Simula verificação de User
export const checkUsernameAvailability = async (username: string) => {
  await new Promise((r) => setTimeout(r, 800));
  // Simula que 'admin' e 'teste' já existem
  const taken = ["admin", "teste", "root", "ceo"].includes(
    username.toLowerCase(),
  );
  return !taken;
};
