import { Box } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import { Container, Typography } from "@mui/material";
import { testimonialData } from "../../../constant";

const TestimonialSection = () => {
  const settings = {
    focusOnSelect: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 500,
    dots: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
          arrows: false,
        },
      },
    ],
  };
  return (
    <>
      <Box className="Testimonial-section">
        <Container>
          <Box className="slider-container">
            <Typography className="heading-content text-display mt-30">
              Our Clients about us..
            </Typography>
            <Slider {...settings}>
              {testimonialData.map((testimonial, index) => (
                <Box className="testimonials" key={index}>
                  <Box className="testimonials-container">
                    <Typography variant="body1" className="subheading">
                      {testimonial.testimonial}
                    </Typography>
                    <Typography variant="h6" className="heading mt-10">
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" className="content mt-18">
                      - {testimonial.position}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Slider>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default TestimonialSection;
