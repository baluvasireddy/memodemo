var module = angular.module('app', []);

module.service('NoteService', function () {
    var uid = 1;
    
    var notesList = [{
        id: 0,
        'name': 'Viral',
        'email': 'hello@gmail.com',
        'phone': '123-2343-44'
    }];
    
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
    }

    this.list = function () {
        return notesList;
    }
});

module.controller('NotesController', function ($scope, NoteService) {

    $scope.notesList = NoteService.list();

    $scope.savenote = function () {
        if(!($scope.newNote && $scope.newNote.name && $scope.newNote.email && $scope.newNote.phone))
        return
        NoteService.save($scope.newNote);
        $scope.newNote = {};
    }


    $scope.delete = function (id) {

        NoteService.delete(id);
        if ($scope.newNote.id == id) $scope.newNote = {};
    }


    $scope.edit = function (id) {
        $scope.newNote = angular.copy(NoteService.get(id));
    }
})