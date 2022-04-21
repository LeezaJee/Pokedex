var pokemonRepository = (function () {
	var pokemonList = [];
	let modalContainer = document.querySelector('#modal-container');
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

	// function to add new pokemons to pokemonList
	function add(pokemon) {
		if (
			typeof pokemon === "object" &&
			"name" in pokemon,
			"detailsUrl" in pokemon
		) {
			pokemonList.push(pokemon);
		} else {
			console.log("This is not a valid Pokemon!");
		}
	}

	function getAll() {
		return pokemonList;
	}




	function addListItem(pokemon) {

	//function to fetch data from API and add it to the repository
	function loadList() {
		//fetch the data from the URL in form of a promise 
		return fetch(apiUrl).then(function (response) {
			return response.json(); //convert response into JSON
		}).then(function (json) {
			//loop over the "results" (key) of the JSON (pokemon list of the API)
			json.results.forEach(function (item) {
				let pokemon = {
					name: item.name,
					detailsUrl: item.url
				};
				add(pokemon);
			});
		}).catch(function (e) {
			console.error(e);
		})
	}


	function loadDetails(item) {
		let url = item.detailsUrl;
		return fetch(url).then(function (response) {
			return response.json();
		}).then(function (details) {
			// Now we add the details to the item
			item.imageUrl = details.sprites.other.dream_world.front_default;
			item.height = details.height;
			item.types = details.types;
		}).catch(function (e) {
			console.error(e);
		});
	}



	function showModal(pokemon) {
	}




	//show pokemon data in in the console 
	function showDetails(pokemon) {
		loadDetails(pokemon).then(function () {
			showModal(pokemon);
		});

	}


	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		loadList: loadList,
		loadDetails: loadDetails,
		showDetails: showDetails,
		showModal: showModal,
	};
})();

//load the data from the Pokemon API
pokemonRepository.loadList().then(function () {
	//this forEach function will run loop over function above
	pokemonRepository.getAll().forEach(function (pokemon) {
		//this function will run loop over addListItem function 
		pokemonRepository.addListItem(pokemon);
	});
});