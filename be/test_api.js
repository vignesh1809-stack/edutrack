const http = require('http');

const loginOptions = {
  hostname: 'localhost',
  port: 8080,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

const req = http.request(loginOptions, (res) => {
  let body = '';
  res.on('data', (chunk) => { body += chunk; });
  res.on('end', () => { 
    const token = JSON.parse(body).accessToken;
    const options = {
      hostname: 'localhost',
      port: 8080,
      path: '/api/principal/students/list?page=0&size=3&sort=cgpa,desc&course=BOARD',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    };
    
    http.get(options, (res2) => {
      console.log(`STATUS: ${res2.statusCode}`);
      let body2 = '';
      res2.on('data', (chunk) => { body2 += chunk; });
      res2.on('end', () => { console.log(`BODY: ${body2.substring(0, 500)}`); });
    });
  });
});

req.write(JSON.stringify({ phone: '1234567890', password: 'password', role: 'Principal' }));
req.end();
