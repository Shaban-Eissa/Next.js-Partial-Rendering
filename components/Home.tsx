import { Suspense } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

function LoadingPosts() {
  const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent`;
  return (
    <div className="col-span-4 space-y-4 lg:col-span-1 w-full mt-20">
      <div className={`relative h-[167px] rounded-xl bg-gray-900 ${shimmer}`} />
      <div className="h-4 w-full rounded-lg bg-gray-900" />
      <div className="h-6 w-1/3 rounded-lg bg-gray-900" />
      <div className="h-4 w-full rounded-lg bg-gray-900" />
      <div className="h-4 w-4/6 rounded-lg bg-gray-900" />
    </div>
  );
}

async function fetchPosts() {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const data = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
        cache: "no-store",
      });
      const posts = await data.json();
      resolve(posts);
    }, 2000);
  });
}

async function BlogPost() {
  const posts: Post[] = (await fetchPosts()) as Post[];
  const post = posts[0];
  return (
    <div className="w-full">
      <h4 className="text-lg mb-2">Title - {post.title}</h4>
      <p className="text-sm leading-6">
        {post.body} {post.body} {post.body} {post.body} {post.body} {post.body}{" "}
        {post.body} {post.body} {post.body} {post.body}
      </p>
    </div>
  );
}

async function Aside() {
  const posts: Post[] = (await fetchPosts()) as Post[];
  return (
    <aside className="w-full">
      <div>
        {posts.slice(0, 5).map((post) => (
          <ol key={post.id} style={{ listStyle: "inside" }}>
            <li className="text-lg w-full">
              <a href="#">{post.title}</a>
            </li>
          </ol>
        ))}
      </div>
    </aside>
  );
}

export default function Home() {
  return (
    <div className="flex justify-between max-md:flex-col">
      <div className="w-[70%] max-md:w-full">
        <h2 className="text-2xl mb-6">Main Blog</h2>
        <Suspense fallback={<LoadingPosts />}>
          <BlogPost />
        </Suspense>
      </div>

      <div className="w-[25%] pl-10 max-md:w-full max-md:mt-8 max-md:border max-md:border-black max-md:p-8 rounded-lg">
        <h2 className="text-2xl mb-12">Latest Blog Posts</h2>
        <Suspense fallback={<LoadingPosts />}>
          <Aside />
        </Suspense>
      </div>
    </div>
  );
}
