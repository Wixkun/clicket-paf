import { HistoireWithImage } from "@/types/histoire";

interface HistoireCardProps {
	histoireWithImage: HistoireWithImage;
	showContent?: boolean;
	props?: string;
	imageProps?: string;
}

const HistoireCard = ({
	histoireWithImage,
	showContent = false,
	props = "",
	imageProps = "h-32 object-cover",
}: HistoireCardProps) => {
	return (
		<div
			className={`
        cursor-pointer
        rounded-2xl overflow-hidden
        bg-black/20 backdrop-blur-sm
        transition-all duration-300
        hover:scale-[1.02] hover:bg-black/40
        ${props}
      `}
		>
			<img
				src={histoireWithImage.image || "/images/HistoireImg/img1.jpg"}
				alt={histoireWithImage.titre}
				className={`w-full ${imageProps}`}
			/>
			<div className='p-4'>
				<h3 className='text-md font-semibold text-white max-lg:text-sm max-md:text-lg'>
					{histoireWithImage.titre}
				</h3>
				{showContent && (
					<p className='text-gray-300 max-md:text-sm'>
						{histoireWithImage.contenu.slice(0, 100)}
						{histoireWithImage.contenu.length > 100 && "..."}
					</p>
				)}
			</div>
		</div>
	);
};

export default HistoireCard;
