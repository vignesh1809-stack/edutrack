const http = require('http');
const req = http.request({
  hostname: 'localhost',
  port: 8080,
  path: '/api/auth/login',
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
}, res => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => {
    const token = JSON.parse(body).accessToken;
    const req2 = http.request({
      hostname: 'localhost',
      port: 8080,
      path: '/api/principal/dashboard/students?page=0&size=10',
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token }
    }, res2 => {
      let body2 = '';
      res2.on('data', d => body2 += d);
      res2.on('end', () => console.log('RESPONSE:', body2));
    });
    req2.end();
  });
});
req.write(JSON.stringify({
  institutionId: '21a8f6d2-e89e-455a-ada9-82af71ce211c',
  phone: '3117704862',
  password: 'password123',
  role: 'STAFF'
}));
req.end();
