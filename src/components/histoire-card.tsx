interface HistoireCardProps {
	image: string;
	title: string;
}

const HistoireCard = ({ image, title }: HistoireCardProps) => {
	return (
		<div
			className='
        cursor-pointer
        rounded-2xl overflow-hidden
        bg-black/20 backdrop-blur-sm
        transition-all duration-300
        hover:scale-[1.02] hover:bg-black/40
      '
		>
			<img
				src={image}
				alt={title}
				className='w-full h-32 object-cover opacity-90'
			/>
			<div className='p-4'>
				<h3 className='text-md font-semibold text-white max-lg:text-sm max-md:text-lg'>
					{title}
				</h3>
			</div>
		</div>
	);
};

export default HistoireCard;
