describe('Card Controller', function () {
    beforeEach(angular.mock.module('yugiohApp'));

    var $controller;

    beforeEach(angular.mock.inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    it('At least 10 Cards was loadded.', function () {
        var $scope = {};
        var controller = $controller('cardsCtrl', { $scope: $scope });
        $scope.loadCardInfo(0);
        expect($scope.cards.length).toBeGreaterThan(10);
    });

});