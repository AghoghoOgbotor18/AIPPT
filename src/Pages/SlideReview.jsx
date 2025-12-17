import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import SlidesEditor from "../Components/Slides/SlidesEditor";

const SlideReview = () => {
  const location = useLocation();
  const initialSlides = location.state?.slides;

  const [slidesJson, setSlidesJson] = useState(initialSlides);

  return (
    <div className="container mx-auto py-10">
      {slidesJson ? (
        <SlidesEditor slidesJson={slidesJson} setSlidesJson={setSlidesJson} />
      ) : (
        <p className="text-gray-500 text-center">
          No slides found. Go back and generate again.
        </p>
      )}
    </div>
  );
};

export default SlideReview;
