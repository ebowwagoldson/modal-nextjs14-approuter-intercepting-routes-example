# Modal Nextjs14 App Router Intercepting Routes Example

Understood. I will focus solely on the code you provided and write the updated documentation from scratch, taking the time to provide a thorough and exhaustive explanation.

# Intercepting Routes in a Next.js Image Gallery

The code you provided demonstrates the implementation of an image gallery with a modal functionality using intercepting routes in a Next.js application.

## The `ImageGallery` Component

The `ImageGallery` component is responsible for rendering the grid of images. It accepts three props:

1. `onImageClick`: a function that is called when an image is clicked, passing the `imageId` as a parameter.
2. `isModalOpen`: a boolean that indicates whether the modal should be displayed.
3. `onModalClose`: a function that is called when the modal should be closed.

```typescript
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
```

The `ImageGallery` component maps over an array of `imageIds` and renders each image as a clickable div. When an image is clicked, the `onImageClick` function is called with the corresponding `imageId`.

## The `HomePage` Component

The `HomePage` component is the main page that renders the `ImageGallery` component. It uses the `useRouter` and `useSearchParams` hooks from Next.js to interact with the router and URL parameters.

```typescript
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
```

When an image is clicked in the `ImageGallery` component, the `handleImageClick` function is called, which sets the `isModalOpen` state to `true` and updates the URL with the `image` query parameter.

```typescript
const handleImageClick = (imageId: string) => {
  setIsModalOpen(true);
  router.push(`/?image=${imageId}`);
};
```

The code then checks if the `image` query parameter is present in the URL. If it is, it renders a modal overlay with the corresponding image.

```typescript
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
```

To close the modal, the `handleModalClose` function is called, which sets the `isModalOpen` state to `false` and removes the `image` query parameter from the URL.

```typescript
const handleModalClose = () => {
  setIsModalOpen(false);
  router.push("/");
};
```

## Intercepting Routes

The key aspect of this implementation is the use of intercepting routes. When the user clicks on an image in the `ImageGallery` component, the URL is updated with the `image` query parameter (e.g., `/?image=image1`). This URL is then used to render the modal overlay with the corresponding image.

By intercepting the route with the `image` query parameter, the application can display the modal content without the user navigating away from the main page. This ensures that the modal content is shareable through a URL, preserves the context when the page is refreshed, and allows for proper navigation behavior (closing the modal on backwards navigation and reopening it on forwards navigation).

## Conclusion

The code you provided demonstrates the use of intercepting routes in a Next.js application to create a modal-based image gallery. By leveraging this routing feature, the application can provide a seamless user experience, where the modal content is shareable through a URL, the context is preserved when the page is refreshed, and the navigation behavior (opening and closing the modal) is handled correctly.

This implementation showcases the power of Next.js's routing capabilities and how they can be used to build complex and dynamic user interfaces.

# Intercepting Routes

The code you provided demonstrates the use of intercepting routes in a Next.js application to create a modal-based image gallery.

Intercepting routes allows you to load a route from another part of your application within the current layout, without the user switching to a different context. This is particularly useful when you want to display content, such as a photo or a login modal, without the user navigating away from the current page.

In the provided code, the `/?image=:imageId` route is used to intercept the URL and display the modal. When the user clicks on an image in the `ImageGallery` component, the `handleImageClick` function is called, which sets the `isModalOpen` state to `true` and updates the URL with the `image` query parameter.

```typescript
const handleImageClick = (imageId: string) => {
  setIsModalOpen(true);
  router.push(`/?image=${imageId}`);
};
```

When the URL is updated with the `image` query parameter, the code checks if the `image` parameter is present and renders the modal overlay with the corresponding image.

```typescript
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
```

This approach ensures that the modal content is shareable through a URL, preserves the context when the page is refreshed, and allows for proper navigation behavior (closing the modal on backwards navigation and reopening it on forwards navigation).

# Parallel Routes

While the provided code does not explicitly use parallel routes, it's worth discussing how they could be used in this context to further improve the application's structure and functionality.

Parallel routes allow you to simultaneously or conditionally render one or more pages within the same layout. This can be particularly useful for highly dynamic sections of an app, such as dashboards and feeds on social sites.

In the context of the image gallery, you could use parallel routes to separate the main gallery content from the modal content. This would allow you to manage the state and rendering of the gallery and the modal independently, leading to a more modular and maintainable codebase.

For example, you could have the following file structure:

```
app/
  layout.tsx
  page.tsx
  @modal/
    (.)image/
      page.tsx
```

In this setup, the `page.tsx` file would render the `ImageGallery` component, while the `@modal/(.)image/page.tsx` file would render the modal content.

The `layout.tsx` file would then accept the `@modal` slot as a prop and render it alongside the `children` prop (the main gallery content):

```typescript
export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
```

This separation of concerns would allow you to independently manage the state and rendering of the gallery and the modal, making the codebase more modular and easier to maintain.

# Modal Behavior

The modal behavior in the provided code is implemented using a combination of state management and URL manipulation.

When the user clicks on an image in the `ImageGallery` component, the `handleImageClick` function is called, which sets the `isModalOpen` state to `true` and updates the URL with the `image` query parameter:

```typescript
const handleImageClick = (imageId: string) => {
  setIsModalOpen(true);
  router.push(`/?image=${imageId}`);
};
```

When the `image` query parameter is present in the URL, the code renders the modal overlay with the corresponding image:

```typescript
{image && (
  <div className="fixed inset-0 flex items-center justify-center z-10">
    {/* Modal content */}
  </div>
)}
```

To close the modal, the `handleModalClose` function is called, which sets the `isModalOpen` state to `false` and removes the `image` query parameter from the URL:

```typescript
const handleModalClose = () => {
  setIsModalOpen(false);
  router.push("/");
};
```

This approach ensures that the modal content is shareable through a URL, preserves the context when the page is refreshed, and allows for proper navigation behavior (closing the modal on backwards navigation and reopening it on forwards navigation).

When the user navigates away from the modal (e.g., by clicking the "Close" button or using the browser's back button), the `isModalOpen` state is set to `false`, and the `image` query parameter is removed from the URL. This ensures that the modal is no longer displayed, and the user is returned to the main gallery view.
