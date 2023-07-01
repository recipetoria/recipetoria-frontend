import React, { ReactNode, createContext, useMemo, useState } from "react";

interface ProviderProps {
  children: React.ReactNode;
}

export interface IModalContentContext {
  modalContent: ReactNode | null;
  setModalContent: (value: ReactNode | null) => void;
}

export const ModalContentContext = createContext<IModalContentContext>({
  modalContent: null,
  setModalContent: () => {},
});

export function ModalContentContextProvider({ children }: ProviderProps) {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const value = useMemo(
    () => ({ modalContent, setModalContent }),
    [modalContent, setModalContent]
  );

  return (
    <ModalContentContext.Provider value={value}>
      {children}
    </ModalContentContext.Provider>
  );
}
