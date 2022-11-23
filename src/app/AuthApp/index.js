const loginButton = document.getElementById('loginBtn');

loginButton.addEventListener('click', function () {
  validate();
});

const uname = document.querySelector('#uname');
const pass = document.querySelector('#pass');

let username = '';
let password = '';

uname.addEventListener('keypress', (e) => {
  if (e.key == 'Enter') validate();
  else {
    username = uname.value;
    username += e.key;
  }
});

pass.addEventListener('keypress', (e) => {
  if (e.key == 'Enter') validate();
  else {
    password = pass.value;
    password += e.key;
  }
});

function validate() {
  if (username == 'thoriqzs' && password == 'abcvmnop') {
    window.nav.app('mainAppRedirect');
  } else {
    alert('Salah uname dan pass');
  }
}
