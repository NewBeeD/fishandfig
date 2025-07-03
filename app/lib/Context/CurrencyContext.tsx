// import React, {createContext, useContext, useState, ReactNode} from 'react';

// const defaultRates = {
//   USD: 1,
//   XCD: 2.7,
//   EUR: 0.85,
//   GBP: 0.73,
// };

// type CurrencyContextType = {
//   currency: string;
//   setCurrency: (currency: string) => void;
//   exchangeRates: Record<string, number>;
// };

// const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// export const CurrencyProvider = ({children}: {children: ReactNode}) => {
//   const [currency, setCurrency] = useState('USD');

//   return (
//     <CurrencyContext.Provider value={{currency, setCurrency, exchangeRates: defaultRates}}>
//       {children}
//     </CurrencyContext.Provider>
//   );
// };

// export const useCurrency = () => {
//   const context = useContext(CurrencyContext);
//   if (!context) throw new Error('useCurrency must be used within CurrencyProvider');
//   return context;
// };



import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {useLocation, useNavigate} from 'react-router';

const defaultRates = {
  USD: 1,
  XCD: 2.7,
  EUR: 0.93,
  GBP: 0.79,
  CAD: 1.36,
};

type CurrencyContextType = {
  currency: string;
  setCurrency: (currency: string) => void;
  exchangeRates: Record<string, number>;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({children}: {children: ReactNode}) => {
  const [currency, setCurrencyState] = useState('USD');

  const location = useLocation();
  const navigate = useNavigate();

  // 1. Load currency from URL or localStorage on first mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlCurrency = params.get('currency');
    const localCurrency = localStorage.getItem('selectedCurrency');

    if (urlCurrency) {
      setCurrencyState(urlCurrency);
      localStorage.setItem('selectedCurrency', urlCurrency);
    } else if (localCurrency) {
      setCurrencyState(localCurrency);
    }
  }, []);

  // 2. Update currency + save to localStorage + update URL
  const setCurrency = (newCurrency: string) => {
    setCurrencyState(newCurrency);
    localStorage.setItem('selectedCurrency', newCurrency);

    const params = new URLSearchParams(location.search);
    params.set('currency', newCurrency);
    navigate(`${location.pathname}?${params.toString()}`, {replace: true});
  };

  return (
    <CurrencyContext.Provider value={{currency, setCurrency, exchangeRates: defaultRates}}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
};
