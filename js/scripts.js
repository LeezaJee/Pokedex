var pokemonRepository = (function () {

	var pokemonList = [];
	let modalContainer = document.querySelector('#pokemonModal');
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

	// function to add new pokemons to pokemonList
	function add(pokemon) {
		if (typeof pokemon === "object") {
			return pokemonList.push(pokemon);
		}
	}

	 // Access array of Pokemon
	 function getAll() {
		return pokemonList;
	  }


	  // Function to capitalize first letter of pokemon name
	  function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }



	//function to fetch data from API and add it to the repository
	function loadList() {
		//fetch the data from the URL in form of a promise 
		return fetch(apiUrl).then(function (response) {
			return response.json(); //convert response into JSON
		}).then(function (json) {
			//loop over the "results" (key) of the JSON (pokemon list of the API)
			json.results.forEach(function (item) {
				let pokemon = {
					name: capitalizeFirstLetter(item.name),
					detailsUrl: item.url
				};
				add(pokemon);
			});
		}).catch(function (e) {
			console.log(e);
		});
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
			return item;
		}).catch(function (e) {
			console.log(e);
		});
	}


// Create modal with details
	function showModal(pokemon) {
		let modalBody = $(".modal-body");
		let modalTitle = $(".modal-title");

		//clear existing content every time you open a new modal
		modalTitle.empty();
		modalBody.empty();

		//creating element for name in modal content 
		let nameElement = $("<h1>" + pokemon.name + "</h1>");
		//creating img in modal content 
		let imageElement = $('<img class="modal-img" style="width:50%">');
		imageElement.attr("src", pokemon.imageUrl);
		$(imageElement).addClass("image");

		//creating element for height in modal content 
		let heightElement = $("<p>" + "height : " + pokemon.height + "</p>");
		

		//creating element for types in modal content 
		let typesElement = $("<p>" + "types : " + pokemon.types[0].type.name + "</p>");
		
		
		
		modalTitle.append(nameElement);
		modalBody.append(imageElement);
		modalBody.append(heightElement);
		modalBody.append(typesElement);
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
  function addListItem(pokemon) {
    let ul = document.querySelector(".list-group");
    //Create listItem divs, and button
    let li = document.createElement("li");
    let button = document.createElement("button");

    //set bootstrap classes to divs
    $(li).addClass("list-group-item col-xl-2 col-lg-3 col-sm-4");

    // Classes and attributes for button
    $(button).text(pokemon.name);
    $(button).addClass("btn btn-block pokemon-btn");
    $(button).attr("type", "button");
    $(button).attr("data-toggle", "modal");
    $(button).attr("data-target", "#pokemonModal");

    // Append items to DOM elements
    $(li).append(button);
    $(ul).append(li);

    // Show details of clicked Pokemon
    $(button).on("click", () => {
      showDetails(pokemon);
    });
  }
})();

//load the data from the Pokemon API
pokemonRepository.loadList().then(function () {
	//this forEach function will run loop over function above
	pokemonRepository.getAll().forEach(function (pokemon) {
		//this function will run loop over addListItem function 
		pokemonRepository.addListItem(pokemon);
	});
});