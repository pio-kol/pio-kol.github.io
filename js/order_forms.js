function sumUpValues() {
  var input = document.getElementsByName("reserved_hours");
  var total = 0;
  for (var i = 0; i < input.length; i++) {
    if (input[i].checked) {
      total += parseFloat(input[i].getAttribute("data-price"));
    }
  }
  document.getElementById("reserved_hours_sum").textContent = total.toFixed(0)
      + " zł";
  document.getElementById("reserved_hours_sum_input").value = total;

  const additional_funds = document.getElementById("additional_funds").value;
  document.getElementById(
      "additional_funds_sum").textContent = additional_funds + " zł";

  const total_sum = total + parseFloat(additional_funds);
  document.getElementById(
      "total_sum").textContent = total_sum.toFixed(0)
      + " zł";
  document.getElementById("total_sum_input").value = total_sum;
}

function fillInputsFromGetParameters(){
  var search = location.search.substring(1);
  inputParameters = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')

  console.log(inputParameters);
  
  for (var key in inputParameters) {
    if (document.getElementById(key) != null) {
       document.getElementById(key).textContent = inputParameters[key];
    }
  }
}
