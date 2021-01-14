document.querySelector('.get-jokes')
.addEventListener('click', getJokes);

function getJokes(e){

  const number = document.getElementById('number').value

   console.log(number);

  //initialise an xhr object
  const xhr = new XMLHttpRequest();

  xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);

  xhr.onload = function() {
    if(this.status === 200){
      const jokes = JSON.parse(this.responseText);

      // console.log(jokes);

      let output = '';

      if (jokes.type === 'success'){
        jokes.value.forEach(function(joke){
          output += `<li>${ joke.joke}</li>`;
        });
      }else {
        output += '<li> Something went wrong..</li>'
      }
      document.querySelector('.jokes').innerHTML = output;
    }
  }

  xhr.send();

  e.preventDefault();
}