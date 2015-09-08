Pokedex.Views.PokemonIndex = Backbone.View.extend({

  initialize: function () {
    this.pokes = new Pokedex.Collections.Pokemon();
    this.listenTo(this.pokes, "sync", this.render);
    this.listenTo(this.pokes, "add", this.addPokemonToList);
  },

  render: function () {
    this.$el.empty();
    this.pokes.each(function (pokemon) {
      this.addPokemonToList(pokemon);
    }.bind(this));
  },

  addPokemonToList: function (pokemon) {
    var content = JST['pokemonListItem']({ pokemon: pokemon });

    this.$el.append(content);
  },

  refreshPokemon: function () {
    this.pokes.fetch();
  }

  // events: {
  //   "add": "addPokemonToList"
  // }


})
