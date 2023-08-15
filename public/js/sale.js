'use strict';

(function() {
  var $cartToggle = document.getElementById('cart-toggle');
  var $checkoutButton = document.getElementsByClassName('cart-button')[0];
  var $cart = document.getElementById('cart');
  
  window.App = {};
  
  var GlobalState = function(initialGames) {
    var availableGames = initialGames;
    var filteredGames = availableGames;
    var searchResults;
    var cartInfo = {
      itemCount: 0,
      subtotal: 0,
      items: []
    };
    var filters = {
      is_expansion: false,
      sale_price: false
    };
    
    return {
      findGameById: function(gameId, sourceArray) {
        var found = sourceArray.filter(function(game) {
          if (game.id === parseInt(gameId)) {
            return game;
          }
        });
        
        return (found) ? found[0] : found;
      },
      
      getGameListing: function() {
        return searchResults || filteredGames || availableGames;
      },
      
      getCartInfo: function() {
        return cartInfo;
      },
      
      addGameToCart: function(gameId) {
        var gameToAdd = this.findGameById(gameId, availableGames);
        
        // Update Cart Info
        cartInfo.itemCount++;
        cartInfo.subtotal += (gameToAdd.sale_price) ? gameToAdd.sale_price : gameToAdd.base_price;
        cartInfo.items.push(gameToAdd);
        
        // Notify the everyone else that it was added
        this.dispatch('cart-updated');
      },
      
      removeGameFromCart: function(index) {
        var temp = cartInfo.items.slice();
        
        var gameToRemove = temp.splice(index, 1);
        
        cartInfo.itemCount--;
        cartInfo.subtotal -= (gameToRemove[0].sale_price) ? gameToRemove[0].sale_price : gameToRemove[0].base_price;
        cartInfo.items = temp;
        
        this.dispatch('cart-updated');
      },
      
      dispatch: function(eventName, details) {
        var event = new CustomEvent(eventName, { detail: details });
        window.dispatchEvent(event);
      },
      
      updateFilters: function(property, value) {
        var temp = availableGames.slice();
        filters[property] = value;
        
        // Loop over all the different kinds of filters in filter object
        for (var filter in filters) {
          
          // For each type of filter we need to loop over and see if the filter applies
          temp = temp.filter(function(game) {
            // If the filter applies... then check if the game matches the condition
            if (filters[filter]) {
              
              // Check if the game matches the condition
              if (game[filter]) {
                return game;
              }
            } else {
              // ...otherwise just return since the filter doesn't apply
              return game;
            }
          });
          
          // Update filtered games at the end so when other parts of the
          // application ask for it, it's up-to-date
          filteredGames = temp;
        }
        
        // Let the application know GlobalState is done filtering
        this.dispatch('updated-filters');
      },
      
      handleSearch: function(keyword) {
        var temp = filteredGames.slice().filter(function(game) {
          if (game.full_name.toLowerCase().search(keyword.toLowerCase()) !== -1) {
            return game;
          }
        });
        
        if (keyword.length && temp.length) {
          searchResults = temp;
        } else {
          searchResults = undefined;
        }
        
        this.dispatch('updated-filters');
      }
    };
  };

  // addEventListener(event: String, Event Handler: function, Options: obj || boolean)
  $cartToggle.addEventListener("click", function toggleHanlder() {
    $cart.classList.toggle("is-open");
  });
  
  $checkoutButton.addEventListener('click', function () {
    var checkoutModal = document.getElementById('checkout-modal');
    var modalBackground = document.getElementById('modal-container');
    
    checkoutModal.classList.add('is-showing');
    modalBackground.classList.add('is-showing');
  });

  // Filters
  var FilterBar = {
    $searchInput: document.getElementById('search-input'),
    $sortInput: document.getElementById('sort-input'),
    $expansionSwitch: document.getElementById('expansion-switch'),
    $saleSwitch: document.getElementById('sale-switch'),
    
    init: function() {
      this.bindInputHandlers();
    },
    
    bindInputHandlers: function() {
      this.$searchInput.addEventListener('input', function() {
        App.GlobalState.handleSearch(this.value);
      });
      
      this.$sortInput.addEventListener('change', function() {
        App.GlobalState.handleSearch(this.value);
      });
      
      this.$expansionSwitch.addEventListener('change', function() {
        App.GlobalState.updateFilters('is_expansion', this.checked);
      });
      
      this.$saleSwitch.addEventListener('change', function() {
        App.GlobalState.updateFilters('sale_price', this.checked);
      });
    }
  };
  
  FilterBar.init();

  // Games Listing Singleton
  var GameListing = {
    $gameList: document.getElementById('game-list'),

    init: function() {
      this.showGames();
      this.bindEvents();
    },

    bindEvents: function() {
      var $addGameButtons = document.querySelectorAll('[data-game-id]');
      var self = this;
      
      // Event Delegation Example
      this.$gameList.addEventListener('click', function(event) {
        var $target = event.target;
        var $parent = event.target.parentNode;
        
        if ($target.classList.contains('success')) {
          App.GlobalState.addGameToCart($target.dataset.gameId);
        }
        
        if ($parent.classList.contains('success')) {
          App.GlobalState.addGameToCart($parent.dataset.gameId);
        }
      });
      
      window.addEventListener('updated-filters', function() {
        self.showGames();
      });

    },

    getGames: function() {
      // Gets the games from a URL
      getJSON("https://codepen.io/trevthewebdev/pen/MmVBjq.js", this.prepGameData.bind(this));
    },

    prepGameData: function(results) {
      var gamesArray = results.games;
      var newGames = gamesArray.map(function(game) {
        if (game.is_expansion) {
          game.full_name = game.name + ": " + game.expansion_name;
        } else {
          game.full_name = game.name;
        }

        return game;
      });

      // We know we have the games and they're ready so init
      App.GlobalState = GlobalState(newGames);
      this.init();
    },

    showGames: function() {
      var index = 0;
      var fragment = document.createDocumentFragment();
      var games = App.GlobalState.getGameListing();

      // Loop over the games
      for (index; index < games.length; index++) {
        var $li = document.createElement('li');
        var game = games[index];

        $li.classList.add('small-6', 'medium-3', 'columns');
        $li.innerHTML = '<div data-game-card="' + game.id + '" class="card">' +
          '<header class="card-divider">' + game.full_name + '</header>' +
          '<figure>' +
            '<img src="' + game.media.images[0] + '" />' +
            '<div class="card-actions">' +
              '<button data-quick-view="' + game.id + '" class="button small">Quick View</button> ' +
              '<button data-game-id="' + game.id + '" class="button small success"><i class="fa fa-plus"></i></button>' +
            '</div>' +
          '</figure>' +
          '<div class="card-section">' +
            '<ul class="no-bullet">' +
              '<li>' +
                '<i class="fa fa-users"></i>' + this.formatGamePlayerCount(game) + ' players' +
              '</li>' +
              '<li>' +
                '<i class="fa fa-money"></i>' + this.formatGamePrice(game) +
              '</li>' +
            '</ul>' +
          '</div>' +
        '</div>';

        fragment.append($li);
      }

      this.$gameList.innerHTML = '';
      this.$gameList.append(fragment);
    },

    formatGamePlayerCount: function(game) {
      if (game.player_min === game.player_max) {
          return game.player_min;
      } else {
          return game.player_min + '-' + game.player_max;
      }
    },

    formatGamePrice: function(game) {
      var basePrice = game.base_price;
      var salePrice = game.sale_price;

      if (salePrice) {
        return '$' + salePrice + ' <s class="list-price-strike">$' + basePrice + '</s>';
      } else {
        return '$' + basePrice;
      }
    },

    addGameToCart: function() {}
  };

  GameListing.getGames();

  // Cart
  var Cart = {
    $cart: document.getElementById('cart'),
    $cartGameList: document.getElementById('cart-game-list'),
    
    init: function() {
      this.subscribe();
    },
    
    subscribe() {
      var self = this;
      
      window.addEventListener('cart-updated', function() {
        self.openCart();
        self.updateCartHeader();
        self.showItemsInCart();
      });
      
      document.addEventListener('keydown', function(event) {
        // If escape key was pressed...
        switch(event.which) {
          case 27:
            self.closeCart();
          break;
        }
      });
      
      // Event Delegation Example
      this.$cartGameList.addEventListener('click', function(event) {
        var $target = event.target;
        
        if ($target.classList.contains('remove-item-button')) {
          App.GlobalState.removeGameFromCart($target.dataset.removeGameIndex);
        }
      });
    },
    
    showItemsInCart: function() {
      var games = App.GlobalState.getCartInfo().items;
      var fragment = document.createDocumentFragment();
      var i = 0;
      
      for (i; i < games.length; i++) {
        var $li = document.createElement('li');
        var game = games[i];
        var cost = (game.sale_price) ? game.sale_price : game.base_price;
        
        $li.classList.add('cart-item');
        $li.innerHTML = '<div class="media-object">' +
            '<div class="media-object-section">' +
              '<div class="thumbnail">' + 
                '<img src="' + game.media.images[0] + '">' +
              '</div>' +
            '</div>' +
            '<div class="media-object-section">' +
              '<h6 class="subheader">' + game.name + '</h6>' +
              '<p>$' + cost.toFixed(2) + ' ea</p>' +
            '</div>' +
          '</div>' +
          '<a data-remove-game-index="' + i + '" class="remove-item-button">x</a>';
        
        fragment.append($li);
      }
      
      this.$cartGameList.innerHTML = '';
      this.$cartGameList.append(fragment);
    },
    
    updateCartHeader: function() {
      var cartInfo = App.GlobalState.getCartInfo();
      var $cartHeader = document.getElementById('cart-header');
      
      $cartHeader.innerHTML = '<div>' + cartInfo.itemCount + ' items</div>' +
                              '<div>Subtotal: $' + cartInfo.subtotal.toFixed(2) + '</div>';
      
      $cartToggle.innerHTML = cartInfo.itemCount + ' <i class="fa fa-shopping-cart"></i>';
    },
    
    openCart: function() {
      if (!$cart.classList.contains('is-open')) {
        $cart.classList.add('is-open');
      }
    },
    
    closeCart: function() {
      if ($cart.classList.contains('is-open')) {
        $cart.classList.remove('is-open');
      }
    }
  };
  
  Cart.init();
  
})();
