const api = 'http://localhost:3000';

function getCandidatesByName() {
  const inputValue = document.getElementById('name').value;

  fetch(`${api}/name?name=${inputValue}`)
    .then(response => response.json())
    .then(data => {
      const resEl = document.getElementById('res');
      resEl.innerHTML = '';

      data.forEach(item => {
        const divEl = document.createElement('div');
        const fields = ['Nome: ', 'Cargo: ', 'Staus: ', 'Votos: '];

        let index = 0;
        for (const [key, value] of Object.entries(item)) {
          const label = document.createElement('label');
          label.appendChild(document.createTextNode(fields[index]));
          const span = document.createElement('span');
          span.appendChild(document.createTextNode(value));

          divEl.appendChild(label);
          divEl.appendChild(span);
          index++;
        }
        
        resEl.appendChild(divEl);
      });
    });
}