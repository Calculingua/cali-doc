'use strict';

function EditFunctionController($stateParams, ES) {
    var self = this;
    this.id = $stateParams.id;
    this.fn = {};
    this.fn.publishStatus = 'draft';


    this.save = function() {
        if (!this.id) { return this.create(); }
        ES.update({
            index: 'cali',
            type: 'function',
            id: this.id,
            body: { doc: this.fn},
        }, function(err, response) {
        });
    }

    this.create = function() {
        ES.create({
            index: 'cali',
            type: 'function',
            body: this.fn,
        }, function(err, response) {
            console.log(err, response);
        });
    }

    this.getFn = function() {
        ES.get({
            index: 'cali',
            type: 'function',
            id: this.id,
        }, function(err, response) {
            if (err) { 
                console.log("ERR", err);
            }
            self.fn = response._source;
        });
    }

    if (this.id) {
        this.getFn();
    }

}
EditFunctionController.$inject = ['$stateParams', 'ES'];

angular.module('cali.help.admin')
    .controller('EditFunctionController', EditFunctionController)
;