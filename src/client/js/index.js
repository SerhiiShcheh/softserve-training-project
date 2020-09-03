document.addEventListener('DOMContentLoaded', () => {
  const fileInputs = document.querySelectorAll('.form__file-input');
  Array.from(fileInputs).map((input) => {
    const label = input.nextElementSibling;
    input.addEventListener('change', (event) => {
      const fileName = event.target.value.split( '\\' ).pop();
      if (fileName) {
        label.querySelector('span').innerHTML = fileName;
      }
    });
  });
});
