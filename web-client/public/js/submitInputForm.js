(() => {

  $('input#drNumInput').val();
  $('input#masterDrNumInput').val();
  $('select#divisionInput').val();
  $('select#bureauInput').val();
  $('select#victimNameInput').val();
  $('select#notesInput').val();

  const formToJSON = elements => [].reduce.call(elements, (data, element) => {

    data[element.name] = element.value;
    return data;

  }, {});

  const handleFormSubmit = event => {
    //event.preventDefault();
    const data = formToJSON(form.elements);
    console.log(JSON.stringify(data, null, "  "));
  }

  const form = document.getElementsByClassName('input-form')[0]
  form.addEventListener('submit', handleFormSubmit);

  $('#button-submit-forms').on('click', function(){
    handleFormSubmit();
  })
})();