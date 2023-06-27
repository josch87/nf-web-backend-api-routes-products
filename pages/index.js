import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Next.js API Routes!</h1>
      <p>
        Please see a list of <Link href="/products">all of our products</Link>.
        For your own application you can use our{" "}
        <Link href="/api/products">well documented API</Link>.
      </p>
    </div>
  );
}
