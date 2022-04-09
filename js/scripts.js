const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}

var pokemonRepository = (function () {

	let repository = [
		{
			name: "Charmander",
			height: 0.6,
			type: ["fire"]
		},
		{
			name: "Venusaur",
			height: 2,
			type: ["grass", "poison"]
		},
		{
			name: "Wartortle",
			height: 1,
			type: ["water"]
		},
		{
			name: "Nidoking",
			height: 1.4,
			type: ["ground", "poison"]
		},
	];

	function add(pokemon) {
		if (
			typeof pokemon === "object" &&
			"name" in pokemon &&
			"height" in pokemon &&
			"types" in pokemon
		) {
			repository.push(pokemon);
		} else {
			console.log("Pokemon is not correct!");
		}
	}

	function getAll() {
		return repository;
	}


function getAll() {
	return pokemonList;
}
	function addListItem(pokemon) {

		//variable to grab the <ul> tag from the HTML file 
		let pokemonList = document.querySelector(".pokemon-list");

		//creating <li> list elements for the <ul> 
		let listPokemon = document.createElement("li");

		//creating a <button>
		let button = document.createElement("button");

		//inserting text to the just created <button> element
		button.innerText = pokemon.name;

		//linking a class from CSS to the <button> element
		button.classList.add("button-class");

		//adding the <button> to the <li> list elements 
		listPokemon.appendChild(button);

		//adding <li> list elements to the <ul> 
		pokemonList.appendChild(listPokemon);

		//EventListener to show Pokemon details when button is clicked
		button.addEventListener('click', function (event) {
			showDetails(pokemon)
		});
	}


	return {
		getAll: getAll,
        add: add

    };

})();


document.write("<ul class= 'pokemon-container'>");

pokemonRepository.getAll().forEach(function(item) {

	if (item.height > 1.4) {
		document.write(
		"<li class='pokemon-item'>" + 
		"Name: " + item.name +
		" (Height: " + item.height +
		" - Type: " + item.type + ") Wow, that's big!" +
		"</li>"
		);
	} else {
		document.write(
		"<li class='pokemon-item'>" +
		"Name: " + item.name +
		" (Height: " + item.height +
		" - Type: " + item.type + ")" +
		"</li>"
		);
	}
})

document.write("</ul>");