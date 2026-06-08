import productsData from "../products.json";
import type { Product } from "../types";
import Catalog from "../components/Catalog";

export default function Home() {
  const products = productsData as Product[];
  return <Catalog products={products} />;
}
