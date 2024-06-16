import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <main className="h-[calc(100vh-110px)]">
      <div className="flex justify-center pt-72 px-4">
        <SearchBar />
      </div>
    </main>
  );
}
