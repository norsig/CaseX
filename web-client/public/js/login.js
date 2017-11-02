var setCookies = function (email) {
  document.cookie = 'email=' + email;
  document.cookie = 'loggedIn=true';
};

var login = function () {
  var email = $('#email').val();
  var password = $('#password').val();

  if (email.length === 0) {
    alert('Incorrect email');
  } else {
    axios.get('http://localhost:3000/users')
      .then(function (response) {
        var data = response.data;
        for (var i = 0; i < data.length; i++) {
          if (email === data[i]['email']) {
            $.post('http://localhost:3000/login', {password: password, hash: data[i]['password']})
              .done(function (err, serverRes) {
                if (serverRes === 'success') {
                  setCookies(email);
                  window.location.href = '/';
                }
              })
              .fail(function () {
                alert('Incorrect password');
              });
          } else if (i === data.length) {
            alert('Incorrect email');
          }
        }
      });
  }

};

var returnKey = function (event) {
  if (event.keyCode === 13) {
    $('#login').click();
  }
};

$('#email').keyup(returnKey);

$('#password').keyup(returnKey);

$(document).ready(function () {
  $('#login').click(login);
});