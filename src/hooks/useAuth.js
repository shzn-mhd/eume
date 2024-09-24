import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// auth provider
// import AuthContext from 'contexts/JWTContext';
import AuthContext from 'contexts/FirebaseContextUpdated';

// ==============================|| AUTH HOOKS ||============================== //

const useAuth = () => {
  const { t, i18n } = useTranslation();
  const context = useContext(AuthContext);
  const [translatedRole, setTranslatedRole] = useState('');

  useEffect(() => {
    if (context) {
      // Translate the roleName
      const translated = t(context.user?.roleName);
      setTranslatedRole(translated);
    }
  }, [context, t]);

  if (!context) throw new Error('context must be used inside provider');

  return {
    ...context,
    translatedRole
  };
};

export default useAuth;
