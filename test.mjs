import axios from 'axios';
let data = JSON.stringify({
  "username": "william1006@gmail.com",
  "password": "12345678"
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://cred-api.snowbridge.tw/api/auth/login',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
