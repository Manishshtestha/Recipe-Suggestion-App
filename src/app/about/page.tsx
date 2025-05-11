const About = () => {

  return (

		<main className="min-h-screen p-8 md:p-12 max-w-4xl mx-auto text-neutral-300 font-mono">
			<h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-cyan-400 uppercase tracking-wider">
				About // Kitchen Genie v1.0
			</h1>
			<div className="space-y-6 bg-neutral-900 bg-opacity-70 p-6 md:p-8 border border-neutral-700 shadow-lg shadow-cyan-500/10 rounded-none">
				<p className="text-md md:text-lg mb-4 text-neutral-400 leading-relaxed text-justify">
					<span className="text-pink-400 font-semibold">// System Log:</span> Kitchen Genie is a CULINARY ALGORITHM designed to help you discover 
					delicious recipes based on the DATA STREAMS (ingredients) you have at hand. 
					Instead of querying recipes by name or cuisine, Kitchen 
					Genie allows you to input your current inventory and generates recipe suggestions tailored to your parameters.
				</p>
				<p className="text-md md:text-lg mb-4 text-neutral-400 leading-relaxed text-justify">
					<span className="text-pink-400 font-semibold">// Primary Directive:</span> This ingredient-based recipe generator aims to MINIMIZE RESOURCE DEFICIT (reduce food 
					waste), inspire culinary innovation (creativity in cooking), and OPTIMIZE MEAL PREPARATION PROTOCOLS 
					(make meal prep easier and more enjoyable). Whether you have a few rogue data points or a fully stocked 
					database, Kitchen Genie helps you maximize asset utilization.
				</p>
				<p className="text-md md:text-lg mb-4 text-neutral-400 leading-relaxed text-justify">
					<span className="text-pink-400 font-semibold">// Tech Stack:</span> The project is BUILT WITH ADVANCED FRAMEWORKS (modern web technologies) and focuses on 
					providing a seamless user interface, high-velocity performance, and 
					accurate recipe vectoring.
				</p>
				<p className="text-md md:text-lg text-neutral-400 leading-relaxed text-justify">
					<span className="text-pink-400 font-semibold">// Engage:</span> Feel free to explore the recipe databank, upload your own schematics, 
					or initiate generation protocols based on your available components.
				</p>
			</div>
		</main>
  );
};

export default About;
