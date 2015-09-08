Pokedex.Views.PokemonIndex = Backbone.View.extend({

  initialize: function () {
    this.collection = new Pokedex.Collections.Pokemon();
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addPokemonToList);
  },

  render: function () {
    this.$el.empty();
    this.collection.each(function (pokemon) {
      this.addPokemonToList(pokemon);
    }.bind(this));
  },

  addPokemonToList: function (pokemon) {
    var content = JST['pokemonListItem']({ pokemon: pokemon });

    this.$el.append(content);
  },

  refreshPokemon: function (callback) {
    // debugger
    this.collection.fetch({success: callback});
  },

  selectPokemonFromList: function (e) {
    // alert("here");
    var $li = $(e.currentTarget);

    // var selectedpokemon = this.collection.get($li.data("id"));
    // var view = new Pokedex.Views.PokemonDetail({ model: selectedpokemon });
    //
    // $("#pokedex .pokemon-detail").html(view.$el);
    // // view.render();
    // selectedpokemon.fetch();
    Backbone.history.navigate("pokemon/" + $li.data("id"), { trigger: true });
  },

  events: {
    "click li": "selectPokemonFromList"
  },


})
