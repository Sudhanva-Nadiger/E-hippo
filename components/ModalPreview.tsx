"use client";

import { useModalPreview } from "@/hooks/use-modal-preview";
import Gallery from "@/components/gallery";
import Info from "@/components/ui/Info";
import Modal from "@/components/ui/Modal";


const PreviewModal = () => {
  const previewModal = useModalPreview();
  const product = useModalPreview((state) => state.product);

  if (!product) {
    return null;
  }

  return ( 
    <Modal 
      open={previewModal.isOpen} 
      onClose={previewModal.close}
    >
      <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
        <div className="sm:col-span-4 lg:col-span-5">
          <Gallery images={product.images} />
        </div>
        <div className="sm:col-span-8 lg:col-span-7">
          <Info data={product} />
        </div>
      </div>
    </Modal>
  );
}
 
export default PreviewModal;