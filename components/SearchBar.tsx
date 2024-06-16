"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { LoaderCircle } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/Command";
import { useDebounce } from "@/lib/hooks";
import { formatBuildingID } from "@/lib/utils";
import { searchBuildings } from "@/lib/services";
import { GooglePlace } from "@/lib/interfaces";

const SearchBar = () => {
  const { push } = useRouter();
  const [searching, setSearching] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [searchResults, setSearchResults] = useState<GooglePlace[]>([]);

  const handleValueChange = (val: string) => {
    setSearchText(val);
  };

  const handleRedirectToBuildingPage = useCallback(
    (buildingName: string) => {
      const buildingID = formatBuildingID(buildingName);
      push(`/building/${buildingID}`);
    },
    [push]
  );

  // Handle the UI state when the search text changes
  useEffect(() => {
    if (!searchText) {
      setSearching(false);
      setSearchResults([]);
    } else {
      setSearching(true);
    }
  }, [searchText]);

  // Use the debounced search text to avoid making too many API requests
  const debouncedSearchText = useDebounce(searchText, 333);
  useEffect(() => {
    if (debouncedSearchText) {
      setSearching(true);
      searchBuildings(debouncedSearchText).then((results) => {
        setSearchResults(results);
        setSearching(false);
      });
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchText]);

  return (
    <div className="w-full max-w-[580px]">
      <Command className="rounded-lg border shadow-md" shouldFilter={false}>
        <CommandInput
          placeholder="Search a building in Dubai..."
          onValueChange={handleValueChange}
        />
        <CommandList>
          {/* Loading state when we have the search text and we did an API req */}
          {searching && (
            <div className="flex items-center justify-center py-2">
              <LoaderCircle className="text-neutral-500 animate-spin" />
            </div>
          )}
          {/* When we have search results and it's empty */}
          {!searching && searchText && searchResults.length === 0 && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
          {/* When we have search results */}
          {!searching && searchResults.length > 0 && (
            <CommandGroup heading="Suggestions">
              {searchResults.map((result, index) => {
                const buildingName = result.displayName.text;
                return (
                  <CommandItem
                    key={`${buildingName}-${index}`}
                    className="cursor-pointer"
                    onSelect={() => handleRedirectToBuildingPage(buildingName)}
                  >
                    <span>{buildingName}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    </div>
  );
};

export default SearchBar;
