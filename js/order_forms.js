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
  var parametersAsJson = '{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"').replace(/\n/g, ' ') + '"}';
  inputParameters = search.length > 0 ? JSON.parse(parametersAsJson) : [];
  
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
  readAvailableEvents();
}

function readAvailableEvents(){
  var availableEvents = JSON.parse(Get("https://script.googleusercontent.com/a/macros/passionatesoftwareengineer.com/echo?user_content_key=gV-tEG66RQ4IBa_A7hGofe09tEP7jMYZHY9nt6jRUyUd1M7Ipj43PknUJA38dPkPO7P_AegFeGNrimgfeMOGnxOkOPxw8kM1m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_zryPdZgxfdDLh65TMQlLKZDSu0auC6zr292m5gY_4qtaiOv029MG4EuHIcJ3mEdrROP0qY_Fdh6VaUUIjLRV8qAe4hnEtf-SCqDs6NJr9NIyGB4pme4FR9ku0zz1WX7h&lib=MJvCzgFrdZOyAyMefIGJ1R-FzVoMrj77L"));
  console.log(availableEvents);
  
  var fieldset = document.getElementById('available_meetings'); //ul
    

    var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.value = "Extra konsultacje z Piotrem";
        checkbox.name = "reserved_hours";
        checkbox.setAttribute("data-price", "75");
        checkbox.addEventListener('click', function() {
    sumUpValues();
}, false);
        
    fieldset.appendChild(checkbox);

    //var text = document.getElementById('texto');
    fieldset.appendChild(document.createTextNode("Extra konsultacje z Piotrem"));
   
    //ul.appendChild(li); 
}

function Get(yourUrl){
    var xhr = new XMLHttpRequest(); // a new request
    xhr.withCredentials = true
    xhr.open("GET",yourUrl,true);
    xhr.send(null);
    return xhr.responseText;          
}
