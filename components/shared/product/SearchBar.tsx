"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon, XIcon } from "lucide-react";
import { SortOption } from "@/lib/actions/product.actions";
interface Tsort_options {
  value: SortOption;
  label: string;
}
const CATEGORIES = [
  { value: "", label: "همه دسته‌بندی‌ها" },
  { value: "موبایل", label: "موبایل" },
  { value: "لپتاپ", label: "لپتاپ" },
  { value: "هدفون", label: "هدفون" },
];

const SORT_OPTIONS: Tsort_options[] = [
  { value: "newest", label: "جدیدترین" },
  { value: "price-asc", label: "ارزان‌ترین" },
  { value: "price-desc", label: "گران‌ترین" },
  { value: "name", label: "نام (الفبایی)" },
];

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const query = searchParams.get("query") ?? "";
  const category = searchParams.get("category") ?? "";
  const sort = (searchParams.get("sort") as SortOption) ?? "newest";

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    startTransition(() => {
      router.push(`/product?${params.toString()}`);
    });
  }

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = (formData.get("query") as string) ?? "";
    updateParams("query", searchQuery.trim());
  }

  function clearSearch() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("query");
    startTransition(() => {
      router.push(`/product?${params.toString()}`);
    });
  }

  return (
    <div className="flex flex-col gap-3 mb-6">
      <form onSubmit={handleSearch} className="relative">
        <Input
          name="query"
          defaultValue={query}
          placeholder="جستجو در نام یا برند محصول..."
          className="h-10 ps-10 pe-10"
        />
        <SearchIcon className="absolute inset-s-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute inset-e-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <XIcon className="size-4" />
          </button>
        )}
      </form>

      <div className="flex gap-3">
        <select
          value={category}
          onChange={(e) => updateParams("category", e.target.value)}
          className="h-10 rounded-lg border border-input bg-transparent px-2.5 text-base md:text-sm cursor-pointer outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {CATEGORIES.map((cat) => (
            <option
              key={cat.value}
              value={cat.value}
              className="caret-blue-700"
            >
              {cat.label}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => updateParams("sort", e.target.value)}
          className="h-10 rounded-lg border border-input bg-transparent px-2.5 text-base md:text-sm cursor-pointer outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {isPending && (
          <span className="text-xs text-muted-foreground self-center">
            در حال بارگذاری...
          </span>
        )}
      </div>
    </div>
  );
}
