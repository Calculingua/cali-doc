'use strict';


function SidebarController(ES) {
    var self = this;
    this.fns = [];

    this.refresh = function() {
        ES.search({
            index: 'cali',
            type: 'function',
            query : {
                "match_all" : {}
            }
        }).then(function (resp) {
            console.log("RESP",resp);
            self.fns = resp.hits.hits;
        }, function (err) {
            console.trace(err.message);
        });

    }

    this.refresh();

}
SidebarController.$inject = ['ES'];


angular.module('cali.help.admin')
    .controller('SidebarController', SidebarController)
;