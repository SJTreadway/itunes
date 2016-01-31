(function() {

 angular.module('itunes')

        .controller('mainCtrl', function($scope, itunesService){

          $scope.gridOptions = {
              data: 'songData',
              height: '110px',
              sortInfo: {fields: ['Song', 'Artist', 'Track Name', 'Track Price', 'Collection', 'Type'], directions: ['asc']},
              columnDefs: [
                {field: 'Play', displayName: 'Play', width: '40px', cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><a href="{{row.getProperty(col.field)}}"><img src="http://www.icty.org/x/image/Miscellaneous/play_icon30x30.png"></a></div>'},
                {field: 'Artist', displayName: 'Artist'},
                {field: 'TrackName', displayName: 'Track Name'},
                {field: 'Collection', displayName: 'Collection'},
                {field: 'AlbumArt', displayName: 'Album Art', width: '110px', cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><img src="{{row.getProperty(col.field)}}"></div>'},
                {field: 'Type', displayName: 'Type'},
                {field: 'TrackPrice', displayName: 'Track Price'},
                {field: 'CollectionPrice', displayName: 'Collection Price'},
              ]
          };

            $scope.getSongData = function(artist) {
              artist = $scope.artist;
              return itunesService.getSongData(artist)
              .then(function(res) {
                $scope.songData = res;
              });
            }
        });
})();
