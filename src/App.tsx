import { useEffect, useState } from "react";

interface IQuote {
	quote: string;
	author: string;
}

const bgColor: Array<string> = [
	"bg-neutral-800",
	"bg-red-800",
	"bg-amber-800",
	"bg-lime-800",
	"bg-green-600",
	"bg-cyan-800",
	"bg-blue-700",
	"bg-violet-600",
	"bg-emerald-500",
	"bg-fuchsia-900",
];

function App() {
	const [loading, SetLoading] = useState<Boolean>(false);
	const [quotes, SetQuotes] = useState<IQuote[]>([{ quote: "", author: "" }]);
	const [selectedQuote, SetSelectedQuote] = useState<IQuote>({
		quote: "",
		author: "",
	});
	const [selectedColor, SetSelectedColor] = useState<string>("");

	useEffect(() => {
		const getQuote = async () => {
			SetLoading(true);
			const response = await fetch(
				"https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
			);
			var data = await response.json();
			SetQuotes(data.quotes);
			SetSelectedColor(bgColor[Math.floor(Math.random() * 11)]);
			SetSelectedQuote(data.quotes[Math.floor(Math.random() * 101)]);
			return SetLoading(false);
		};
		getQuote();
	}, []);

	const handleNextQuote = () => {
		SetLoading(true);
		setTimeout(() => {
			SetSelectedQuote(quotes[Math.floor(Math.random() * 101)]);
			SetSelectedColor(bgColor[Math.floor(Math.random() * 10)]);
			SetLoading(false);
		}, 600);
		return;
	};

	return (
		<>
			<div
				className={`transition-all duration-300  ease-in-out ${selectedColor} bg-opacity-100 h-screen grid place-items-center`}>
				<div
					id="quote-box"
					className={`${loading ? "slit-out-vertical" : "slit-in-vertical"}
        border border-2 drop-shadow-xl
        bg-white flex flex-col p-7 md:min-w-[400px] min-w-[200px] max-w-[350px] rounded-md md:max-w-[500px]`}>
					<div className="text-end">
						<p
							className="md:text-2xl text-lg font-semibold text-center"
							id="text">
							{selectedQuote.quote}
						</p>
						<p className="mt-3" id="author">
							- {selectedQuote.author}
						</p>
					</div>
					<div className="flex justify-between items-center mt-3">
						<div className="flex gap-x-2">
							<a
								id="tweet-quote"
								href={`https://twitter.com/intent/tweet/?hashtags=quotes&text="${selectedQuote.quote}" ${selectedQuote.author}`}
								className="p-3 bg-sky-800 rounded-md">
								<svg
									className="w-5 fill-white"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512">
									'
									<path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
								</svg>
							</a>
							<button className="py-3 px-4 bg-sky-800 rounded-md">
								<svg
									className="w-4 fill-white"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 320 512">
									<path d="M309.8 480.3c-13.6 14.5-50 31.7-97.4 31.7-120.8 0-147-88.8-147-140.6v-144H17.9c-5.5 0-10-4.5-10-10v-68c0-7.2 4.5-13.6 11.3-16 62-21.8 81.5-76 84.3-117.1 .8-11 6.5-16.3 16.1-16.3h70.9c5.5 0 10 4.5 10 10v115.2h83c5.5 0 10 4.4 10 9.9v81.7c0 5.5-4.5 10-10 10h-83.4V360c0 34.2 23.7 53.6 68 35.8 4.8-1.9 9-3.2 12.7-2.2 3.5 .9 5.8 3.4 7.4 7.9l22 64.3c1.8 5 3.3 10.6-.4 14.5z" />
								</svg>
							</button>
						</div>
						<button
							id="new-quote"
							onClick={handleNextQuote}
							className="p-2 bg-sky-800 rounded-md text-white">
							New Quote
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
