// we store the various DOM elements in variables
const form = document.getElementById('form');
const input = document.getElementById('number');
const list = document.getElementById('list');

form.addEventListener('submit', (e) => {

  // retrieving value from the number input
  const numberOfJokes = input.value;

  // we call our getJokes function and chain promises
  getJokes(numberOfJokes)
  // we use then to retrieve the data when we get the response
  .then( data => {
    // here is where we put all what we want to do when we recieve our response
    // we use a for each loop to get the jokes
    data.value.forEach( (item) => {

      // we create a li element
      const newItem = document.createElement('li');

      // setting the text for the li
      newItem.innerHTML = item.joke;

      // adding the li element to the ul list
      list.appendChild(newItem);

    }); //closing the for each loop

  })
  // we use catch to handle the errors
  .catch( err => console.log(err) );


  // this is to prevent the page from reloading
  e.preventDefault();

});

// using fetch in asynchronous is way cleaner
// defined the getJokes function
const getJokes = async (jokes) => {
  // fetching the api
  const response = await fetch(`http://api.icndb.com/jokes/random/${jokes}`);

  // checking whether we have a valid response
  if (response.status !== 200) {

    // we make our own error here to later use in the catch method
    throw new Error("failed to retrieve data");

  }

  //we now use the .json() method to get the data instead of JSON.parse
  const data = await response.json();

  // we return the data in order to allow us to chain promises
  return data;

};
