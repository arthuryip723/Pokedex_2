Pokedex.Views.PokemonForm = Backbone.View.extend({
  template: JST['pokemonForm'],

  render: function () {
    var content = this.template({ pokemon: this.model });
    this.$el.html(content);
  },

  savePokemon: function (e) {
    e.preventDefault();
    $form = $(e.currentTarget);
    var jsonData = $form.serializeJSON();
    this.model.save(jsonData.pokemon, { success: function (pokemon) {
      this.collection.add(pokemon);
      Backbone.history.navigate("pokemon/" + pokemon.get("id"), { trigger: true });
      this.model = new Pokedex.Models.Pokemon();
      this.render();
    }.bind(this)});
  },

  events: {
    "submit form": "savePokemon"
  }

})
