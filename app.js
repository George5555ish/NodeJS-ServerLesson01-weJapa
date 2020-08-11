//http module for server
const http = require('http');

//querystring module to parse the user response.
const { parse } = require('querystring');
//file system module to create a new file.
const fs = require('fs');
const server = http.createServer((req, res) => {

    if (req.method === 'POST'){
        //to handle the post requests.
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            var parsedJson = parse(body);

            // console.log(parsedJson.fname);

            var userFile = parsedJson.fname;

            var textToFill = `This is a new File. Name: ${userFile}. PassWord: ${parsedJson.pwd}`;



            fs.writeFile(userFile, textToFill, (err)=> {
                console.log('Data collated');
            })
        
            res.end('This data belonges to: ' + parsedJson.fname);
        })
    } else {
        res.end(`
        <!doctype html>
        <html>
        <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-weight: 300;
          }
          
          body {
            font-family: "Source Sans Pro", sans-serif;
            color: white;
            font-weight: 300;
            background: #50a3a2;
            width: 100%;
            height: 100%;
          }
          
          .container {
            margin: 10% auto;
            padding: 80px 0;
            text-align: center;
          }
          
          .container h1 {
            font-size: 40px;
            font-weight: 200;
          }
          
          .header{
              padding: 15px;
              font-weight: bold;
              font-family: Arial, Helvetica, sans-serif;
          }
          form {
            padding: 20px 0;
            margin-top: 10%;
            position: relative;
            text-align: center;
          }
          form input {
            border: 1px solid rgba(252, 252, 252, 0.4);
            background-color: rgba(252, 252, 252, 0.2);
            width: 250px;
            border-radius: 3px;
            font-family: "Source Sans Pro", sans-serif;
            padding: 10px 15px;
            margin: 0 auto 10px auto;
            display: block;
            text-align: center;
            font-size: 18px;
            color: white;
            font-weight: 300;
          }
          
          form button {
            appearance: none;
            outline: 0;
            background-color: white;
            border: 0;
            padding: 10px 15px;
            color: #50a3a2;
            border-radius: 3px;
            width: 250px;
            font-size: 18px;
            margin: 0 auto;
            cursor: pointer;
            transition: .25s ease-in;
          }
        
          form button:hover{
              background-color: #50a3a2;
              color: white;
              font-size: 22px;
          }
          
        </style>
        <body>
           

            <form className="form" action="/" method="POST">
        <h1 class="header">Input Your Details</h1>
        <input type="text" placeholder="Username" name="fname"/>
        <input type="password" placeholder="Password" name="pwd" />
        <input type="password" placeholder="Confirm Password" name="confirmpwd"/>
        <button type="submit">Register</button>
      </form>
        </body>
        </html>
    `);
    }
  
});
server.listen(3000, ()=>{
  console.log('Server listening on port 3000');
});