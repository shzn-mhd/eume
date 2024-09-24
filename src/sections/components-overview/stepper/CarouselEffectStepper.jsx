import PropTypes from 'prop-types';

// material-ui
import { Box, Button, Typography } from '@mui/material';

// third-party
import Slider from 'react-slick';

// project-imports
import MainCard from 'components/MainCard';

// assets
import { RightOutlined, LeftOutlined } from '@ant-design/icons';

// ==============================|| STEPPER - CAROUSEL EFFECT ||============================== //

function SampleNextArrow({ className, style, onClick }) {
  return (
    <div className={className} style={{ ...style, display: 'block', top: '87%', right: 64 }}>
      <Button onClick={onClick} endIcon={<RightOutlined size={14} />} sx={{ my: 2, mx: 1 }} size="small">
        Next
      </Button>
    </div>
  );
}

SampleNextArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func
};

function SamplePrevArrow({ className, style, onClick }) {
  return (
    <div className={className} style={{ ...style, display: 'block', top: '87%', left: 0 }}>
      <Button onClick={onClick} startIcon={<LeftOutlined size={14} />} sx={{ my: 2, mx: 1 }} size="small">
        Back
      </Button>
    </div>
  );
}

SamplePrevArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func
};

function CarouselEffectStepper() {
  const images = [
    {
      label: 'San Francisco',
      imgPath: 'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60'
    },
    {
      label: 'Bird',
      imgPath: 'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60'
    },
    {
      label: 'Bali, Indonesia',
      imgPath: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80'
    },
    {
      label: 'Goč, Serbia',
      imgPath: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
    }
  ];

  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (
    <MainCard
      content={false}
      sx={{
        '& .slick-dots': { position: 'static', pt: 1, pb: 1.5 },
        '& .slick-prev:before': { display: 'none' },
        '& .slick-next:before': { display: 'none' }
      }}
    >
      <Slider {...settings}>
        {images.map((step, index) => (
          <Box key={index}>
            <Box sx={{ p: 1.75 }}>
              <Typography>{step.label}</Typography>
            </Box>
            <Box
              component="img"
              sx={{
                height: 255,
                display: 'block',
                overflow: 'hidden',
                width: '100%'
              }}
              src={step.imgPath}
              alt={step.label}
            />
          </Box>
        ))}
      </Slider>
    </MainCard>
  );
}

export default CarouselEffectStepper;
