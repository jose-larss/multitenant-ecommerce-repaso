import { RefObject } from "react"

export const useDropDownPosition = (ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>) => {
    const getDropDownPosition = () => {
        if (!ref.current) return{top:0, left:0}

        const rect = ref.current.getBoundingClientRect();
        const dropdownWith = 240; //Width of dropdown (w-60 = 15 rem = 240px)

        //calculate the initial position
        let left = rect.left + window.scrollX
        const top = rect.bottom + window.scrollY

        // check if gropdown would go off the right edge of the viewport
        if (left + dropdownWith > window.innerWidth) {
            left = rect.right + window.scrollY - dropdownWith

            // is still off-screen, align to the right edge of viewport with some padding
            if (left < 0) {
                left = window.innerWidth - dropdownWith - 16
            }
        }
        // ensure dropdown dosent go off left edge
        if (left < 0) {
            left = 16
        }
        return {top, left}

    }
    return {getDropDownPosition}
}