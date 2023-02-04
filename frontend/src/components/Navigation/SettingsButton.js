export default function SettingsButton(props) {
	const { text, icon, handleClick } = props;

	return (
		<button className="flex justify-center items-center hover:bg-indigo-50 w-full py-2.5" onClick={handleClick}>
			{icon}
			<p className="w-min truncate">{text}</p>
		</button>
	);
}
