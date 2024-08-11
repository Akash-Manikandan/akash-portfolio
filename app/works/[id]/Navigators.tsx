'use client';

import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

const Navigators = ({ id, type, handleNavigation }: { id: string | undefined, type: string, handleNavigation: (id: string | undefined) => void }) => {
    return (
        <Button variant="outline" size="icon" disabled={!!!id} onClick={() => handleNavigation(id)}>
            {type === 'prev' && <ChevronLeftIcon className="h-4 w-4" />}
            {type === 'next' && <ChevronRightIcon className="h-4 w-4" />}
        </Button>
    )
}

export default Navigators