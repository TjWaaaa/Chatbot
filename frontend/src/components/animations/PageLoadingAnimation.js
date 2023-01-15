import { Player, Controls } from '@lottiefiles/react-lottie-player';
function Index() {
	return (
		<Player autoplay loop src="/animations/page-loading.json" style={{ height: '250px', width: '500px' }}>
			<Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
		</Player>
	);
}

export default Index;
