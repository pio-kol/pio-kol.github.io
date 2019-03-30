function sumUpValues() {
  var input = document.getElementsByName("reserved_hours");
  var total = 0;
  for (var i = 0; i < input.length; i++) {
    if (input[i].checked) {
      total += parseFloat(input[i].value);
    }
  }
  document.getElementById("reserved_hours_sum").textContent = total.toFixed(0)
      + " zł";

  const additional_funds = document.getElementById("additional_funds").value;
  document.getElementById(
      "additional_funds_sum").textContent = additional_funds + " zł";

  const total_sum = total + parseFloat(additional_funds);
  document.getElementById(
      "total_sum").textContent = total_sum.toFixed(0)
      + " zł";
}