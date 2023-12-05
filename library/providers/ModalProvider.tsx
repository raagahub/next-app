// import Modal from "@/components/Modal";
import { useEffect, useState } from "react";

import { AuthModal } from '../components/ui_components/AuthModal/AuthModal'


interface ModalProviderProps {
//   products: ProductWithPrice[];
}

const ModalProvider: React.FC<ModalProviderProps> = ({
//   products
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
    </>
  );
}

export default ModalProvider;