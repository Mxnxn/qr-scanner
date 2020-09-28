export default class Meal {
	constructor(
		id,
		cids,
		title,
		affordability,
		complexity,
		imageurl,
		duration,
		indigredients,
		steps,
		isGlutenFree,
		isVegan,
		isVeg,
		isLactosFree
	) {
		this.id = id;
		this.cids = cids;
		this.title = title;
		this.affordability = affordability;
		this.complexity = complexity;
		this.imageurl = imageurl;
		this.duration = duration;
		this.indigredients = indigredients;
		this.steps = steps;
		this.isGlutenFree = isGlutenFree;
		this.isVegan = isVegan;
		this.isVeg = isVeg;
		this.isLactosFree = isLactosFree;
	}
}
