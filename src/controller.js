let db = require("./db");

let listEntries = function(req, res){
    let sql = " select id, title, done from entries;"
    
    db.query(sql, function(err, results){
        if(err){
            console.log("failed to query database", err);
            res.sendStatus(500); 
        } else {
            res.json(results);                

        }
    });
}; 

let getEntries = function(req, res){
    //1. we want to get the id from the request paths param
    //then we want to execute the sql statement to get the info for an entry from the database, but only for that id 
    let id = req.params.id;
    let sql = 'select * from entries where id = ?'
    let params = [id]

    db.query(sql, params, function(err, results){
        if (err){
                console.log("failed", err);
                res.sendStatus(500);
        }   else {
                if(results.length == 0){
                    res.sendStatus(404); 
                } else {
                    res.json(results[0]);
                }
        }
    })
};


let deleteEntries = function(req, res){
    let id = req.params.id;
    let sql = "delete from entries where id = ?";
    let params = [id];

    db.query(sql, params, function(err, results){
        if(err) {
            console.log("delete query failed", err); 
            res.sendStatus(500);
        }   else {
            res.sendStatus(204);
        }
})};


let addEntries = function(req, res){
    let title = req.body.title;
    let notes = req.body.notes;

    if(!title) {
        res.status(400).json("Title is required"); 
        return;
    }
    
    let sql = "insert into entries (title, notes) values (?, ?);"
    let params = [title, notes];

    db.query(sql, params, function(err, results){
        if(err){
            console.log("Failed to insert into the database", err);
            res.sendStatus(500); 
        } else {
            res.sendStatus(204);
        }
    })
};


let updateEntries = function(req, res){
    let id = req.params. id; 
    let title = req.body.notes;
    let notes = req.body.notes;
    let done = req.body.done;

    if(!title) {
        res.status(400).json("Title is required"); 
        return;
    }
    let done2 = false; 
    if(done == true){
        done2=true
    }
    let sql = "update entries set title = ?, notes =?, done =? where id =?"
    let params = [title, notes, done2, id]

    db.query(sql, params, function(err, results){
        if(err){
            console.log("Failed to update datebase", err);
            res.sendStatus(500);
        }   else {
            res.sendStatus(204);
        }
    })
};


module.exports = {
    listEntries,
    getEntries, 
    deleteEntries, 
    addEntries, 
    updateEntries
};
//(1:54)

