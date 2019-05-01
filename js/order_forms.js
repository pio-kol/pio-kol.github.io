function sumUpValues() {
  var input = document.getElementsByName("reserved_hours");
  var total = 0;
  for (var i = 0; i < input.length; i++) {
    if (input[i].checked) {
      total += parseFloat(input[i].getAttribute("data-price"));
    }
  }
  document.getElementById("reserved_hours_sum").textContent = total.toFixed(2)
      + " zł";
  document.getElementById("reserved_hours_sum_input").value = total;

  const additional_funds = document.getElementById("additional_funds").value;
  document.getElementById(
      "additional_funds_sum").textContent = additional_funds + " zł";

  const amount_to_return = parseFloat(document.getElementById("amount_to_return").value);
  
  const total_sum = total + parseFloat(additional_funds) + amount_to_return;
  document.getElementById(
      "total_sum").textContent = total_sum.toFixed(2) + " zł";
  if (document.getElementById("total_sum_transfer")){
    document.getElementById("total_sum_transfer").textContent = total_sum.toFixed(2) + " zł";
  }
  document.getElementById("total_sum_input").value = total_sum;
  
  document.getElementById("amount_to_return_sum").textContent = amount_to_return.toFixed(2)
      + " zł";
  
}

function fillInputsFromGetParameters(){
  var search = location.search.substring(1);
  inputParameters = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
  
  for (var key in inputParameters) {
    if (document.getElementById(key) != null) {
       var element = document.getElementById(key)
       parameterValue = decodeURIComponent(inputParameters[key]);
 
       if (element.type && element.type === 'checkbox') {
         element.checked = parameterValue === "true" ? true : false;   
       } else {
         element.value = parameterValue;
       }
    }
    
    if (key == "reserved_hours" && inputParameters[key] != "") {
      reserved_hours = decodeURIComponent(inputParameters[key]).split(',');
      for (var reserved_hour_index in reserved_hours) {
        document.getElementById(reserved_hours[reserved_hour_index].trim()).checked = true;
      }
    }
  }
    
  sumUpValues();
}
