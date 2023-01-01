function Index({ text }) {
	return (
		<div className="flex flex-row mt-4 items-center ml-4 justify-end">
			<div className="pl-4 pr-4 pt-2 pb-2 ml-4 mr-4 bg-indigo-600 rounded-lg drop-shadow-sm">
				<p className="text text-white">{text}</p>
			</div>
		</div>
	);
}

export default Index;
