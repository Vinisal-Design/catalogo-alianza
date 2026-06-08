export type Product = {
  id: string;
  category: "masculino" | "feminino" | "jaquetas";
  categoryLabel: string;
  name: string;
  ref: string | null;
  price: string | null;
  color: string | null;
  image: string;
  sourcePage: number;
  sourceFile: string;
};
