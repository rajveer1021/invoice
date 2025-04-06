import { Box, Container, Typography } from "@mui/material";
import React from "react";

const AISection = () => {
  return (
    <>
      <Box className="AI-section">
        <Container>
          <Box className="AI-wrapper">
            <Typography className="heading-content text-display mt-30" data-aos="fade-up">
              One-Click Invoice Generation with AI - Comming Soon!!
            </Typography>

            <Box className="AI-details mt-30">
              <Typography className="heading" data-aos="fade-up">
                Make Invoices with AI Coming Soon: One-Click Invoice Generation
              </Typography>

              <Typography className="subheading mt-18" data-aos="fade-up" data-aos-delay="200">
                Are you tired of spending hours crafting invoices manually? Say
                goodbye to tedious invoicing tasks with our revolutionary
                AI-powered solution. With just one click, you can now generate
                professional invoices tailored to your business needs,
                effortlessly and efficiently.
              </Typography>
            </Box>
            <Box className="AI-details mt-30">
              <Typography className="heading" data-aos="fade-up" data-aos-delay="300">
                Introducing: Invoice with AI
              </Typography>

              <Typography className="subheading mt-18" data-aos="fade-up" data-aos-delay="400">
                Our <span className="text-primary">Invoice with AI</span>{" "}
                feature is on its way to streamline the invoicing process like
                never before. Gone are the days of manual data entry and
                formatting headaches. Our cutting-edge AI technology will
                automate the entire invoicing process, saving you time and
                eliminating errors.
              </Typography>
            </Box>
            <Box className="AI-details mt-30">
              <Typography className="heading" data-aos="fade-up" data-aos-delay="500">
                Get Ready to Simplify Your Invoicing Process!
              </Typography>
              <Typography className="subheading mt-18" data-aos="fade-up" data-aos-delay="600">
                Don't let invoicing tasks bog you down any longer. Experience
                the power of AI-driven invoicing with just one click. Keep an
                eye out for the{" "}
                <span className="text-primary">Invoice with AI</span> feature,
                coming soon to revolutionize the way you do business.
              </Typography>
              <Typography className="subheading mt-30 text-primary" data-aos="fade-up" data-aos-delay="700">
                {" "}
                Ready to simplify your invoicing process? Stay tuned for the
                launch of <strong>Invoice with AI!</strong>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default AISection;
