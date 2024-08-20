"use client";

import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { forwardRef } from "react";
type NavigatorsProps = {
    id: string | undefined;
    type: string;
    handleNavigation: (id: string | undefined) => void;
}

const Navigators = forwardRef<HTMLButtonElement, NavigatorsProps>(({ id, type, handleNavigation }, ref) => {
    return (
        <Button ref={ref} variant="outline" size="icon" disabled={!!!id} onClick={() => handleNavigation(id)}>
            {type === "prev" && <ChevronLeftIcon className="h-4 w-4" />}
            {type === "next" && <ChevronRightIcon className="h-4 w-4" />}
        </Button>
    )
})

Navigators.displayName = "Navigators";

export default Navigators;