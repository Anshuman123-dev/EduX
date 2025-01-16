import React, { useEffect, useState } from 'react';
import RatingStars from '../../common/RatingStars';
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';

const Course_Card = ({ course = {}, Height = 'h-64' }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    // Calculate average review count if `ratingAndReviews` exists
    if (course.ratingAndReviews && course.ratingAndReviews.length > 0) {
      const count = GetAvgRating(course.ratingAndReviews);
      if (count !== avgReviewCount) {
        setAvgReviewCount(count);
      }
    }
  }, [course, avgReviewCount]);

  return (
    <Link to={`/courses/${course._id || ''}`}>
      <div className="rounded-lg bg-richblack-800 p-4 shadow-md">
        {/* Thumbnail */}
        <div className="rounded-lg overflow-hidden">
          <img
            src={course?.thumbnail || '/placeholder-image.jpg'}
            alt={course?.courseName || 'Course Thumbnail'}
            className={`${Height} w-full rounded-xl object-cover`}
          />
        </div>

        {/* Course Details */}
        <div className="flex flex-col gap-2 px-1 py-3">
          {/* Course Name */}
          <p className="text-xl font-semibold text-richblack-5 truncate">
            {course?.courseName || 'Untitled Course'}
          </p>

          {/* Instructor Name */}
          <p className="text-sm text-richblack-50">
            {course?.instructor?.firstName || 'Unknown'}{' '}
            {course?.instructor?.lastName || ''}
          </p>

          {/* Rating and Reviews */}
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 font-semibold">
              {avgReviewCount || 0}
            </span>
            <RatingStars Review_Count={avgReviewCount} />
            <span className="text-sm text-richblack-400">
              ({course?.ratingAndReviews?.length || 0} Ratings)
            </span>
          </div>

          {/* Price */}
          <p className="text-lg font-semibold text-richblack-5">
            Rs. {course?.price || 'Free'}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Course_Card;
