const useLocalStorageFunctions=()=>{
    const getLocalstorageValue = (key) => {
        if (typeof window !== 'undefined') {
          const storedValue = localStorage.getItem(key);
          return storedValue ? JSON.parse(storedValue) : null;
        }
        return null;
      };
    
      const setLocalstorageValue = (key, data) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem(key, JSON.stringify(data));
        }
      };

      return {getLocalstorageValue, setLocalstorageValue}
}

export default useLocalStorageFunctions;