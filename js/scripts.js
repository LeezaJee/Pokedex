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

let pokemonList = [
	{ name: "Charmander", height: 0.6, type: ["fire"] },
	{ name: "Venusaur", height: 2, type: ["grass", "poison"] },
	{ name: "Wartortle", height: 1, type: ["water"] },
	{ name: "Nidoking", height: 1.4, type: ["ground", "poison"] }
];

document.write("<ul class: 'pokemon-container'>");
for (let i = 0; i < pokemonList.length; i++) {
	if (pokemonList[i].height < 3 && pokemonList[i].height > 1.5) {
		document.write("<li class= 'pokemon-item'>");
		document.write("Name: " + pokemonList[i].name +
			" (Height: " + pokemonList[i].height +
			" - Type: " + pokemonList[i].type + ") - Wow, that's big!");
		document.write("</li>");
	}
	else {
		document.write("<li class= 'pokemon-item'>");
		document.write("Name: " + pokemonList[i].name +
			" (Height: " + pokemonList[i].height +
			" - Type: " + pokemonList[i].type + ")");
		document.write("</li>");
	}
}
document.write("</ul>");

