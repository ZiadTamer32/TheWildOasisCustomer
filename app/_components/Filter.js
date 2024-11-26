"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleClick(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <button
        className={`px-5 py-2 hover:bg-primary-700 ${
          activeFilter === "all" ? "bg-primary-700" : ""
        }`}
        onClick={() => handleClick("all")}
      >
        All Cabins
      </button>
      <button
        className={`px-5 py-2 hover:bg-primary-700 ${
          activeFilter === "small" ? "bg-primary-700" : ""
        }`}
        onClick={() => handleClick("small")}
      >
        1&mdash;3 Guest
      </button>
      <button
        className={`px-5 py-2 hover:bg-primary-700 ${
          activeFilter === "medium" ? "bg-primary-700" : ""
        }`}
        onClick={() => handleClick("medium")}
      >
        4&mdash;7 Guests
      </button>
      <button
        className={`px-5 py-2 hover:bg-primary-700 ${
          activeFilter === "large" ? "bg-primary-700" : ""
        }`}
        onClick={() => handleClick("large")}
      >
        8&mdash;12 Guests
      </button>
    </div>
  );
}

export default Filter;
