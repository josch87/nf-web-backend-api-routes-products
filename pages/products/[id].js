import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function ProductDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const fetcher = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
      const error = new Error("An error occurred while fetching the data.");

      error.info = await response.json();
      error.status = response.status;
      throw error;
    }

    return response.json();
  };

  const url = `/api/products/${id}`;
  const { data: product, error, isLoading } = useSWR(url, fetcher);

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>loading...</div>;

  const {
    id: productId,
    name,
    description,
    price,
    currency,
    category,
  } = product;

  return (
    <>
      <Link href="/products">⇠ All Products</Link>
      <main>
        {" "}
        <h1>{name}</h1>
        <p>{description}</p>
        <p>
          {price} {currency}
        </p>
        <p>{category}</p>
      </main>
    </>
  );
}
