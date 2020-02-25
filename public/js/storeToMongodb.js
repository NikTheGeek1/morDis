function saveToMongodb(data){
// with this fetch we are sending data from the client side to the server usign POST
fetch("/q_data", { // sending a post request to /q_data (defined in controllers)
      method: 'POST',
      headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
      body: JSON.stringify(data) // this are the data
    }).then(res => { // the fetch method returns a promise
      return res.json()
    })
    .catch( (error) => console.log(error) );
};
