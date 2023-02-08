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

        const nameEl = document.createElement('span');
        nameEl.appendChild(document.createTextNode(item.name));

        const roleEl = document.createElement('span');
        roleEl.appendChild(document.createTextNode(item.role));

        const statusEl = document.createElement('span');
        statusEl.appendChild(document.createTextNode(item.status));

        const votesEl = document.createElement('span');
        votesEl.appendChild(document.createTextNode(item.votes));
  
        divEl.appendChild(nameEl);
        divEl.appendChild(roleEl);
        divEl.appendChild(statusEl);
        divEl.appendChild(votesEl);
        resEl.appendChild(divEl);
      });
    });
}