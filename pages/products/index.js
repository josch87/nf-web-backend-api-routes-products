import useSWR from "swr";

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

export default function ProductsPage() {
  const url = `/api/products`;
  const { data: products, error, isLoading } = useSWR(url, fetcher);

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <h1>All Products</h1>
      <ul>
        {products.map((product) => {
          return (
            <>
              <li key={product.id}>
                <a href={`/products/${product.id}`}>{product.name}</a>
              </li>
            </>
          );
        })}
      </ul>
    </>
  );
}
