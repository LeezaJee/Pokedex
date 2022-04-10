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

	let repository = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

	function add(pokemon) {
		if (
			typeof pokemon === "object" &&
			"name" in pokemon //&&
			//	"detailsUrl" in pokemon
		) {
			repository.push(pokemon);
		} else {
			console.log("Pokemon is not correct!");
		}
	}

	function getAll() {
		return repository;
	}


	function showDetails(pokemon) {
		console.log(pokemon);
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
		add: add,
		getAll: getAll,
		addListItem: addListItem

	};

})();

console.log(pokemonRepository.getAll());

//this forEach function will run loop over function below
pokemonRepository.getAll().forEach(function (pokemon) {
	//this function will run loop over addListItem function above
	pokemonRepository.addListItem(pokemon);
	//this forEach function will run loop over function below
	pokemonRepository.getAll().forEach(function (pokemon) {
		//this function will run loop over addListItem function above
		pokemonRepository.addListItem(pokemon);
	});
});