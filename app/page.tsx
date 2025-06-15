import Navigation from "@/components/navbar";

export default function Home() {
  return (
    <><Navigation />
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <h1 className="text-4xl pt-5 font-bold">Home Page</h1>

      </div>
    </main></>
  );
}
