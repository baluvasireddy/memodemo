var module = angular.module('app', []);

module.service('NoteService', function () {
    var uid;
    var notesList;
    this.init = function() {
        notesList = [];
        uid = 1;
        if(localStorage.getItem("uid") == null){
            localStorage.setItem("uid", uid);    
        }
        else {
            uid = parseInt(localStorage.getItem("uid"));
        }


        if(localStorage.getItem("notesList") == null){
            localStorage.setItem("notesList", notesList);    
        }
        else {
            notesList = JSON.parse(localStorage.getItem("notesList"));
        }
    }
    
    this.save = function (note) {
        if (note.id == null) {
            note.id = uid++;
            notesList.push(note);
        } else {
            for (i in notesList) {
                if (notesList[i].id == note.id) {
                    notesList[i] = note;
                }
            }
        }
        this.updateDB();

    }

    this.get = function (id) {
        for (i in notesList) {
            if (notesList[i].id == id) {
                return notesList[i];
            }
        }

    }
    
    this.delete = function (id) {
        for (i in notesList) {
            if (notesList[i].id == id) {
                notesList.splice(i, 1);
            }
        }
        this.updateDB();
    }

    this.list = function () {
       notesList = JSON.parse(localStorage.getItem("notesList"));
       return notesList;
    }

    this.updateDB = function() {
        localStorage.setItem("uid", uid);
        localStorage.setItem("notesList", JSON.stringify(notesList));
        notesList = JSON.parse(localStorage.getItem("notesList"));
        uid = parseInt(localStorage.getItem("uid"));
    }
});

module.controller('NotesController', function ($scope, NoteService) {
    $scope.init = function() {
        NoteService.init();
    }

    $scope.notesList = NoteService.list();

    $scope.savenote = function () {
        if(!($scope.newNote && $scope.newNote.name && $scope.newNote.email && $scope.newNote.phone))
        return
        NoteService.save($scope.newNote);
        $scope.newNote = {};
        $scope.notesList = NoteService.list();
    }


    $scope.delete = function (id) {
        $scope.newNote = angular.copy(NoteService.get(id));
        NoteService.delete($scope.newNote.id);
        if ($scope.newNote.id == id) $scope.newNote = {};
        $scope.notesList = NoteService.list();
    }


    $scope.edit = function (id) {
        $scope.newNote = angular.copy(NoteService.get(id));
        $scope.notesList = NoteService.list();
    }
})