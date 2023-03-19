
import { table } from "console"
import http from "http"
import fetch from "node-fetch"
import { createDeflateRaw } from "zlib"

const server = http.createServer((req, res)=> {
    const url = req.url
    let tableData = "<table border='1'><tr><th>ID</th><th>Name</th><th>Username</th><th>Email</th><th>Address</th><th>Phone Number</th></tr>"
    if(url === '/') {
        res.write("<h1> Welcome to my Home Page </h1>") 
        res.write('<img src="https://picsum.photos/200/300"/>')
        res.end()
    }

   else if (url === '/list'){
        fetch('http://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(data => {
            createData(data)
            res.write(tableData)
            res.end()
        })
       
    }

    else {
        res.write ("Error, page not found")
        res.end()
    }

    function createData(data) {
        data.forEach(element => {
            tableData+= `<tr><td>${element.id}</td><td>${element.name}</td><td>${element.username}</td><td>${element.email}</td><td>${element.address.street}</td><td>${element.phone}</td></tr>`
        });
        tableData+= '</table>'
    }

}).listen(8080, console.log('Server listening on port 8080'))