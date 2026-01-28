// Dynamic Clock and Greeting 

function timer_function() {

    var today = new Date();
    var time = today.toLocaleTimeString("en-US");
    document.getElementById("timer").innerText = time;

    setInterval(function () {
        var today = new Date();
        var time = today.toLocaleTimeString("en-US");
        document.getElementById("timer").innerText = time;

        var hours = today.getHours();

        if (hours >= 4 && hours < 12) {
            var greet = document.getElementById("greet_msg")
            greet.innerText = "Good Morning"
            greet.style.color = "orange"
            document.getElementById("greet_image").src = "media/gm.png"
        }
        else if (hours >= 12 && hours < 16) {
            var greet = document.getElementById("greet_msg")
            greet.innerText = "Good Afternoon"
            greet.style.color = "red"
            document.getElementById("greet_image").src = "media/ga.png"
        }
        else if (hours >= 16 && hours < 19) {
            var greet = document.getElementById("greet_msg")
            greet.innerText = "Good Evening"
            greet.style.color = "green"
            document.getElementById("greet_image").src = "media/ge.png"
        }
        else {
            var greet = document.getElementById("greet_msg")
            greet.innerText = "Good Night"
            greet.style.color = "blue"
            document.getElementById("greet_image").src = "media/gn.png"
        }
    }, 1000);
}

// Form Validation

function validation() {
    result = true;

    //Start User Name Validation
    var name = document.getElementById("uname").value;
    if (name == "") {
        result = false;
    }
    //End User Name Validation

    //Start Age Validation
    var age = document.getElementById("age").value;
    if (age == "") {
        result = false;
    }
    //End Age Validation

    //Start Password Validation
    var pass = document.getElementById("pass").value;
    if (pass == "") {
        result = false;
    }

     else {
    var EightChar   = /(?=.{8,})/;
    var UpperCase   = /(?=.*[A-Z])/;
    var LowerCase   = /(?=.*[a-z])/;
    var NumberCase  = /(?=.*[0-9])/;
    var SpecialCase = /(?=.*[!@#$%^&])/;

    if (!EightChar.test(pass))   result = false;
    if (!UpperCase.test(pass))   result = false;
    if (!LowerCase.test(pass))   result = false;
    if (!NumberCase.test(pass))  result = false;
    if (!SpecialCase.test(pass)) result = false;
}
    //End Password Validation

    //Start DOB Validation
    var dob = document.getElementById("dob").value;
    if (dob == "") {
        result = false
    }
    //End DOB Validation

    //Start Email Validation
    var email = document.getElementById("uemail").value;
    if (email == "") {
        result = false;
    }
    else{
    var patt = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (patt.test(email)) {
    } else {
        result = false
    }
    }
    //End Email Validation

    //Start TOB Validation
    var tob = document.getElementById("tob").value;
    if (tob == "") {
        result = false
    }
    //End TOB Validation

    //Start Mobile Number Validation
    var num = document.getElementById("num").value;
    if (num == "") {
        result = false;
    }
    else{
        if (num.length < 10) {
        result = false;
    }
    }
    //End Mobile Number Validation

    //Start Address Validation
    var add = document.getElementById("add").value;
    if (add == "") {
        result = false;
    }
    //End Address Validation

    //Start City Validation
    var city = document.getElementById("city").value;
    if (city == "") {
        result = false;
    }
    //End City Validation

    //Start Captcha validation
    var capt_check = document.getElementById("captchaInput").value;
    if (capt_check == "") {
        result = false;
    }
    var userInput = document.getElementById("captchaInput").value;
    if (userInput != captchaText) {
        result = false;
    }
    
    //End Captcha validation

    //Start Gender Validation
    var gender_result = false;
    var counter = document.getElementsByName("gender").length;
    var gender = document.getElementsByName("gender");
    for (i = 0; i < counter; i++) {
        if (gender[i].checked == true) {
            gender_result = true;

        }
    }
    if (gender_result == false) {
        result = false;
    }
    //End Gender Validation

    //Start Hobbies Validation
    var hobby_result = false;
    var counter2 = document.getElementsByName("hobby").length;
    var hobby = document.getElementsByName("hobby");
    var check_count = 0
    for (var i = 0; i < counter2; i++) {
        if (hobby[i].checked == true) {
            check_count++;
        }
    }
    if (check_count >= 2) {
        hobby_result = true;
    }
    else {
        result = false;
    }
    //End Hobbies Validation
    if (result == true) {
        document.getElementById("submit").disabled = false;
    } else {
        document.getElementById("submit").disabled = true;
    }
    
    return result;

}
// Real-Time Validation Functions 

 //Start Name Type Validation
function uname_check() {
    var name = document.getElementById("uname").value;
    document.getElementById("uname_error_msg").innerText = "Please Enter Name."
    if (name != "") {
        document.getElementById("uname_error_msg").innerText = ""
    }
    else {
        document.getElementById("uname_error_msg").innerText = "Please Enter Name."
    }
}
//End Name Type Validation

//Start Age Type Validation
function age_check() {

    var age = document.getElementById("age").value;
    if (age != "") {
        document.getElementById("age_error_msg").innerText = ""
    }
    else {
        document.getElementById("age_error_msg").innerText = "Please Enter Age."
    }
}
//End Age Type Validation

//Start Password Type Validation
function pass_check() {

    var pass = document.getElementById("pass").value;

    if (pass != "") {
        document.getElementById("pass_error_msg").innerText = ""
        var EightChar = new RegExp('(?=.{8,})');
        var UpperCase = new RegExp('(?=.*[A-Z])');
        var LowerCase = new RegExp('(?=.*[a-z])');
        var NumberCase = new RegExp('(?=.*[0-9])');
        var SpecialCase = new RegExp('(?=.*[!@#$%^&])');

        if (EightChar.test(pass)) {
            document.getElementById("eight_char").style.color = "green"
        }
        else {
            document.getElementById("eight_char").style.color = "red"
        }

        if (UpperCase.test(pass)) {
            document.getElementById("one_upper").style.color = "green"
        }
        else {
            document.getElementById("one_upper").style.color = "red"
        }

        if (LowerCase.test(pass)) {
            document.getElementById("one_lower").style.color = "green"
        }
        else {
            document.getElementById("one_lower").style.color = "red"
        }

        if (NumberCase.test(pass)) {
            document.getElementById("one_digit").style.color = "green"
        }
        else {
            document.getElementById("one_digit").style.color = "red"
        }

        if (SpecialCase.test(pass)) {
            document.getElementById("one_special").style.color = "green"
        }
        else {
            document.getElementById("one_special").style.color = "red"
        }

    }
    else {
        document.getElementById("pass_error_msg").innerText = "Please Enter Password.";
        document.getElementById("eight_char").style.color = "black"
        document.getElementById("one_upper").style.color = "black"
        document.getElementById("one_lower").style.color = "black"
        document.getElementById("one_digit").style.color = "black"
        document.getElementById("one_special").style.color = "black"

    }
}
//End Password Type Validation

//Start DOB Type Validation
function dob_check() {
    var dob = document.getElementById("dob").value;
    if (dob != "") {
        document.getElementById("dob_error_msg").innerText = ""
    }
    else {
        document.getElementById("dob_error_msg").innerText = "Please Enter Date of Birth."
    }
}
//End DOB Type Validation

//Start Email Type Validation
function email_check() {

    var uemail = document.getElementById("uemail").value;
    if (uemail != "") {
        document.getElementById("uemail_error_msg").innerText = ""
    }
    else {
        document.getElementById("uemail_error_msg").innerText = "Please Enter Email Id."
    }
}
//End Email Type Validation

//Start TOB Type Validation
function tob_check() {
    var tob = document.getElementById("tob").value;
    if (tob != "") {
        document.getElementById("tob_error_msg").innerText = ""
    }
    else {
        document.getElementById("tob_error_msg").innerText = "Please Enter Time of Birth."
    }
}
//End TOB Type Validation

//Start City Type Validation
function city_check() {
    var city = document.getElementById("city").value;
    if (city != "") {
        document.getElementById("city_error_msg").innerText = ""
    }
    else {
        document.getElementById("city_error_msg").innerText = "Please Enter City."
    }
}
//End City Type Validation

//Start Address Type Validation
function add_check() {
    var address = document.getElementById("add").value;
    if (address != "") {
        document.getElementById("add_error_msg").innerText = "Maximum 10 lines allowed"
    }
    else {
        document.getElementById("add_error_msg").innerText = "Please Enter Address."
    }
}
//End Address Type Validation

//Start Mobile Number Type Validation
function num_check() {
    var num = document.getElementById("num").value;
    var num_count = document.getElementById("num").value.length;
    if (num != "") {
        document.getElementById("num_error_msg").innerText = ""
        if (num_count > 10) {
            document.getElementById("num_error_msg").innerText = "Number cannot be more than 10 digits"
        }
        else if (num_count < 10) {
            document.getElementById("num_error_msg").innerText = "Number cannot be less than 10 digits"
        }
        else {
            document.getElementById("num_error_msg").innerHTML = "<span style='color:green;'>✅ Valid number</span>";
        }
    }
    else {
        document.getElementById("num_error_msg").innerText = "Please Enter Mobile Number."
    }
}
//End Mobile Number Type Validation

//Captcha Validation
function checkCaptcha() {
    var userInput = document.getElementById("captchaInput").value;
    var msg = document.getElementById("captcha_error_msg");
    if (userInput != "") {
        msg.innerText = ""
    }

    if (userInput === captchaText) {
        msg.innerText = "✅ Correct!";
        msg.style.color = "green";
    }
    else if(userInput==""){
        msg.innerText = "Please Input Captcha";
    }
    else{
        msg.innerText = "❌ Incorrect!";
        msg.style.color = "red";
    }
}
//Captcha Validation

//Start Gender Type Validation
function gender_check() {
    var count = document.getElementsByName("gender").length;
    var gender = document.getElementsByName("gender");
    for (var i = 0; i < count; i += 1) {
        if (gender[i].checked == true) {
            document.getElementById("gender_error_msg").innerText = ""
        }
    }
}
//End Gender Type Validation

//Start Hobby Type Validation
function hobby_check() {
    var hobby = document.getElementsByName("hobby");
    var check_count = 0
    for (var i = 0; i < hobby.length; i++) {
        if (hobby[i].checked) {
            check_count++;
        }
    }

    if (check_count >= 2) {
        document.getElementById("hobby_error_msg").innerText = ""
    }
    else if (check_count < 2 && check_count > 0) {
        document.getElementById("hobby_error_msg").innerText = "Please Select At Least Two Hobbies.";
    }
    else {
        document.getElementById("hobby_error_msg").innerText = "Please Select a Hobby.";
    }
}
//End Hobby Type Validation

// Password Show/Hide

function show() {
    var p = document.getElementById("pass");
    var s = document.getElementById("open_eye");
    var h = document.getElementById("close_eye");
    p.type = "text"
    s.style.display = "inline-flex"
    h.style.display = "none"
}
function hide() {
    var p = document.getElementById("pass");
    var s = document.getElementById("open_eye");
    var h = document.getElementById("close_eye");
    p.type = "password"
    s.style.display = "none"
    h.style.display = "inline-flex"
}

// CAPTCHA

var captchaText = "";

function generateCaptcha() {
    var canvas = document.getElementById("captchaCanvas");
    var ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz123456789";
    captchaText = "";

    for (var i = 0; i < 5; i++) {
        var randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
        captchaText += randomChar;
    }

    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw captcha text
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(captchaText, 40, 40);
}


function reloadCaptcha() {
    generateCaptcha();
    document.getElementById("captchaInput").value = "";
    document.getElementById("statusMessage").innerText = "";
}

// Input Filtering

function numberOnly() {
    var mobNumInput = document.getElementById("num");
    var AgeInput = document.getElementById("age");

    var currentVal = mobNumInput.value;
    var currentVal2 = AgeInput.value;
    var nonNumberRegex = /[^0-9]/g;

    if (nonNumberRegex.test(currentVal)) {
        mobNumInput.value = currentVal.replace(nonNumberRegex, '');
        if (mobNumInput.value === "") {
        document.getElementById("num_error_msg").innerText = "Please Enter Mobile Number"
        }
        
    }

    if (nonNumberRegex.test(currentVal2)) {
        AgeInput.value = currentVal2.replace(nonNumberRegex, '');
        if (AgeInput.value === "") {
        document.getElementById("age_error_msg").innerText = "Please Enter Age"
    }
    }
}

function textOnly() {
    var nameInput = document.getElementById("uname");
    var currentVal = nameInput.value;
    var nonTextRegex = /[^a-zA-Z\s]/g;

    if (nonTextRegex.test(currentVal)) {
        nameInput.value = currentVal.replace(nonTextRegex, '');
        if (nameInput.value === "") {
        document.getElementById("uname_error_msg").innerText = "Please Enter Name"
    }
    }
}

// Mobile Number Character Limit 

function MaxLength(e) {
    var num = document.getElementById("num").value.length;
    if (num >= 10) {
        return false
    }
    else {
        return true
    }
}

function AgeMaxLength(e) {
    var age = document.getElementById("age").value.length;
    if (age >= 3) {
        return false
    }
    else {
        return true
    }
}

// Countdown Timer

function timer() {
            var total_seconds = 300;

            var intervalId = setInterval(function () {

                var minutes = Math.floor(total_seconds / 60);
                var seconds = total_seconds % 60;

                var displayMinutes = minutes < 10 ? "0" + minutes : minutes;
                var displaySeconds = seconds < 10 ? "0" + seconds : seconds;

                document.getElementById("clock").innerText = displayMinutes + ":" + displaySeconds

                if (total_seconds <= 0) {
                    clearInterval(intervalId)
                    window.location.href = "sad.html";
                }

                total_seconds -= 1

            }, 1000);

        }

// Unsuccessful page Redirection to Form

function go_to_submit_page(){
            setTimeout(function (){
                window.location.href="index.html"
            },10000);
        }

// Unsuccessful page Countdown Timer

//Email Validation

function check_email_fn() {
    var em = document.getElementById("uemail").value;
    var patt = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (patt.test(em)) {
        document.getElementById("uemail_error_msg").innerText = "Correct Email Id";
        document.getElementById("uemail_error_msg").style.color = "green";
    } else {
        if(em==""){
        document.getElementById("uemail_error_msg").innerText = "Please Enter Email Id";
        }

        else{
        document.getElementById("uemail_error_msg").innerText = "Incorrect Email Id";
        document.getElementById("uemail_error_msg").style.color = "rgb(235, 51, 51)";
        }
    }
}

function limitLines() {
    var textarea = document.getElementById("add");
    var lineLimitMsg = document.getElementById("add_error_msg");
    var lineCount = (textarea.value.match(/\n/g) || []).length + 1;

    if (lineCount >= 10) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevents a new line from being added
            lineLimitMsg.style.display = "inline";
            lineLimitMsg.innerText = "Maximum 10 lines allowed"
        }
    } else {
        lineLimitMsg.style.display = "none";
    }
};

//Photo Validation

window.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.getElementById("p");
  const previewImg = document.getElementById("preview");
  const errorMsg = document.getElementById("p_error");

  fileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        errorMsg.textContent = "Please select a valid image file.";
        return;
      }

      const reader = new FileReader();
      reader.onload = function (e) {
        previewImg.src = e.target.result; // ✅ updates preview
      };
      reader.readAsDataURL(file);
    }
  });
});


// -----------------------------------------------------
// Rules page

function agree_check(){
    let proceed = document.getElementById("submit");
    let agree = document.getElementById("agree");
    if(agree.checked){
        proceed.disabled = false
    }

    else{
        proceed.disabled = true
    }
}

function submit(){
   const video = document.getElementById("introVideo");
  video.style.display = "block";   // show video
  video.play();                    // start playing

  // When video ends, go to game.html
  video.onended = function() {
    window.location.href = "start.html";
  };
}
