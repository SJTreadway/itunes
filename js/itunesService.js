(function() {

 angular.module('itunes')

		.service('itunesService', function($http, $q){
		  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
		  //Also note that we're using a 'service' and not a 'factory' so all your methods you want to call in your controller need to be on 'this'.

		  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
		  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
		  //Note that in the above line, artist is the parameter being passed in. 
		  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

		    //Code here

		    this.getSongData = function(artist) {
		    	var deferred = $q.defer();
		    	$http ({
		    		method: 'JSONP',
		    		url: 'https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
		    	}).then(function(res) {
		    		var parsedData = res.data.results;
		    		var artists = [];
		    		for (var i = 0; i < parsedData.length; i++) {
		    			console.log(parsedData[i])
		    			var artistData = {};
		    			artistData.Play = parsedData[i].previewUrl;
		    			artistData.Artist = parsedData[i].artistName;
		    			artistData.TrackName = parsedData[i].trackName;
		    			artistData.Collection = parsedData[i].collectionName;
		    			artistData.AlbumArt = parsedData[i].artworkUrl60;
		    			artistData.Type = parsedData[i].kind;
		    			artistData.TrackPrice = parsedData[i].trackPrice;
		    			artistData.CollectionPrice = parsedData[i].collectionPrice;
		    			if (artistData.TrackPrice === -1) {
		    				artistData.TrackPrice = 'n/a';
		    			}
		    			if (artistData.CollectionPrice === -1) {
		    				artistData.CollectionPrice = 'n/a';
		    			}
		    			artists.push(artistData);
		    		}	    	
		    		deferred.resolve(artists);
		    	})
		    	return deferred.promise;
		    }
		    
		});
})();