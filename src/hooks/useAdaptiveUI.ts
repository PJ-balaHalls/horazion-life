// src/hooks/useAdaptiveUI.ts
import { usePerceptionStore } from "../store/usePerceptionStore";

export const useAdaptiveUI = () => {
  const { state } = usePerceptionStore();

  // Função que retorna classes dinâmicas baseadas no motor
  const getSemanticClass = (baseClass: string) => {
    const classes = [baseClass];

    if (state.contrast === "high")
      classes.push("border-2 border-content-primary");
    if (state.motionReduction) classes.push("transition-none");
    if (state.dyslexiaMode) classes.push("font-dyslexia");

    return classes.join(" ");
  };

  return {
    state,
    getSemanticClass,
    tokens: {
      radius: "rounded-hz",
      padding: "p-component-p",
      gap: "gap-hz-unit",
    },
  };
};
