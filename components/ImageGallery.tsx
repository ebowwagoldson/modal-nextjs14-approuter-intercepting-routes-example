// app/ImageGallery.tsx
import React from "react";

interface ImageGalleryProps {
  onImageClick: (imageId: string) => void;
  isModalOpen: boolean;
  onModalClose: () => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  onImageClick,
  isModalOpen,
  onModalClose,
}) => {
  const imageIds = [1, 2, 3, 4, 5, 6];

  return (
    <div className="grid grid-cols-3 gap-4">
      {imageIds.map((imageId) => (
        <div
          key={imageId}
          className="cursor-pointer"
          onClick={() => onImageClick(`image${imageId}`)}
        >
          <img
            src={`/images/image${imageId}.jpg`}
            alt={`Image ${imageId}`}
            className="w-full h-auto"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;