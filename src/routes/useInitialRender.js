/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';

export const useInitialRender = () => {
  const [isInitialRender, setIsInitialRender] = useState(false);

  if (!isInitialRender) {
    setTimeout(() => setIsInitialRender(true), 1);
    return true;
  }
  return false;
};
