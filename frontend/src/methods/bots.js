export async function getBotsData() {
	var myHeaders = new Headers();
	myHeaders.append("Authorization", "DeepL-Auth-Key c2177cb9-06b8-ef5e-84b9-e4925ec1e935:fx");

	var requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow",
	};
	try {
		const response = await fetch("http://localhost:8000/bots", requestOptions);
		const result = await response.text();

		return JSON.parse(result);
	} catch (e) {
		console.error(e);
	}
}
