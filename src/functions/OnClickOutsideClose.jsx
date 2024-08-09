import { useEffect } from "react";

 // set a function when onclick outside of  will close the dropdown menu or popup
export default function useOnClickOutsideClose(ref, callback){
    useEffect(() => {
        const handleOnClickOutside = (event) => {
                if (ref.current && !ref.current.contains(event.target)){
                    callback();
                }
            };
        document.addEventListener('mousedown', handleOnClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleOnClickOutside);
        };
     }, [ref, callback]);

}   