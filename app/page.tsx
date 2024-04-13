// app/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ImageGallery from "../components/ImageGallery";

const HomePage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const image = searchParams.get("image");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (imageId: string) => {
    setIsModalOpen(true);
    router.push(`/?image=${imageId}`);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    router.push("/");
  };

  return (
    <div className="container mx-auto py-8">
      <ImageGallery
        onImageClick={handleImageClick}
        isModalOpen={isModalOpen}
        onModalClose={handleModalClose}
      />
      {image && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <img
              src={`/images/${image}.jpg`}
              alt={image}
              className="w-full h-auto"
            />
            <button
              className="mt-4 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
              onClick={handleModalClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;