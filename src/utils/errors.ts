export const getFriendlyError = (error: any): string => {
  if (!error) return "Ocorreu um erro desconhecido.";

  // Garante que pegamos a mensagem mesmo se for objeto
  const message =
    typeof error === "string" ? error : error.message || JSON.stringify(error);

  if (message.includes("User already registered"))
    return "Este e-mail já está em uso.";
  if (message.includes("duplicate key")) {
    if (message.includes("horazion_id")) return "Este @usuario já existe.";
    return "Dados duplicados no sistema.";
  }
  if (message.includes("password") || message.includes("weak_password")) {
    return "A senha deve ter no mínimo 6 caracteres.";
  }

  return "Não foi possível conectar. Verifique sua internet.";
};
