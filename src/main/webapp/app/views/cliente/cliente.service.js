(function () {
    'use strict';

    angular
        .module('app')
        .factory('ClienteResource', ClienteResource);

    ClienteResource.$inject = ['$resource'];
    function ClienteResource($resource) {
        return $resource('/curso-angular/rest/cliente/:id');

        //var User = $resource('/user/:userId', {userId: '@id'});
        //var userJoao = User.get({userId:123}, function (){
            //userJoao.id será a propriedade setada pelo back end apos a chamada get, através do @id
            // @id significa o nome do atributo que sera setado no objeto pelo parametro userId informado
        //});
        // $resource('/curso-angular/rest/cliente/:dest/:id', {id: '@id'}, {
        //     list: { method: 'GET', params: { dest: 'listarTodos' }, isArray: true },
        //     listPaged: { method: 'POST', params: { dest: 'listarPaginado' } },
        //     save: { method: 'POST', params: { dest: 'salvar' } },
        //     remove: { method: 'DELETE', params: { dest: 'excluirLong' } },
        //     find: { method: 'POST', params: { dest: 'consultarLong' } }
        // });

        // var User = $resource('/user/:userId', {userId:'@codigo'});
        // var userJoao = User.get({userId:123}, function() {
        //     console.log(userJoao.codigo);
        //     userJoao.$delete();
        //     User.delete({userId: userJoao.codigo});
        // });
    }
})();