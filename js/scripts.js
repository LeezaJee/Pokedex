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

let pokemonRepository = (function() {

let pokemonList = [
	{ name: "Charmander", height: 0.6, type: ["fire"] },
	{ name: "Venusaur", height: 2, type: ["grass", "poison"] },
	{ name: "Wartortle", height: 1, type: ["water"] },
	{ name: "Nidoking", height: 1.4, type: ["ground", "poison"] }
];

function getAll() {
	return pokemonList;
}

    function add(pokemon) {
       pokemonList.push(pokemon);
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