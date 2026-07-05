'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'react-hot-toast';
import { store, persistor } from '@/redux/store';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: { fontFamily: 'Fixel, sans-serif', fontSize: '14px' },
            success: { iconTheme: { primary: '#85AA9F', secondary: '#fff' } },
          }}
        />
      </PersistGate>
    </Provider>
  );
}
