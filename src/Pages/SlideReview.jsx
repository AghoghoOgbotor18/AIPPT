import React, { lazy, Suspense, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const SlidesEditor = lazy(() => import("../Components/Slides/SlidesEditor"));

const SlideReview = () => {
  const location = useLocation();
  const initialSlides = location.state?.slides;

  const [slidesJson, setSlidesJson] = useState(initialSlides);

  useEffect(() => {
    scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, []);

  return (
    <div className="container mx-auto py-10">
      {slidesJson ? (
        <Suspense fallback={<p>loading...</p>}>
          <SlidesEditor slidesJson={slidesJson} setSlidesJson={setSlidesJson} />
        </Suspense>
      ) : (
        <p className="text-gray-500 text-center">
          No slides found. Go back and generate again.
        </p>
      )}
    </div>
  );
};

export default SlideReview;
