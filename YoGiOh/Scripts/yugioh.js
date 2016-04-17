(function (window, angular, $) {    
    "use strict";
    function cardController($scope, $http, $timeout) {               
        
        $scope.dataLoaded = false;
        $scope.cards = [{ name: 'Burial from a Different Dimension' },
            { name: 'Charge of the Light Brigade' },
            { name: 'Infernoid Antra' },
            { name: 'Infernoid Attondel' },
            { name: 'Infernoid Decatron' },
            { name: 'Infernoid Devyaty' },
            { name: 'Infernoid Harmadik' },
            { name: 'Infernoid Onuncu' },
            { name: 'Infernoid Patrulea' },
            { name: 'Infernoid Pirmais' },
            { name: 'Infernoid Seitsemas' },
            { name: 'Lyla, Lightsworn Sorceress' },
            { name: 'Monster Gate' },
            { name: 'One for One' },
            { name: 'Raiden, Hand of the Lightsworn' },
            { name: 'Reasoning' },
            { name: 'Time­Space Trap Hole' },
            { name: 'Torrential Tribute' },
            { name: 'Upstart Goblin' },
            { name: 'Void Seer' },
        ];
        
        $scope.selectCard = function ($index) {
            $scope.selectedCard = $scope.cards[$index];
            var encodedCardName = encodeURI($scope.selectedCard.name);
            
            $http.get('https://jsonp.afeld.me/?url=http://yugiohprices.com/api/get_card_prices/' + encodedCardName).then(function (response) {
                $timeout(function () {                    
                    //console.log(response);
                    $scope.selectedCard.cardPrices = response.data.data;
                    //$('#pricesTab a:first').tab('show');
                    //$('#pricesTab a:last').tab('show');
                }, 100);
            }, function (response) {
                console.log(response);
                //alert(response.responseText);
            });
        }
        
        $scope.loadCardInfo = function (index) {            
            
                var encodedCardName = encodeURI($scope.cards[index].name);

                $.get('https://jsonp.afeld.me/?url=http://yugiohprices.com/api/card_data/' + encodedCardName).success(function (response) {
                    $timeout(function () {
                        debugger;
                        if (response.status != 'fail') {
                            $scope.cards[index] = response.data;
                            $scope.cards[index].image = 'http://yugiohprices.com/api/card_image/' + encodedCardName;
                            $scope.cards[index].loaded = true;
                        }
                        else {
                            $scope.cards[index].failed = true;
                            $scope.cards[index].image = null;
                        }

                        if (!$scope.dataLoaded) {
                            $scope.selectedCard = $scope.cards[index];                            
                            $scope.selectCard(index);
                            $scope.dataLoaded = true;
                        }
                        
                        //we do not use $.each, becasue a.p.i is too slow and looses data!!!!!
                        if (index < $scope.cards.length) $scope.loadCardInfo(index + 1);

                    }, 10);
                });
            
            
        }
       
        window.onresize = function () {            
            var pageHeight = $(window).height();
            var navHeight = pageHeight - 100;
            $('.size').css({ 'max-height': navHeight + 'px' });            
        }

        $scope.loadCardInfo(0);
        window.onresize();
    };

    var yugiohApp = new angular.module('yugiohApp', []);
    yugiohApp.controller('cardsCtrl', ['$scope', '$http', '$timeout', cardController]);

})(window, angular, $)