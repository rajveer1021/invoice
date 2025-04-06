import React from "react";
import MarketingHeader from "../../internal/layout/MarketingHeader";
import BannerSection from "../../internal/marketing-components/BannerSection";
import FAQSection from "../../internal/marketing-components/FAQSection";
import TestimonialSection from "../../internal/marketing-components/TestimonialSection";
import MarketingFooter from "../../internal/layout/MarketingFooter";
import { Box, Container, Typography,Link } from "@mui/material";

const ContactPage = () => {
  return (
    <>
      <MarketingHeader
        content={"Return to the "}
        url={"/"}
        buttonTitle={"Return to the Home page"}
      />
      <BannerSection
        heading="We're looking forward to hearing from you."
        content="An entire team is committed to enhancing your experience at no cost. But don't just take our word for it—reach out to us using the email address below and experience it firsthand."
      />
      <Box className="contact-section">
        <Container>
          <Box className="contact-wrapper mt-30 ">
            <Typography variant="body1" color="initial" className="heading">
              📩 How can you reach our Support team?
            </Typography>
            <Typography className="content mt-18">
              When you encounter technical challenges beyond the scope of our
              knowledge base, rest assured that our support agents are here to
              assist you.
            </Typography>
            <Typography className="content mt-18">
              Before reaching out to us, we encourage you to consult our
              documentation, where you may find answers to your inquiries. We
              continuously update our documentation, incorporating new tips and
              tricks regularly.
            </Typography>
            <Typography className="content mt-18">
              Should you require further assistance, you can utilize the
              'Contact Us' button located at the end of each article or email us
              directly at{" "}
              <Link href="mailto:support@invoicean.com" underline="none">
                support@invoicean.com
              </Link>
            </Typography>

            <Box className="danger-box-contact mt-30">
              <Typography variant="body1" color="initial" className="heading">
                ❌ Please refrain from:
              </Typography>
              <Typography className="content mt-18">
                Sending multiple independent emails regarding the same topic.
              </Typography>
              <Typography className="content mt-18">
                Using different email addresses to contact us; for instance,
                avoid sending a message from your Gmail account if your business
                email address is registered.
              </Typography>
              <Typography className="content mt-18">
                Reaching out to us on social media platforms regarding the same
                inquiry. This practice does not expedite the process; rather, it
                slows it down as we are unable to match your account data there.
              </Typography>
            </Box>
            <Box className="success-box-contact mt-30">
              <Typography variant="body1" color="initial" className="heading">
                ✅ Please:
              </Typography>
              <Typography className="content mt-18">
                Specify the issue and utilize the drop-down fields provided.
              </Typography>
              <Typography className="content mt-18">
                Provide a detailed description of the issue (screenshots and
                video recordings are also welcome).
              </Typography>
            </Box>
            <Box className="primary-box-contact mt-30">
              <Typography variant="body1" color="initial" className="heading">
                Working hours
              </Typography>
              <Typography className="content mt-18">
                Our team is available Monday through Friday, from 9:00 AM to
                5:00 PM Indian Standard Time (IST). We will address
                your requests promptly.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
      <FAQSection />
      <TestimonialSection />
      <MarketingFooter />
    </>
  );
};

export default ContactPage;
