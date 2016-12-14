(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    function config($stateProvider, $urlRouterProvider, $httpProvider, $mdDateLocaleProvider) {
        var stateCliente = {
            url: '/cliente',
            abstract: true,
            template: '<ui-view/>'
        };

        var stateCadastroCliente = {
            url: '/',
            templateUrl: 'app/views/cliente/cadastro-cliente.html',
            // passa o parametro sem ser por url
            params: {
                id: null
            }
            //controller: 'cadastroClienteController',
            // carrega o resolve antes e injeta o user no controller
            //resolve: {
             //   user: {/* busca no back end o usuario*/}
            //}
        };

        var statePesquisaCliente = {
            url: '/pesquisa',
            templateUrl: 'app/views/cliente/pesquisa-cliente.html'
        };

        var stateProduto = {
            url: '/produto',
            abstract: true,
            template: '<ui-view/>'
        };

        var stateCadastroProduto = {
            url: '/',
            templateUrl: 'app/views/produto/cadastro-produto.html'
        };

        var statePesquisaProduto = {
            url: '/pesquisa',
            templateUrl: 'app/views/produto/pesquisa-produto.html'
        };

        $stateProvider
            .state('cliente', stateCliente)
            .state('cliente.cadastro', stateCadastroCliente)
            .state('cliente.pesquisa', statePesquisaCliente)
            .state('produto', stateProduto)
            .state('produto.cadastro', stateCadastroProduto)
            .state('produto.pesquisa', statePesquisaProduto);

        $urlRouterProvider.otherwise('/cliente/pesquisa');

        $httpProvider.defaults.transformResponse.push(responseTransformationFn);
        $httpProvider.defaults.transformRequest.unshift(requestTransformationFn);

        $mdDateLocaleProvider.parseDate = mdDateLocaleParseDate;
        $mdDateLocaleProvider.formatDate = mdDateLocaleFormatDate;
    }

    function mdDateLocaleParseDate(dateString) {
        var m = moment(dateString, 'DD/MM/YYYY', true);
        return m.isValid() ? m.toDate() : new Date(NaN);
    }

    function mdDateLocaleFormatDate(date) {
        var m = moment(date);
        return m.isValid() ? m.format('DD/MM/YYYY') : '';
    }

    function responseTransformationFn(data) {
        if (!angular.isObject(data)) {
            return data;
        }

        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                var value = data[key];

                if (angular.isString(value)) {
                    if (/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.test(value)) {
                        data[key] = moment(value).toDate();
                    }
                } else if (angular.isObject(value)) {
                    responseTransformationFn(value);
                }
            }
        }

        return data;
    }

    function requestTransformationFn(data, skipCopy) {
        // Necessário para não interferir no objeto original
        if (skipCopy) {
            data = angular.copy(data);
        }

        if (!angular.isObject(data)) {
            return data;
        }

        for (var key in data) {
            // Não percorre as propriedades próprias do angular
            if (data.hasOwnProperty(key) && !key.startsWith('$')) {
                var value = data[key];

                if (angular.isDate(value)) {
                    data[key] = moment(value).format('YYYY-MM-DD');
                } else if (angular.isObject(value)) {
                    requestTransformationFn(value, true);
                }
            }
        }

        return data;
    }
})();