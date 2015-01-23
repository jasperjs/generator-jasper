/*
 * Bootstrap jasper application
 */

angular.module('app', [
    'ng',
    'ngRoute',
    'ngSanitize',
    'jasper',
    'jasperAreasConfig',
    'jasperRouteConfig'
]).config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode(false).hashPrefix('!');
}]);
