function getIdFromHref(href) {
    var lastIndex = href.lastIndexOf("files/");
    if (lastIndex != -1) {
        return href.substring(lastIndex + 6);
    }
    return null;
}



angular.module('filesApp', [])
  .controller('FilesListController', function($http) {
    var filesList = this;
    filesList.files = [];
    filesList.albums = [];
  
    filesList.getFilesList = function(filter = null) {
      var promise = $http.get('/files/')
       promise.success(function(data, status, headers, config) {
          if (data._embedded != undefined) {
            temp = [];
            if (filter === null) {
                angular.forEach(data._embedded.files, function(file) {
                  temp.push(file);
                });
            } else {
                angular.forEach(data._embedded.files, function(file) {
                    if (filter(file)) {
                        temp.push(file);
                    }
                })
            }
            filesList.files = temp;
          }
      });
      return promise;
    };

    filesList.getAlbums = function() {
        $http.get('/albums/')
            .success(function(data, status, headers, config) {
                if (data._embedded != undefined) {
                    filesList.albums = [];
                    angular.forEach(data._embedded.albums, function(album) {
                        filesList.albums.push(album);
                    });
                }
            });
    };

    filesList.getFilesList().then(function() {
        filesList.getAlbums();
    });

    filesList.getHref = function(file) {
      return file._links["self"].href;
    };

    filesList.getId = function(file) {
        return getIdFromHref(file._links["self"].href);
    }

    filesList.printFileIds = function() {
        this.files.forEach(function(file) {
            console.log(getIdFromHref(file._links["self"].href));
        });
    };
  
    filesList.upload = function() {
      var f = document.getElementById('file').files[0];
      var file = {name: f.name, summary: filesList.summary};
      
      $http.post('/files/', file)
        .then(function(response) {
          var fd = new FormData();
          fd.append('file', f);
          return $http.put(response.headers("Location"), fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
          });
        })
        .then(function(response) {
          filesList.title = "";
          filesList.keywords = "";
          filesList.getFilesList();
          document.getElementById('file').files[0] = undefined;
        });
    };

    filesList.addAlbum = function() {
        var name = document.getElementById('album').value;
        var album = {name: name,
            fileIds: this.files.map(file => filesList.getId(file))
                .filter(id => document.getElementById("add-to-album-" + id).checked == true)
         };

        $http.post('/albums/', album)
            .then(function(response) {
                filesList.getAlbums();
                document.getElementById('album').value = ""
            });
    };

    filesList.showAlbumView = function(album) {
        var filterFunc = function(file) {
            return album.fileIds.includes(filesList.getId(file));
        };

        filesList.getFilesList(filterFunc);
    };
  });