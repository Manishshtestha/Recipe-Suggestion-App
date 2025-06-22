const RecipeCardSkeleton = () => {
	return (
		<div className="group flex flex-col sm:flex-row gap-4 border-2 border-neutral-800 bg-neutral-900 p-4 rounded-none animate-pulse">
			{/* Image Skeleton */}
			<div className="w-full sm:w-[150px] h-[200px] sm:h-[150px] bg-neutral-700 rounded"></div>
			<div className="flex-grow space-y-3">
				{/* Title Skeleton */}
				<div className="w-3/4 h-6 bg-neutral-700 rounded"></div>
				{/* Ingredient Skeletons */}
				<div className="space-y-2">
					<div className="w-1/2 h-4 bg-neutral-700 rounded"></div>
					<div className="w-1/3 h-4 bg-neutral-700 rounded"></div>
				</div>
				{/* Nutrition Skeletons */}
				<div className="space-y-2 pt-2">
					<div className="w-full h-3 bg-neutral-700 rounded"></div>
					<div className="w-5/6 h-3 bg-neutral-700 rounded"></div>
				</div>
			</div>
		</div>
	);
};

export default RecipeCardSkeleton; 