Pokedex.Views.PokemonDetail = Backbone.View.extend({
  template: JST['pokemonDetail'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  render: function (){
    this.$el.html(this.template({ pokemon: this.model }));

    this.model.toys().each(function (toy) {
      var content = JST['toyListItem']({ toy: toy });
      this.$el.find('.toys').append(content);
    }.bind(this));
  },

  selectToyFromList: function (e) {
    // alert("hi")
    var $li = $(e.currentTarget);
    // var selectedtoy = this.model.toys().get($li.data("toy-id"));
    // var view = new Pokedex.Views.ToyDetail({ model: selectedtoy });
    //
    // $("#pokedex .toy-detail").html(view.$el);
    // view.render();
    Backbone.history.navigate("pokemon/" + $li.data("pokemon-id") + "/toys/" + $li.data("toy-id"), { trigger: true });
  },

  events: {
    "click li": "selectToyFromList"
  }

})
