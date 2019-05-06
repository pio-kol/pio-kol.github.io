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

function fillInputsFromGetParameters(requestListOfMeetings = true){
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
        var element = document.getElementById(reserved_hours[reserved_hour_index].trim());
        if (element != null){
          element.checked = true;
        }
      }
    }
  }
    
  sumUpValues();
  
  if (requestListOfMeetings){
      Get("https://script.google.com/macros/s/AKfycbzMukfN2nW6VxC44B6JboZz8ORsb4mQM3BE9BR2PsG4XqAPMKsu/exec");
  }
}

function addAvailableMeetings(meetings){
  for (var i = 0; i < meetings.length; ++i){
    var meeting = meetings[i];
   
    var startDate = new Date(meeting.startDate);
    var meetingDate = ("0" + startDate.getDate()).slice(-2) + "." + ("0" + (startDate.getMonth() + 1)).slice(-2) + "." + startDate.getFullYear();
    var startTime = ("0" + startDate.getHours()).slice(-2) + ":" + ("0" + startDate.getMinutes()).slice(-2);
    var endDate = new Date(meeting.endDate);
    var endTime = ("0" + endDate.getHours()).slice(-2) + ":" + ("0" + endDate.getMinutes()).slice(-2); 
    var title = meeting.title + " - " + meetingDate + " - " + startTime + "-" + endTime;
    
    var meetingDurationInMinutes = (endDate - startDate) / 60000;
    
    var price = 0;
    if (title.toLowerCase().indexOf("lead") > 0){
      price = document.getElementById("lead_price").value;
    } else if (title.toLowerCase().indexOf("senior") > 0) {
      price = document.getElementById("senior_price").value;
    } else {
      continue; // do not display - invalid meeting
    }
    
    if (price == 0){
      continue;
    }
    
    var meetingCost = (price / 60) * meetingDurationInMinutes; 
    
    title += " (" + meetingCost + " zł)";
         
    var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.value = title;
        checkbox.id = title;
        checkbox.name = "reserved_hours";
        checkbox.setAttribute("data-price", meetingCost);
        checkbox.addEventListener('click', function() {
             sumUpValues();
        }, false);
     
    var fieldset = document.getElementById('available_meetings');
        fieldset.appendChild(checkbox);
        fieldset.appendChild(document.createTextNode(title));
        var br = document.createElement("br");
        fieldset.appendChild(br);
  }
}

function Get(url){
    var xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        //xhr.withCredentials = true
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) { 
            addAvailableMeetings(JSON.parse(xhr.responseText));
            fillInputsFromGetParameters(false);
          }
        }
        //xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send()        
}
