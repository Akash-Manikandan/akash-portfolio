"use client"

import AnimatedCursor from "react-animated-cursor"
import { useMediaQuery } from "react-responsive"

const CustomCursor = () => {
    const isMobile = useMediaQuery({ maxWidth: 540 })
    return (
        !isMobile ? <AnimatedCursor /> : <></>
    )
}

export default CustomCursor