'use strict';

function EditFunctionController($stateParams, $state, ES) {
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
    };

    this.create = function() {
        if (!this.fn.name) { return console.log("Need a name"); }
        ES.create({
            index: 'cali',
            type: 'function',
            id: this.fn.name,
            body: this.fn,
        }, function(err, response) {
            console.log(err, response);
            $state.go('editFunction', {id: response._id});
        });
    };

    this.delete = function() {
        if (!!this.id && confirm("Are you sure you want to delete this?")) {
            ES.delete({
                index: 'cali',
                type: 'function',
                id: this.id,
            }, function(err, response) {
                if (err) {console.log("DELETE ERROR", err); }
                $state.go('home');
            });
        }
    };

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
    };

    if (this.id) {
        this.getFn();
    }

}
EditFunctionController.$inject = ['$stateParams', '$state', 'ES'];

angular.module('cali.help.admin')
    .controller('EditFunctionController', EditFunctionController)
;