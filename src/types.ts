export type Studio = "disney" | "dreamworks" | "nickelodeon" | "altri";
export type Difficulty = "facile" | "media" | "difficile";

export type Ingredient = {
  id: string;
  name: string;
  quantity: number | null;
  unit: string;
};

export type Step = {
  id: number;
  text: string;
  ingredients: string[];
};

export type Recipe = {
  id: string;
  film: string;
  studio: Studio;
  slug: string;
  title: string;
  description: string;
  category: string;
  difficulty: Difficulty;
  taste: string[];
  totalTimeMinutes: number;
  numberPeople: number;
  image: string;
  ingredients: Ingredient[];
  steps: Step[];
};
