Pokedex.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    // this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "pokemonIndex",
    "pokemon/:id" : "pokemonDetail",
    "pokemon/:pokemonId/toys/:toyId": "toyDetail",
    // "": "pokemonForm"

  },

  pokemonIndex: function (callback) {
    // set up view

    // this.$rootEl.html(view.render().$el);
    var view = new Pokedex.Views.PokemonIndex();
    this._pokemonIndex = view;
    view.refreshPokemon(callback);
    $("#pokedex .pokemon-list").html(view.$el);

    this.pokemonForm();
  },

  pokemonDetail: function (id, callback) {
    // debugger
    if (typeof this._pokemonIndex === "undefined") {
      this.pokemonIndex(function() {
        this.pokemonDetail(id, callback);
      }.bind(this));
      return;
    };



    var selectedpokemon = this._pokemonIndex.collection.get(id);
    var view = new Pokedex.Views.PokemonDetail({ model: selectedpokemon });
    this._pokemonDetail = view;
    $("#pokedex .pokemon-detail").html(view.$el);
    // view.render();
    // if (callback)
    selectedpokemon.fetch({success: callback});
    // Backbone.history.navigate("pokemon/" + selectedpokemon.get("id"), { trigger: true });

    // if (callback) {
    //   callback();
    // }
  },

  toyDetail: function (pokemonId, toyId) {
    if (typeof this._pokemonDetail === "undefined") {
      this.pokemonDetail(pokemonId, function() {this.toyDetail(pokemonId, toyId);}.bind(this));
      return;
    }
    // debugger;
    var toy = this._pokemonDetail.model.toys().get(toyId);
    var view = new Pokedex.Views.ToyDetail({ model: toy });
    $("#pokedex .toy-detail").html(view.$el);
    view.render();
  },

  pokemonForm: function () {
    var view = new Pokedex.Views.PokemonForm({
      model: new Pokedex.Models.Pokemon(),
      collection: this._pokemonIndex.collection,
    });

    $('#pokedex .pokemon-form').html(view.$el);
    view.render();


  }

  // postShow: function (id) {
  //   // set up view
  //
  //   this.$rootEl.html(view.render().$el);
  // }

});
