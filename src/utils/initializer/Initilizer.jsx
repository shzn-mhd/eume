import useInitializer from 'hooks/useInitializer';
import { useEffect } from 'react';

const InitializerComponent = (props) => {
    const {children} = props;
    const {initilizeLogin} = useInitializer();

    useEffect(()=>{
      initilizeLogin();
    },[])

    return children;
    
};

export default InitializerComponent;