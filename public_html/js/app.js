var app = angular.module('planetasApp', []);

app.controller('PlanetasController', function ($scope, PlanetaService) {

    $scope.planeta = {};

    $scope.param;
    $scope.param2;

    listar();

    function  listar() {

        PlanetaService.listar().then(function (resposta) {
            $scope.planetas = resposta.data;
        });
    }

    $scope.salvar = function (planeta) {
        PlanetaService.salvar(planeta).then(listar);
        $scope.planeta = {};
    };

    $scope.editar = function (planeta) {
        $scope.planeta = angular.copy(planeta);
    };

    $scope.excluir = function (planeta) {
        PlanetaService.excluir(planeta).then(listar);
    };
    $scope.cancelar = function () {
        $scope.planeta = {};
    };
    
    $scope.buscar = function () {
        PlanetaService.buscar($scope.param2).then(function (resposta) {
            $scope.planetas = resposta.data;
        });
    };

    $scope.consultar = function () {
        PlanetaService.consultar($scope.param).then(function (resposta) {
            $scope.planetas = resposta.data;
        });
    };

});

app.service('PlanetaService', function ($http) {

    var api = 'http://localhost:8080/api/webresources/planetas';

    this.listar = function () {
        return $http.get(api);
    };

    this.salvar = function (planeta) {
        if (planeta.id) {
            return $http.put(api + '/' + planeta.id, planeta);
        } else {
            return $http.post(api, planeta);
        }

    };
    this.excluir = function (planeta) {
        return $http.delete(api + '/' + planeta.id);
    };
    
    this.consultar = function (param) {
        if (param !== null) {
            return $http.get(api + '/' + param);
        }
    };
    
    this.buscar = function (param2) {
        if (param2 !== null) {
            return $http.get(api + '/' + param2);
        }
    };


});


