import Home from "../components/Home";
const Page = () => (
  <main className="flex min-h-screen flex-col justify-between p-12">
    <header className="mb-12 text-center">
      <h1 className="mb-6 font-bold text-3xl">Vercel Blog</h1>
    </header>
    <Home />
    <footer className="mt-24 text-center">
      <p>@Vercel 2024</p>
    </footer>
  </main>
);
export default Page;
