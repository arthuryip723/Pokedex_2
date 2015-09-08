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
  },

  selectPokemonToList: function (e) {
    // alert("here");
    var $li = $(e.currentTarget);

    var selectedpokemon = this.pokes.get($li.data("id"));
    // console.log(selectedpokemon.get('name'));
    // debugger
    // var view = new Pokedex.Views.PokemonDetail({ model: selectedpokemon, el: "#pokedex .pokemon-detail"});
    var view = new Pokedex.Views.PokemonDetail({ model: selectedpokemon });
    // debugger
    // debugger

    $("#pokedex .pokemon-detail").html(view.$el);
    // view.render();
    selectedpokemon.fetch();
    // debugger
    // console.log($("#pokedex .pokemon-detail").first() === view.$el)
    // $("#pokedex .pokemon-detail").html(view.render().$el);

  },

  events: {
    "click li": "selectPokemonToList"
  },


})
