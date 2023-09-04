function printPage() {
  window.print();
}

// Attach the printPage function to the print button
const printButton = document.getElementById("printButton");
if (printButton) {
  printButton.addEventListener("click", printPage);
}
