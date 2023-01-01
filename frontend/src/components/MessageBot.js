function Index({ text, img }) {
	return (
		<div className="flex flex-row mt-4 items-center ml-4">
			<img src={img} alt="Business Mann 42" className="h-8 w-8 rounded-full" />
			<div className="pl-4 pr-4 pt-2 pb-2 ml-4 mr-4 bg-white rounded-lg drop-shadow-sm">
				<p className="text text-black">{text}</p>
			</div>
		</div>
	);
}

export default Index;
