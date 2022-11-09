const loginButton = document.getElementById('loginBtn');

loginButton.addEventListener('click', function () {
  console.log('line 5');
  validate();
});

const uname = document.querySelector('#uname');
const pass = document.querySelector('#pass');

let username = '';
let password = '';

uname.addEventListener('keypress', (e) => {
  if (e.key == 'Enter') validate();

  username = uname.value;
  username += e.key;

  console.log('line 16', username);
});

pass.addEventListener('keypress', (e) => {
  if (e.key == 'Enter') validate();

  password = pass.value;
  password += e.key;

  console.log('line 22', password);
});

function validate() {
  console.log('line 25', username, password);
  if (username == 'thoriqzs' && password == 'abcvmnop') {
    window.nav.app('mainAppRedirect');
  } else alert('Salah uname dan pass');
}
