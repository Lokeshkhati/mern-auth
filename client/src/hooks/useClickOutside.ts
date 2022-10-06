import { useEffect } from 'react';
const useClickOutside = (ref: any, callback: any) => {
    const handleClick = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            callback();
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleClick);
        document.addEventListener('touchstart', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('touchstart', handleClick);
        };
    });
};

export default useClickOutside
