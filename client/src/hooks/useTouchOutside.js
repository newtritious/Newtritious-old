import {useEffect} from "react";

function useTouchOutside(ref, eventResponse) {
    useEffect(() => {
        /**
         * Call passed function if clicked on outside of element
         */
        function handleTouchOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                eventResponse()
            }
        }
  
        // Bind the event listener
        document.addEventListener("touchstart", handleTouchOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("touchstart", handleTouchOutside);
        };
    }, [ref, eventResponse]);
}
  
export default useTouchOutside;