import axios from "axios";

class handleDT {
	async getData(url) {
		try {
			const res = await axios.get(
				"https://www.tikwm.com/api/?url=" + url
			);
			return {
				result: res.data,
				data: res.data.data,
			};
		} catch (error) {
			console.error("Error fetching data:", error);
			return null;
		}
	}

	async images(data) {
		return data.map((link) => link);
	}
}

export default handleDT;
