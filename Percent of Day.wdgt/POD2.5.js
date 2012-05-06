// This file was generated by Dashcode from Apple Inc.
// You may edit this file to customize your Dashboard widget.

//
// Function: load()
// Called by HTML body element's onload event when the widget is ready to start
//
function load()
{
    setupParts();
}

function createKey(key) {
	if (window.widget) {
        key = widget.identifier + "-" + key;
	}
	return key;
}


//
// Function: remove()
// Called when the widget has been removed from the Dashboard
//
function remove()
{
    // Stop any timers to prevent CPU usage
    // Remove any preferences as needed
     widget.setPreferenceForKey(null, createKey("start-ampm"));
	 widget.setPreferenceForKey(null, createKey("start-hour"));
	 widget.setPreferenceForKey(null, createKey("start-minute"));
	 widget.setPreferenceForKey(null, createKey("end-ampm"));
	 widget.setPreferenceForKey(null, createKey("end-hour"))
	 widget.setPreferenceForKey(null, createKey("end-minute"));
	 widget.setPreferenceForKey(null, createKey("color"));
	 widget.setPreferenceForKey(null, createKey("custom_color"));
	 
}

//
// Function: hide()
// Called when the widget has been hidden
//
function hide()
{
    // Stop any timers to prevent CPU usage
	all_go = 0;
}

//
// Function: show()
// Called when the widget has been shown
//
function show()
{
    // Restart any timers that were stopped on hide
	all_go = 1;
	update_values();
	
}

//
// Function: sync()
// Called when the widget has been synchronized with .Mac
//
function sync()
{
    // Retrieve any preference values that you need to be synchronized here
    // Use this for an instance key's value:
    // instancePreferenceValue = widget.preferenceForKey(null, createInstancePreferenceKey("your-key"));
    //
    // Or this for global key's value:
    // globalPreferenceValue = widget.preferenceForKey(null, "your-key");
}
all_go = 1;
Custom_Start_h = 0;
Custom_End_h = 23;
Custom_Start_m = 0;
Custom_End_m = 59;

function show_custom(){
	if (document.getElementById('color').value == "Custom")document.getElementById("custom_color").style.display = 'block';
	else document.getElementById("custom_color").style.display = 'none';
}

function update_values(){
	if (widget.preferenceForKey(createKey("start-ampm"))){
		var start_h = widget.preferenceForKey(createKey("start-hour"));
		var end_h = widget.preferenceForKey(createKey("end-hour"))
		if (widget.preferenceForKey(createKey("start-ampm")) == '1')Custom_Start_h = parseInt(start_h) + 12;
		else Custom_Start_h = widget.preferenceForKey(createKey("start-hour"));
		
		
		if (widget.preferenceForKey(createKey("end-ampm")) == '1')Custom_End_h = parseInt(end_h) + 12;
		else Custom_End_h = widget.preferenceForKey(createKey("end-hour"));
		
		Custom_Start_m = widget.preferenceForKey(createKey("start-minute"));
		Custom_End_m = widget.preferenceForKey(createKey("end-minute"));
		if (widget.preferenceForKey(createKey("color"))){
			document.getElementById("progress_bar").style.backgroundColor = widget.preferenceForKey(createKey("color"));
		}
	}
	setTimeout("update_progress_custom()",1000);
}

function get_total_of_day(per){
	var temp_amount;
	Stamp = new Date();
	Hours = Stamp.getHours();
	Mins = Stamp.getMinutes();
	Seconds = Stamp.getSeconds();
	Hours = Hours * 60 * 60;
	Mins = Mins * 60;
	temp_amount = Hours + Mins + Seconds;
	if (per == 1)return temp_amount / 86400;
	else return temp_amount;
}

function update_progress_custom(){
	var Amount = get_total_of_day(0); // How much of the day is already gone (in seconds)
	var calc_custom_Start_h = (Custom_Start_h * 60 * 60) + (Custom_Start_m * 60); // convert the start Hours suppiled to seconds
	var calc_custom_End_h = (Custom_End_h * 60 * 60) + (Custom_End_m * 60);	// convert the end Hours supplied to seconds
	var full_time = calc_custom_End_h - calc_custom_Start_h;	// get the difference of the hours.. 
	
	
	var the_text = document.getElementById('progress_box_text');
	
	if (Amount >= calc_custom_Start_h && Amount <= calc_custom_End_h){
		var Amount2 = ((Amount - calc_custom_Start_h) / full_time);
		var the_percent = Math.round(((Amount2) * 100) * 10) / 10;
		Amount2 = Amount2 * 380;
		the_text.innerHTML = the_percent + "%";
	}
	else {
		var Amount2 = 380;
		the_text.innerHTML = "Waiting for time to come.";
	};
	document.getElementById('progress_bar').style.width = Amount2 + "px";
	
	if (all_go == 1)setTimeout("update_progress_custom()",1000);
}


function set_prefs(){
	widget.setPreferenceForKey(document.getElementById("start-hour").value, createKey("start-hour"));
	widget.setPreferenceForKey(document.getElementById("start-minute").value, createKey("start-minute"));
	widget.setPreferenceForKey(document.getElementById("start-ampm").value, createKey("start-ampm"));
	
	widget.setPreferenceForKey(document.getElementById("end-hour").value, createKey("end-hour"));
	widget.setPreferenceForKey(document.getElementById("end-minute").value, createKey("end-minute"));
	widget.setPreferenceForKey(document.getElementById("end-ampm").value, createKey("end-ampm"));
	
	if (document.getElementById("color").value == "Custom"){
		 widget.setPreferenceForKey(document.getElementById("custom_color").value, createKey("color"));
         widget.setPreferenceForKey(true,createKey("custom_color"));
	}
	else {
		widget.setPreferenceForKey(document.getElementById("color").value, createKey("color"));
        widget.setPreferenceForKey(false,createKey("custom_color"));
	}
	
	update_values();
}

//
// Function: showBack(event)
// Called when the info button is clicked to show the back of the widget
//
// event: onClick event from the info button
//
function showBack(event)
{
    if (widget.preferenceForKey(createKey('start-ampm'))){
        document.getElementById("start-ampm").value = widget.preferenceForKey(createKey('start-ampm'));
        document.getElementById("start-hour").value = widget.preferenceForKey(createKey('start-hour'));
        document.getElementById("start-minute").value = widget.preferenceForKey(createKey('start-minute'));
        document.getElementById("end-ampm").value = widget.preferenceForKey(createKey('end-ampm'));
        document.getElementById("end-hour").value = widget.preferenceForKey(createKey('end-hour'));
        document.getElementById("end-minute").value = widget.preferenceForKey(createKey('end-minute'));
        if (widget.preferenceForKey(createKey("custom_color")) == true){
            document.getElementById("custom_color").value = widget.preferenceForKey(createKey("color"));
            document.getElementById("custom_color").style.display = "block";
            document.getElementById("color").value = "Custom";
        }
        else {
            document.getElementById("custom_color").value = "";
            document.getElementById("custom_color").style.display = "none";
            document.getElementById("color").value = widget.preferenceForKey(createKey('color'));
        }
    }
    var front = document.getElementById("front");
    var back = document.getElementById("back");

    if (window.widget) {
        widget.prepareForTransition("ToBack");
    }

    front.style.display = "none";
    back.style.display = "block";

    if (window.widget) {
        setTimeout('widget.performTransition();', 0);
    }
}

//
// Function: showFront(event)
// Called when the done button is clicked from the back of the widget
//
// event: onClick event from the done button
//
function showFront(event)
{
    var front = document.getElementById("front");
    var back = document.getElementById("back");

    if (window.widget) {
        widget.prepareForTransition("ToFront");
    }

    front.style.display="block";
    back.style.display="none";

    if (window.widget) {
        setTimeout('widget.performTransition();', 0);
		set_prefs();
    }
	
}


if (window.widget) {
    widget.onremove = remove;
    widget.onhide = hide;
    widget.onshow = show;
    widget.onsync = sync;
}
