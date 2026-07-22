/** Full café menus (scraped from the live site 2026-07-20). */

export interface MenuItem {
	name: string
	description?: string
	price: string
	note?: string
	isNew?: boolean
}

export interface MenuSection {
	id: string
	title: string
	intro?: string
	items: MenuItem[]
}

export const EAT_MENU: MenuSection[] = [
	{
		id: 'appetizers',
		title: 'Appetizers to Share',
		items: [
			{ name: 'House Special Bruschetta', description: 'Goat cheese, tomatoes, basil, olive oil with balsamic reduction on toasted baguette', price: '$13.99' },
			{ name: 'Pizzetta Margherita', description: 'Housemade roasted tomato & garlic sauce, fresh mozzarella, mixed green, pesto drizzle', price: '$13.99' },
			{ name: 'Chicken Nuggets', price: '$10.99' },
			{ name: 'Popcorn Chicken', price: '$10.99', isNew: true },
			{ name: 'Mozzarella Sticks', price: '$10.99' },
			{ name: 'French Fries', price: '$6.99' },
			{ name: 'Garlic French Fries', price: '$7.99' },
		],
	},
	{
		id: 'soup',
		title: 'Housemade Soup',
		items: [
			{ name: 'Tomato Bisque', description: 'Housemade creamy tomato basil soup', price: '$7.99' },
			{ name: 'Soup & Toasts', description: 'Tomato bisque and two toasts of sourdough bread', price: '$10.99' },
			{ name: 'Soup & Salad Combo', description: 'Tomato bisque and choice of mixed green salad (carrots, tomatoes and cucumbers) or Caesar salad', price: '$12.99' },
		],
	},
	{
		id: 'salads',
		title: 'Signature Salads',
		intro: 'Additional protein for $5 (grilled chicken breast, smoked salmon or two hard boiled eggs)',
		items: [
			{ name: 'Veggie Salad', description: 'Mixed greens, shaved carrots, cherry tomatoes, cucumbers, lemon vinaigrette', price: '$11.99' },
			{ name: 'Caprese Salad', description: 'Fresh mozzarella, arugula, tomatoes, basil, balsamic vinaigrette', price: '$15.99' },
			{ name: 'California Salmon Salad', description: 'Smoked salmon, arugula, avocado, shaved carrots, cherry tomatoes, radishes, cilantro, lemon vinaigrette', price: '$17.99' },
			{ name: 'Chicken Caesar Salad', description: 'Grilled chicken breast, hearts of romaine, cherry tomatoes, shaved Parmesan Reggiano, toasted croutons, creamy Caesar dressing', price: '$17.99', note: 'contains gluten' },
			{ name: 'Cobb Salad', description: 'Grilled chicken breast, romaine and arugula, hard-boiled eggs, avocado, bacon, tomatoes, blue cheese, parsley, Dijon mustard vinaigrette', price: '$19.99' },
			{ name: 'Steak Salad', description: 'Grilled top sirloin, romaine and arugula, avocado, tomatoes, cucumbers, blue cheese crumbles, caramelized onions, parsley, balsamic vinaigrette', price: '$19.99' },
		],
	},
	{
		id: 'toasts',
		title: 'Handcrafted Toasts & Sandwiches',
		intro: 'Served with green salad, French fries or garlic French fries (+$1)',
		items: [
			{ name: 'Grilled Chicken Pesto Sandwich', description: 'Grilled chicken breast, arugula, shaved Parmesan Reggiano, fresh tomatoes, housemade basil pesto on sourdough', price: '$18.99', note: 'gluten-free bread +$1.50' },
			{ name: 'Chicken Swiss Avocado Sandwich', description: 'Grilled chicken breast, avocado, Swiss cheese, arugula, tomatoes, housemade shallot aioli on sandwich bread', price: '$18.99', note: 'gluten-free bread +$1.50' },
			{ name: 'Grilled Chicken Club Sandwich', description: 'Grilled chicken breast, bacon, Swiss cheese, lettuce, tomatoes, housemade shallot aioli on sandwich bread', price: '$19.99', note: 'contains gluten' },
			{ name: 'Smoked Salmon Toast', description: 'Smoked salmon, arugula, avocado, shaved carrots, cherry tomatoes, cilantro, radishes, lemon dressing on cereal bread', price: '$18.99', note: 'gluten-free bread +$1.50' },
			{ name: 'Italian Toast', description: 'Prosciutto, fresh mozzarella, fresh tomatoes, arugula, fresh basil, balsamic drizzle on sourdough', price: '$18.99', note: 'gluten-free bread +$1.50' },
			{ name: 'Croque Monsieur', description: 'French ham, béchamel sauce, Dijon mustard, nutmeg, Swiss cheese on sourdough', price: '$18.99', note: 'contains gluten' },
			{ name: 'Croque Madame', description: 'French ham, béchamel sauce, Dijon mustard, nutmeg, Swiss cheese, topped with a fried egg on sourdough', price: '$19.99', note: 'contains gluten' },
			{ name: 'Cheeseburger', description: 'Beef patty, bacon, cheddar, tomatoes, arugula, housemade shallot aioli on a brioche bun', price: '$19.99', note: 'contains gluten' },
		],
	},
	{
		id: 'pasta',
		title: 'Select Pasta',
		items: [
			{ name: 'Chicken Tomato Rigatoni', description: 'Grilled chicken breast, roasted tomatoes, roasted garlic, basil, shaved Parmesan, rigatoni', price: '$19.49', note: 'contains gluten' },
			{ name: 'Spaghetti & Meatballs', description: 'Housemade beef meatballs, marinara sauce, shaved Parmesan, parsley, spaghetti', price: '$19.49', note: 'contains gluten' },
			{ name: 'Chicken Creamy Pesto Penne', description: 'Grilled chicken breast, housemade pesto, cream sauce, shaved Parmesan, parsley, penne', price: '$19.49', note: 'contains gluten' },
			{ name: 'Creamy Smoked Salmon Penne', description: 'Smoked salmon, capers, white wine cream sauce, shaved Parmesan, penne', price: '$19.49' },
		],
	},
	{
		id: 'desserts',
		title: 'Desserts & Pastries',
		items: [
			{ name: 'Chocolate Mousse', description: 'Belgian dark chocolate mousse on a cookie crumble base', price: '$6.99', isNew: true },
			{ name: 'Chocolate Lava Cake', description: 'Moist chocolate cake with a heart of creamy rich chocolate. Add vanilla ice cream for $3', price: '$9.99', note: 'contains gluten' },
			{ name: 'Tiramisu', description: 'Traditional tiramisu made with espresso-soaked ladyfingers and mascarpone cream, dusted with cocoa powder', price: '$9.99', note: 'contains gluten' },
			{ name: 'Traditional NY Cheesecake', description: 'Creamy New York cheesecake on a graham cracker crust', price: '$8.49', note: 'contains gluten' },
			{ name: 'Bear Gelato', description: 'Chocolate gelato', price: '$6.99', isNew: true },
			{ name: 'Macarons (3 pcs)', description: 'Chocolate, lemon, raspberry, sea salt caramel, vanilla, or pistachio', price: '$7.49' },
			{ name: 'Mini Pastries (5 pcs)', description: 'Mini croissants and pains au chocolat', price: '$9.99', note: 'contains gluten' },
		],
	},
]

export const KIDS_MENU: MenuSection[] = [
	{
		id: 'combo',
		title: 'My Little Combo & Play',
		intro: 'Includes a little entrée, a little drink and a little dessert with a 2-hour play pass',
		items: [{ name: 'My Little Combo & Play', description: 'Little entrée + little drink + little dessert + 2-hour play pass', price: '$23.29' }],
	},
	{
		id: 'kids-entrees',
		title: 'My Little Entrées',
		intro: 'ONLY for children 10 and younger. Not for adults, pre-teens or teenagers.',
		items: [
			{ name: 'My Little Nuggets', price: '$6.99', note: 'contains gluten' },
			{ name: 'My Little Mozzarella Sticks', price: '$6.99', note: 'contains gluten' },
			{ name: 'My Little Penne Pasta', description: 'Choice of sauce: marinara, pesto, or butter', price: '$7.59', note: 'contains gluten' },
			{ name: 'My Little Mac & Cheese Penne', description: 'Penne pasta with cheddar and Parmesan', price: '$7.89', note: 'contains gluten' },
			{ name: 'My Little Spaghetti & Meatball', description: 'Housemade meatball and marinara sauce', price: '$8.69', note: 'contains gluten' },
			{ name: 'My Little Pizza', description: 'Cheese or pepperoni', price: '$7.59', note: 'contains gluten' },
			{ name: 'My Little Sandwich', description: 'Grilled cheese with ham', price: '$7.59', note: 'contains gluten' },
			{ name: 'My Mini Burger', description: 'Beef patty, cheese, and French fries', price: '$8.39', note: 'contains gluten' },
			{ name: 'My Little Steak Frites', description: 'Beef patty and French fries', price: '$7.99', note: 'fries may contain gluten' },
			{ name: 'My Little Chicken Frites', description: 'Grilled chicken breast (sliced) with French fries', price: '$7.99', note: 'fries may contain gluten', isNew: true },
		],
	},
	{
		id: 'kids-desserts',
		title: 'My Little Desserts',
		items: [
			{ name: 'Vanilla Ice Cream', price: '$3.00' },
			{ name: 'Apple Slices', price: '$3.00' },
			{ name: 'Little Macaron', description: 'Chocolate, lemon, raspberry, sea salt caramel, vanilla, or pistachio', price: '$3.00', note: 'contains almond' },
		],
	},
	{
		id: 'kids-drinks',
		title: 'My Little Drinks',
		items: [
			{ name: 'Whole Milk', price: '$2.99' },
			{ name: 'Juice', description: 'Apple or orange', price: '$2.99' },
			{ name: 'Lemonade', price: '$2.99' },
			{ name: 'Water Bottle', price: '$2.99' },
		],
	},
]

export const DRINK_MENU: MenuSection[] = [
	{
		id: 'cold-drinks',
		title: 'Cold Drinks',
		items: [
			{ name: 'Coke, Diet Coke, Sprite', price: '$3.59' },
			{ name: 'San Pellegrino Aranciata Rossa', description: 'Sparkling drink with blood orange juice', price: '$3.59' },
			{ name: 'Juice', description: 'Orange or apple', price: '$3.59' },
			{ name: 'Lemonade', price: '$3.50' },
			{ name: 'Lemon Iced Tea', price: '$3.50' },
			{ name: 'Bottled Water', price: '$2.99' },
			{ name: 'San Pellegrino Sparkling Water (Bottle)', price: '$3.59' },
		],
	},
	{
		id: 'coffee',
		title: 'Coffee',
		intro: 'Oat milk substitute +$0.50 / add vanilla or caramel syrup +$0.50',
		items: [
			{ name: 'Coffee, Hot or Iced', description: 'Freshly brewed black coffee', price: '$3.15' },
			{ name: 'Café au Lait (Latte), Hot or Iced', description: 'Brewed coffee with milk', price: '$3.65' },
			{ name: 'Long Black Coffee, Hot or Iced', description: 'Brewed coffee with added hot water', price: '$3.65' },
		],
	},
	{
		id: 'tea',
		title: 'Tea (Mighty Leaf)',
		intro: 'Over ice for +$1',
		items: [
			{ name: 'Organic Jasmine Tea', price: '$3.15' },
			{ name: 'Organic Earl Grey Tea', price: '$3.15' },
			{ name: 'Marrakesh Mint Green Tea', price: '$3.15' },
		],
	},
	{
		id: 'beer',
		title: 'Beers & Hard Seltzers',
		items: [
			{ name: 'White Claw', description: 'Raspberry, black cherry, lime or grapefruit', price: '$5.49' },
			{ name: 'Stella Artois', price: '$6.49' },
			{ name: 'Modelo', price: '$6.49' },
			{ name: 'Blue Moon', price: '$6.49' },
			{ name: 'IPA Lagunitas', price: '$7.49' },
		],
	},
	{
		id: 'sparkling',
		title: 'Sparkling Wine & Cocktails',
		items: [
			{ name: 'Blanc de Blancs Elysée', description: 'Produced in France. Same method and grapes as champagne. Elegant and refreshing with a gentle harmonious taste and fresh aroma.', price: 'glass $12 / bottle $42' },
			{ name: 'Mimosa', description: 'Sparkling wine with fresh orange juice', price: 'glass $12 / carafe $36' },
			{ name: 'Peach Bellini', description: 'Sparkling wine with peach syrup', price: 'glass $12' },
			{ name: 'Kir Royal', description: 'Classic French cocktail made with sparkling wine and crème de cassis (blackcurrant liqueur)', price: 'glass $12' },
		],
	},
	{
		id: 'red-wine',
		title: 'Red Wine',
		items: [
			{ name: 'Bordeaux Supérieur Château Larroque', description: 'Dark ruby color. Red fruits, almond, hazelnut, with a faint vanilla aroma.', price: 'glass $11 / bottle $42' },
			{ name: 'Pinot Noir Domaine Pillot', description: 'Fine and light with dark red fruit notes and a gentle acidity.', price: 'glass $14 / bottle $52' },
			{ name: 'Saint-Émilion Grand Cru Château Moulin de la Grangère', description: 'Delicately balanced, whole in fruits with velvety tannins and everlasting elegance.', price: 'glass $18 / bottle $65' },
		],
	},
	{
		id: 'white-wine',
		title: 'White Wine',
		items: [
			{ name: 'Bordeaux Blanc Château la Rose du Pin', description: 'A classic sauvignon blend from Bordeaux with boxwood and lime notes.', price: 'glass $9 / bottle $35' },
			{ name: 'Sauvignon Blanc Domaine de la Villaudière', description: 'A white wine from Val de Loire. Fresh cut grass, grapefruit and a lot of freshness. Very dry.', price: 'glass $11 / bottle $40' },
			{ name: 'Sancerre Domaine Auchère', description: 'Fruity aromas of citrus and exotic fruits (grapefruit, lychee and white peach). Persistent, fine and elegant finish.', price: 'glass $17 / bottle $60' },
		],
	},
	{
		id: 'rose-wine',
		title: 'Rosé Wine',
		items: [
			{ name: 'Marius Rosé', description: 'Bright, rose petal. Floral with notes of white-fleshed fruit. Nice acid balance.', price: 'glass $8 / bottle $28' },
			{ name: 'Côtes de Provence Domaine de Beaupré', description: 'Great organic Provence rosé, smooth and silky with beautiful red berry aromas.', price: 'glass $12 / bottle $42' },
		],
	},
]

/** Homepage food showcase — dishes with verified photos in public/images. */
export const FEATURED_DISHES = [
	{
		name: 'Handcrafted Toasts',
		description: 'Sourdough, six ways: smoked salmon, figs, prosciutto, artichoke & more',
		price: 'from $18.99',
		image: '/images/toast.webp',
		imagePosition: 'object-center',
	},
	{
		name: 'Grilled Chicken Pesto Sandwich',
		description: 'Housemade basil pesto, shaved Parmesan, arugula, served with fries or salad',
		price: '$18.99',
		image: '/images/pesto-sandwich.webp',
		imagePosition: 'object-center',
	},
	{
		name: 'Cheeseburger',
		description: 'Beef patty, bacon, cheddar, arugula, shallot aioli on a brioche bun, served with fries',
		price: '$19.99',
		image: '/images/party-photo-3.webp',
		imagePosition: 'object-center',
	},
	{
		name: 'Coffee & French Pastries',
		description: 'Proper lattes, macarons, mini croissants and house desserts. The Parisian finish',
		price: 'from $3.15',
		image: '/images/gallery-3.webp',
		imagePosition: 'object-center',
	},
] as const
