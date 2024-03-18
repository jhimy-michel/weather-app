"use client";
import React from "react";
import { Dialog } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { commandIcon } from "@/utils/icons";

const SearchDialog = () => {
  return (
    <div className="search-btn">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="border inline-flex items-center justify-center text-sm font-medium hover:dark:bg-[#131313] hover:bg-slate-100  ease-in-out duration-200"
          >
            <p className="text-sm text-muted-foreground">Search Here...</p>
            <div className="command dark:bg-[#262626] bg-slate-200  py-[2px] pl-[5px] pr-[7px] rounded-sm ml-[10rem] flex items-center gap-2">
              {commandIcon}
              <span className="text-[9px]">F</span>
            </div>
          </Button>
        </DialogTrigger>
      </Dialog>
    </div>
  );
};

export default SearchDialog;
