const loginButton = document.getElementById('loginBtn');

loginButton.addEventListener('click', function () {
  console.log('line 5');
  window.nav.app('mainAppRedirect');
});
