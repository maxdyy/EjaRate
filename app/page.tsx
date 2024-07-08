import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center pt-32 lg:pt-64 px-4">
      <span className="text-xl lg:text-2xl font-bold">EjaRate</span>
      <h1 className="text pb-5 lg:text-xl text-center">
        Search for <span className="font-semibold">Rent Reviews</span> in your{" "}
        <span className="font-semibold">Building</span>
      </h1>
      <SearchBar />
    </div>
  );
}
