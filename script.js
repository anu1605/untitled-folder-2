// $(document).ready(function(){

  var emptyInput;
  var tableCount = 0;
  var isSelected = false;
  var alreadyClick = false;
  var listLength = 0;
  var subjectList = [];
  var selectedSbject = [];
  var selectedHobbies = [];
  var year;
  var marks;

  
  $("#submit").click(func);
  
  $(".subject_input > input").change(checkSubject);

  
  function checkSubject() {
    if (this.checked == true) {
      document.getElementById("subect_error").innerHTML = "";
      selectedSbject.push(this.value);
    } else selectedSbject.delete(this.value);
    console.log(selectedSbject);
  }
  
  $("option").click(function(){
    { 
    if (this.selected) {
      selectedHobbies.push(this.value);
      $("#hobbies_error").innerHTML = "";
    }
  }
  });
  
  
  function func() {
    if (emptyInput != undefined) emptyInput.classList.remove("redBorder");
    // validate firstname
    var firstName = document.getElementById("fname");
    if (firstName.value == "") {
      if (emptyInput != undefined) emptyInput.classList.remove("redBorder");
      emptyInput = firstName;
      emptyInput.classList.add("redBorder");
      emptyInput.select();
      emptyInput.scrollIntoView();
      return;
    }
  
    // validate lastname
    var lastName = document.getElementById("lname");
    if (lastName.value == "") {
      removeBorder();
      emptyInput = lastName;
      emptyInput.classList.add("redBorder");
      emptyInput.select();
      emptyInput.scrollIntoView();
      return;
    }
  
    // validate email
    var email = document.getElementById("email");
  
    if (!validateEmail()) {
      removeBorder();
      emptyInput = email;
      emptyInput.classList.add("redBorder");
      email.scrollIntoView();
      return;
    }
  
    // check if gender is selected
  
    if (  $("#male")[0].checked == false && $("#female")[0].checked == false) {
      removeBorder();
      emptyInput = $("#male")[0];
      emptyInput.classList.add("redBorder");
      emptyInput.scrollIntoView();
      return;
    }
    // check if hobbies field is empty

  
    if (selectedHobbies.length == 0) {
      removeBorder();
      emptyInput = $("#hobbies")[0];
      emptyInput.classList.add("redBorder");
      emptyInput.scrollIntoView;
  
      $("#hobbies_error").innerHTML = "Select Hobbies";
      return;
    } else $("#hobbies_error").innerHTML = "";
  
    // check if subject field is empty
  
    if (selectedSbject.length == 0) {
      if (!alreadyClick) addClass();
      $("#option_container").scrollIntoView;
      $("#subect_error").innerHTML = "Select Subject";
      return;
    } else $("#subect_error").innerHTML = "";
  
    
    // validate table
    for (var i = 0; i <= tableCount; i++) {
      if(document.getElementById("table_body").rows[i] != undefined)
      if (!checkEmptyCell(4, document.getElementById("table_body").rows[i]))
        return;
    }
  
    // image validation
    if (!fileValidation()) {
      return;
    } else document.getElementById("image_error").innerHTML = "";
    var passwordError = document.getElementById("pwd_message");
    var password = document.getElementById("pwd");
    if (password.value == "") {
      removeBorder();
      emptyInput = password;
      emptyInput.select();
      emptyInput.scrollIntoView();
      emptyInput.classList.add("redBorder");
      passwordError.innerHTML = "enter password";
      return;
    } else if (document.getElementsByClassName("invalid").length != 0) {
      passwordError.innerHTML = "enter valid password";
      return;
    }
    var confirm_password = document.getElementById("confirm_pwd");
    if (confirm_password.value == "") {
      removeBorder();
      emptyInput = confirm_password;
      emptyInput.select();
      emptyInput.scrollIntoView();
      emptyInput.classList.add("redBorder");
      passwordError.innerHTML = "confirm password";
      return;
    } else if (!confirmPassword()) {
      passwordError.innerHTML = "confirm password is wrong";
      return;
    } else if (confirm_password.value.length != password.value.length) {
      removeBorder();
      emptyInput = confirm_password;
      emptyInput.select();
      emptyInput.scrollIntoView();
      emptyInput.classList.add("redBorder");
      passwordError.innerHTML = "confirm password is wrong";
      return;
    } else passwordError.innerHTML = "";
  
    // date validation
    if (!validDate()) {
      return;
    }
  
    // print output
    var printContainer = document.getElementById("print");
    printContainer.innerHTML = "";
    var form = document.getElementById("information");
    var formData = new FormData(form);
  
    for (item of formData) {
      if (item[0] == "filename") {
        var fileInput = document.getElementById("myFile");
        if (fileInput.files && fileInput.files[0]) {
          var reader = new FileReader();
          reader.onload = function (e) {
            printContainer.innerHTML +=
              '<img style = "width : 10rem" src="' + e.target.result + '"/>';
          };
  
          reader.readAsDataURL(fileInput.files[0]);
        }
      } else
        printContainer.innerHTML += item[0] + ": " + item[1] + "<br>" + "<br>";
    }
  }
  
  var male = document.getElementById("male");
  male.addEventListener("click", genderValue);
  var female = document.getElementById("female");
  female.addEventListener("click", genderValue);
  
  function genderValue() {
    if (male.checked == true || female.checked == true) {
      male.value = "male";
      female.value = "female";
    }
  }
  
  var menu_btn = document.getElementById("menu");
  
  menu_btn.addEventListener("click", addClass);
  
  function addClass() {
    var container = document.getElementById("option_container");
    var arrow = document.getElementById("menu");
    if (!alreadyClick) {
      container.classList.add("expandible_class");
      arrow.classList.remove("rotate_down");
      arrow.classList.add("rotate_up");
      alreadyClick = true;
    } else {
      container.classList.remove("expandible_class");
      arrow.classList.add("rotate_down");
      arrow.classList.remove("rotate_up");
      alreadyClick = false;
    }
  }
  
  function addFunc() {
    //Add and delete row
    var table = document.getElementById("table_body");
    tableCount = document.getElementById("table_body").rows.length;
  
    //Check for Empty field
    var cellLength = document.getElementById("table_body").rows[0].cells.length;
    var x = document.getElementById("table_body").rows[tableCount - 1];
  
    if (!checkEmptyCell(cellLength - 1, x)) {
      console.log("failed");
      return;
    }
    document.getElementById("message").innerHTML = "";
  
    var row = table.insertRow(tableCount);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML =
      '<input class="education_level" type="text" id="education_level" name="education" value = "" placeholder="Education qualification">';
    cell2.innerHTML =
      '<input class="field" type="text" id="field" name="field" value="" placeholder="Field">';
    cell3.innerHTML =
      '<input class="year" type="number" min="1990" id="year" name="year" value="" placeholder="Year">';
    cell4.innerHTML =
      '<input class="marks" type="number" name="marks" id="marks" value="" placeholder="Marks Obtained">';
    cell5.innerHTML =
      '<div id="add_and_delete" class="add_and_delete"> <button onclick="addFunc()" type="button" class="add" id="add" name="add" value="+"> + </button> <button onclick="myDeleteFunction()" type="button" class="minus" id="minus" name="minus" value="-"> - </button> </div>';
  }
  
  function myDeleteFunction() {
    document.getElementById("table_body").deleteRow(tableCount);
    tableCount--;
  }
  
  function checkEmptyCell(length, row) {
    document.getElementById("validityMessage").innerHTML = "";
  
    for (var i = 0; i < length; i++) {
      var childList = row.cells[i].childNodes;
      var index = 0;
      if (childList.length > 1) index = 1;
  
      if (childList[index].value == "") {
        if (emptyInput != undefined) emptyInput.classList.remove("redBorder");
        emptyInput = childList[index];
        childList[index].classList.add("redBorder");
        emptyInput.select();
        emptyInput.scrollIntoView();
        document.getElementById("message").innerHTML =
          childList[index].placeholder + " is Incomplete";
        return false;
      }
      {
        if (childList[index].id == "year") {
          if (!/^[0-9]{4}$/.test(childList[index].value)) {
            emptyInput = childList[index];
            document.getElementById("message").innerHTML = "Enter Valid Year";
            return false;
          }
        }
        if (childList[index].id == "marks") {
          if (!/^[0-9]*$/.test(childList[index].value)) {
            emptyInput = childList[index];
            document.getElementById("message").innerHTML = "Enter Valid marks";
            return false;
          }
        }
      }
    }
    document.getElementById("message").innerHTML = "";
    return true;
  }
  
  document.addEventListener('mousedown', removeBorder);
  
  function removeBorder() {
    if (emptyInput != undefined) {
      emptyInput.classList.remove("redBorder");
    }
    document.getElementById("pwd_message").innerHTML = "";
    document.getElementById("message").innerHTML = "";
    document.getElementById("subect_error").innerHTML = "";
    document.getElementById("hobbies_error").innerHTML = "";
    document.getElementById("image_error").innerHTML = "";
    document.getElementById("date_error").innerHTML = "";
  }
  
  var myInput = document.getElementById("pwd");
  var letter = document.getElementById("letter");
  var capital = document.getElementById("capital");
  var number = document.getElementById("number");
  var length = document.getElementById("length");
  
  myInput.onfocus = function () {
    document.getElementById("validator").style.display = "block";
  };
  
  myInput.onblur = function () {
    document.getElementById("validator").style.display = "none";
  };
  
  myInput.onkeyup = validator;
  
  function validator() {
    var lowerCaseLetters = /[a-z]/g;
  
    if (myInput.value.match(lowerCaseLetters)) {
      letter.classList.remove("invalid");
      letter.classList.add("valid");
    } else {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
    }
  
    var upperCaseLetters = /[A-Z]/g;
    if (myInput.value.match(upperCaseLetters)) {
      capital.classList.remove("invalid");
      capital.classList.add("valid");
    } else {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
    }
  
    var numbers = /[0-9]/g;
    if (myInput.value.match(numbers)) {
      number.classList.remove("invalid");
      number.classList.add("valid");
    } else {
      number.classList.remove("valid");
      number.classList.add("invalid");
    }
  
    if (myInput.value.length >= 8) {
      length.classList.remove("invalid");
      length.classList.add("valid");
    } else {
      length.classList.remove("valid");
      length.classList.add("invalid");
    }
  }
  
  var confirm = document.getElementById("confirm_pwd");
  confirm.onkeyup = confirmPassword;
  function confirmPassword() {
    if (myInput.value.length != 0) {
      if (confirm.value.length <= myInput.value.length) {
        if (
          confirm.value[confirm.value.length - 1] !=
          myInput.value[confirm.value.length - 1]
        )
          document.getElementById("pwd_message").innerHTML =
            "confirm password is wrong";
        else {
          document.getElementById("pwd_message").innerHTML = "";
          return true;
        }
      } else
        document.getElementById("pwd_message").innerHTML =
          "confirm password is wrong";
    }
    return false;
  }
  
  var email = document.getElementById("email");
  email.onblur = validateEmail;
  
  function validateEmail() {
    if (email.value !="" && !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email.value)) {
      document.getElementById("error").innerHTML = "Enter valid Email";
      return false;
    } else document.getElementById("error").innerHTML = "";
    return true;
  }
  
  function fileValidation() {
    var fileInput = document.getElementById("myFile");
    var imagePara = document.getElementById("image_error");
  
    if (fileInput.value == "") {
      imagePara.innerHTML = "upload image file";
      return false;
    }
  
    var filePath = fileInput.value;
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    console.log(fileInput.files[0].size);
  
    if (!allowedExtensions.exec(filePath)) {
      imagePara.innerHTML = "wrong image format";
      return false;
    } else imagePara.innerHTML = "";
    var filesize = fileInput.files[0].size / 1024;
    if (filesize < 50 || filesize > 200) {
      alert("Incorrect file size");
      return false;
    }
    return true;
  }
  
  var date = document.getElementById("date_input");
  
  function validDate() {
    if (/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(date.value)) {
      document.getElementById("date_error").innerHTML = "";
      return true;
    } else {
      removeBorder();
      emptyInput = date;
      emptyInput.classList.add("redBorder");
      document.getElementById("date_error").innerHTML = "Enter Valid date";
      emptyInput.select();
      emptyInput.scrollIntoView();
    }
    return false;
  }
// });

