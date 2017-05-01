(function () {
	// angular
	var app = angular.module('restaurants', ['store-products']).config(function ($interpolateProvider) {
		$interpolateProvider.startSymbol('{[{').endSymbol('}]}');
	});
	
	// Store Controller
	app.controller('StoreController', ['$http', function ($http) {

		this.current = 0;
		this.products = [];
		var item = this;
		$http.get('/restaurants/rest_details').success(function (data) {
			item.products = data;
		});

		this.setCurrent = function (newProduct) {
			this.current = newProduct|| 0;
		};
	}]);
	
	// Review Controller
	app.controller('ReviewController', function () {
		this.review = {};
		
		this.addReview = function (product) {
			product.reviews.push(this.review);
			this.review = {};
		}
	});
	
	
	
	// Gems Database
	var gems = [
		{
			name:        'Food Name',
			price:       2.95,
			description: 'Details from back end',
			canPurchase: true,
			soldOut:     false,
			images:      [
				'/images/fingers.jpg',
				'/images/baby.jpg',
				'/images/flowers.JPG',
				'/images/pentax.jpg'
			],
			reviews:     [
				{
					stars:  5,
					body:   'I love this product!',
					author: 'joe@thomas.com'
				},
				{
					stars:  1,
					body:   'This product sucks',
					author: 'sam@hater.org'
				}
			]
		},
		{
			name:        'Food Name',
			price:       5.95,
			description: "Details About food from database",
			canPurchase: true,
			soldOut:     true,
			images:      [
				'/images/pentax.jpg',
				'/images/ants.jpg',
				'/images/fingers.jpg',
				'/images/flowers.JPG'
			],
			reviews:     [
				{
					stars:  5,
					body:   'Omg!! The Orb of Invisibility',
					author: 'joe@thomas.com'
				},
				{
					stars:  5,
					body:   'This give me butterflies',
					author: 'sam@lover.man'
				}
			]
		}
	]
})();
