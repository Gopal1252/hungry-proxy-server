const express = require('express');
const cors = require('cors');
const fetch = require('cross-fetch');

const app = express();
const port = process.env.PORT  || 3000;
app.use(cors());


app.get('/', (req, res) => {
//   const { lat, lng } = req.query;
//   console.log(req.query);
  const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.65200&lng=77.16630&&page_type=DESKTOP_WEB_LISTING`;

  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      res.json(data);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('An error occurred');
    });
});

app.get('/menu', (req, res) => {
  const { restaurantId } = req.query;
  console.log(req.query);

  const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.65200&lng=77.16630&restaurantId=${restaurantId}`;


  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
    
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('An error occurred');
    });
});


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});