'use strict';


function ES(esFactory) {
    return esFactory({
        host: 'help.calculingua.com:9200',
        apiVersion: '1.2',
        log: 'trace'
    });
}
ES.$inject = ['esFactory'];

angular.module('cali.help.admin')
    .factory('ES', ES)
;
