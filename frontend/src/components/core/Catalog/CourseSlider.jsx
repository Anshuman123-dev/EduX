import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';

import Course_Card from './Course_Card';

const CourseSlider = ({ courses = [] }) => {
  return (
    
    <>
      {courses.length > 0 ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          modules={[FreeMode, Pagination]}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="max-h-[30rem]"
        >
          {courses?.map((course, index) => (
            <SwiperSlide key={course._id || index}>
              <Course_Card course={course} Height="h-[250px]" />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5 text-center">
          No courses available at the moment.
        </p>
      )}
    </>
  );
};

export default CourseSlider;
