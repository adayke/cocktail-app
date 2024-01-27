import { defineStore } from "pinia";
import axios from "axios";

interface Cocktail {
  code: string;
  data: any | null;
}

export const useCocktailStore = defineStore("cocktailStore", {
  state: (): { cocktails: Cocktail[]; currentCocktail: string } => ({
    cocktails: [
      { code: "margarita", data: null },
      { code: "mojito", data: null },
      { code: "a1", data: null },
      { code: "kir", data: null },
    ],
    currentCocktail: "margarita",
  }),
  getters: {
    getCocktailByCode:
      (state) =>
      (code: string): Cocktail | undefined => {
        return state.cocktails.find((cocktail) => cocktail.code === code);
      },
  },
  actions: {
    async fetchCocktailData(cocktailCode: string) {
      if (this.getCocktailByCode(cocktailCode)?.data) return;

      try {
        const response = await axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailCode}`
        );

        const cocktailData = response.data.drinks[0];
        const cocktailIndex = this.cocktails.findIndex(
          (cocktail) => cocktail.code === cocktailCode
        );
        if (cocktailIndex !== -1) {
          this.cocktails[cocktailIndex].data = cocktailData;
        }
      } catch (error) {
        console.error("Error fetching cocktail data:", error);
      }
    },
    setCurrentCocktail(cocktailCode: string) {
      this.currentCocktail = cocktailCode;
    },
  },
});
