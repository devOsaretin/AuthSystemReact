import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Photo } from "../../interfaces/authentication";

const ImageCarousel = ({ photos }: { photos: Photo[] }) => {
	return (
		<div className="carousel-container rounded-lg">
			<Carousel
				showArrows={true}
				showThumbs={false}
				infiniteLoop={true}
				autoPlay={true}
				interval={3000}
				className="max-w-3xl mx-auto">
				{photos.map(photo => (
					<div className="carousel-item">
						<img src={photo.url} className=" w-[32rem] h-96" />
						<p className="legend text-white">{photo.name}</p>
					</div>
				))}
			</Carousel>
		</div>
	);
};

export default ImageCarousel;
