const api = 'http://localhost:3000';

window.onload = () => {
  fetch(`${api}/roles`)
    .then(response => response.json())
    .then(data => createSelectOptions(data, 'role'));

  fetch(`${api}/townships`)
    .then(response => response.json())
    .then(data => createSelectOptions(data, 'township'));
}

function createSelectOptions(data, elementId) {
  const select = document.getElementById(elementId);

  data.forEach(item => {
    const option = document.createElement('option');
    option.value = item.id;
    option.appendChild(document.createTextNode(item.nome));
    select.appendChild(option);
  });
}

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

          const otherDiv = document.createElement('div');
          otherDiv.appendChild(label);
          otherDiv.appendChild(span);
          divEl.appendChild(otherDiv);
          index++;
        }
        
        resEl.appendChild(divEl);
      });
    })
    .catch(() => {
      const resEl = document.getElementById('res');
      resEl.innerHTML = '';
    })
}