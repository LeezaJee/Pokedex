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


	function addListItem(pokemon) {

		//variable to grab the <ul> tag from the HTML file 
		let pokemonList = document.querySelector(".pokemon-list");

		//creating <li> list elements for the <ul> 
		let listPokemon = document.createElement("li");

		//creating a <button>
		let button = document.createElement("button");
		//inserting text to the just created <button> element
		button.innerText = pokemon.name.toUpperCase();
		//linking a class from CSS to the <button> element
		button.classList.add("button-class");

		//adding the <button> to the <li> list elements 
		listPokemon.appendChild(button);

		//adding <li> list elements to the <ul> 
		pokemonList.appendChild(listPokemon);

		//EventListener to show Pokemon details when button is clicked
		button.addEventListener("click", function (event) {
			showDetails(pokemon)
		});
	}


	//show pokemon data in in the console 
	function showDetails(pokemon) {
		loadDetails(pokemon).then(function () {
			console.log(pokemon);
			showModal(pokemon);
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
		}).catch(function (e) {
			console.log(e);
		});
	}



	function showModal(pokemon) {
		

		//clear all existing modal content (previous info)
		modalContainer.innerHTML = '';

		//create a <div> element to sorround close <button>, <h1> and <p> elements
		let modal = document.createElement('div');
		//assign that <div> element a class
		modal.classList.add('modal');

		//add modal content
		//create a button to close the modal 
		let closeButtonElement = document.createElement('button');
		//assign a class to that button
		closeButtonElement.classList.add('modal-close');
		//add text that's written on the button 
		closeButtonElement.innerText = 'Close';
		//execute hideModal function by click on close button
		//take .is-visible class from the modal
		closeButtonElement.addEventListener('click', hideModal);

		
	

		let pokemonName = document.createElement('h1');
		pokemonName.innerText = pokemon.name;
		pokemonName.classList.add('pokemon-name');
		

		let pokemonHeight = document.createElement('p');
		pokemonHeight.innerText = "Height: " + pokemon.height;

		let pokemonImage = document.createElement('img');
		pokemonImage.src = pokemon.imageUrl;


		let pokemonTypes = document.createElement('p');
		let types = pokemon.types;

		   // Function to get all of the pokemon types
		   function getType (item){
			if (types.length == 1){
			  let type = item.type;
			  pokemonTypes.innerText = "Type: " + type.name;
			} else if (types.indexOf(item) == 0 && types.indexOf(item) + 1 < types.length){
			  let type = item.type;
			  pokemonTypes.innerText += "Types: " + type.name + ", ";
			} else if (types.indexOf(item) + 1 < types.length){
			  let type = item.type;
			  pokemonTypes.innerText += type.name + ", ";
			} else {
			  let type = item.type;
			  pokemonTypes.innerText += " " + type.name ;
			}
		  }
		types.forEach(getType)


		//add close Button to the <div> called modal
		modal.appendChild(closeButtonElement);
		modal.appendChild(pokemonImage);
		modal.appendChild(pokemonName);
		modal.appendChild(pokemonHeight);
		modal.appendChild(pokemonImage);
		modal.appendChild(pokemonTypes);
		//add modal <div> to parent modal.container <div>
		modalContainer.appendChild(modal);
		modalContainer.classList.add('is-visible');
	}


	//close modal by clicking on the close button
	function hideModal() {
		var modalContainer = document.querySelector('#modal-container');
		modalContainer.classList.remove('is-visible');
	}


	//close the modal by pressing ESC ('key' goes 'down') 
	//(e) event handling function (on event, object is created).
	//(e) is the object handler (object is made accessible)
	window.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
			hideModal();
		}
	});


	//close modal by clicking on the overlay - otherwise it will also close by clicking on the model itself
	modalContainer.addEventListener('click', (e) => {
		let target = e.target;
		if (target === modalContainer) {
			hideModal();
		}
	});


	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		loadList: loadList,
		loadDetails: loadDetails,
		showModal: showModal,
		hideModal: hideModal,
	};

})(); //IIFE wrap

console.log(pokemonRepository.getAll());

//loadList method will fetch data from API then add each Pokemon in the fetched date to pokemonList with the add function
pokemonRepository.loadList().then(function () {
	// Now the data is loaded!
	//this forEach function will run loop over function below
	pokemonRepository.getAll().forEach(function (pokemon) {
		//this function will run loop over addListItem function above
		pokemonRepository.addListItem(pokemon);
	});
});





