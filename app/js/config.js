module.exports = [
    '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/play');
        $stateProvider
        .state('play', {
            url: '/play',
            views: {
                app: {
                    templateUrl: "app/templates/app.html",
                    controller: 'Play',
                },
            }
        });
    }
]
