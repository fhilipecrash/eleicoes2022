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
        const fields = ['Nome: ', 'Cargo: ', 'Staus: ', 'Votos: ']

        let index = 0;
        for (const [key, value] of Object.entries(item)) {
          const nameLabel = document.createElement('label');
          nameLabel.appendChild(document.createTextNode(fields[index]));
          const nameEl = document.createElement('span');
          nameEl.appendChild(document.createTextNode(value));

          divEl.appendChild(nameLabel);
          divEl.appendChild(nameEl);
          index++;
        }
        
        resEl.appendChild(divEl);
      });
    });
}