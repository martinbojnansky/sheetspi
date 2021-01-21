// Example:
// fetch('https://script.google.com/macros/s/AKfycbyJi98UoOmUVzRDbiRwmirVG7Y_i98FTb2diaRXKB6QESqDhYIJnUx5_ihiiTysM0wnfg/exec')
//   .then(response => response.json().then(json => console.log(json)));
function doGet(e) {
  return api.default.doGet(e);
}

// Example:
// fetch('https://script.google.com/macros/s/AKfycbyJi98UoOmUVzRDbiRwmirVG7Y_i98FTb2diaRXKB6QESqDhYIJnUx5_ihiiTysM0wnfg/exec', { method: 'post' })
//   .then(response => response.json().then(json => console.log(json)));
function doPost(e) {
  return api.default.doPost(e);
}