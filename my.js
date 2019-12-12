//<!--Calling onDeviceReady method-->
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {

//<!--window.sqlitePlugin.openDatabase creates/open a non existing/existing database-->
var db = window.sqlitePlugin.openDatabase({name: "base.db"});
show();
db.transaction(function(tx) {
tx.executeSql('CREATE TABLE IF NOT EXISTS mydata (id integer primary key, name text, nume text, carre text)');
});

//<!--Method to insert new row in the database-->
$(document).on('click', '#creat', function(){
var name = $("#name").val();
var num = $("#numero").val();
var carr = $("#carrera").val();
db.transaction(function(transaction) {
var executeQuery = "INSERT INTO mydata (name, nume, carre) VALUES (?,?,?)";
transaction.executeSql(executeQuery, [name,num,carr]
, function(tx, result) {
show();
},
function(error){
//filter(function(aSome) {alert('Error occurred');
});
});
});

//<!--Display all rows stored in the database-->
function show(){
db.transaction(function(transaction) {
transaction.executeSql('SELECT * FROM mydata', [], function (tx, results) {
var key = "";

//<!--Display the table head-->
var pair="<tr><th data-priority=\"1\"><center>Id</center></th><th data-priority=\"1\"><center>Name</center></th><th data-priority=\"2\"><center>No. Control</center></th><th data-priority=\"1\"><center>Carrera</center></th><th><center>Actualizar</center></th><th><center>Eliminar</center></th></tr>";
var i=0;

//<!--results.rows.length to get the total number of rows stored in the database-->
var len = results.rows.length, i;
for (i=0; i<=len-1; i++) {

//<!--Fetching the 'name' from the database-->
key = results.rows.item(i).name;

//<!--Fetching the 'id' from the database-->
id = results.rows.item(i).id;

//<!--Displaying all rows of the database in the table-->
pair += "<tr><td><center>"+id+"</center></td><td><center>"+key+"</center></td><td><center>"+results.rows.item(i).nume+"</center></td><td><center>"+results.rows.item(i).carre+"</center></td><td><a class=\"update\" href=\"#myPopupDialog\" data-custom="+"'"+ id+ "'" +"data-rel=\"popup\" data-position-to=\"window\" data-transition=\"pop\"><center><i class='fa fa-pencil-square-o'></i></center></a></td><td><a id=\"delete\" data=\""+id+"\"><center><i class='fa fa-trash'></i></center></a></td></tr>";
}
if (pair == "<tr><th>Name</th><th>No. Control</th><th>Carrera</th></tr>") {
pair += "<tr><td><i>empty</i></td><td><i>empty</i></td></tr>";
}
$("#myTable").html(pair);
}, null);
});
}

//<!--Method to delete any row from the database-->
$(document).on('click', '#delete', function(){
var id = $(this).attr("data");
db.transaction(function(transaction) {
transaction.executeSql("DELETE FROM mydata where id=?", [id],
function(tx, result) {
show();
},
function(error){
 alert('Something went Wrong');
});
});
});

//<!--Method to update the values of any row in the database-->
$(document).on('click', '#upd', function(){
var id = $("#id").val();
var name = $("#uname").val();
var num = $("#unumero").val();
var carr = $("#ucarrera").val();
db.transaction(function(transaction) {
var executeQuery = "";
transaction.executeSql("UPDATE mydata SET name=?, nume=? , carre=? WHERE id=?", [name,num,carr, id],
function(tx, result) {alert('Updated successfully');
show();
},
function(error){alert('Something went Wrong');});
});
});
$(document).on('click', '.update', function(){
var id = $(this).attr('data-custom');
$("#id").val(id);
db.transaction(function(transaction) {
transaction.executeSql('SELECT name,nume FROM mydata where id=?', [id], function (tx, results) {
var name = results.rows.item(0).name;
var num = results.rows.item(0).nume;
var carr = results.rows.item(0).carre;
$("#uname").val(name);
$("#unumero").val(num);
$("#ucarrera").val(carr);
},
function(error){
alert('Something went Wrong');
});
});
});

//<!--Method to clear all rows from the database-->
$(document).on('click', '#clearall', function(){
db.transaction(function(transaction) {
transaction.executeSql("DELETE FROM mydata", [],
function(tx, result) {alert('Delete successfully');
show();
},
function(error){alert('Something went Wrong');});
});
});
}