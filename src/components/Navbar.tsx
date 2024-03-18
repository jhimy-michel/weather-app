"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { github } from "@/utils/icons";
import { ThemeDropdown } from "./ThemeDropdown/ThemeDropdown";
import SearchDialog from "./SearchDialog/SearchDialog";

export default function Navbar() {
  const router = useRouter();

  return (
    <div className="w-full py-4 flex items-center justify-between">
      <div className="left"></div>
      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
        <SearchDialog />

        <div className="btn-group flex items-center gap-2">
          <ThemeDropdown />

          <Button
            className="source-code-btn flex items-center gap-2"
            onClick={() => {
              router.push("https://github.com");
            }}
          >
            {github} Search
          </Button>
        </div>
      </div>
    </div>
  );
}
