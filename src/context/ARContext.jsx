import React, { createContext, useState, useContext } from 'react';

const ARContext = createContext();

export const ARProvider = ({ children }) => {
  // Trạng thái chung: 'qr_waiting', 'qr_scan', 'face_id', 'ready', 'feeding'
  const [stage, setStage] = useState('qr_waiting');

  return (
    <ARContext.Provider value={{ stage, setStage }}>
      {children}
    </ARContext.Provider>
  );
};

// Hook tùy chỉnh để sử dụng Context nhanh hơn
export const useAR = () => {
  const context = useContext(ARContext);
  if (!context) {
    throw new Error('useAR phải được sử dụng trong ARProvider');
  }
  return context;
};