var list_textOf_questions = new Array("Good morning.", "Good evening.", "Good night.", "Thank you very much.", "You're welcome.", "Let's go.", "How are you?", "What's up?", "What's going on?", "I'm fine.");

var list_textOf_choice_1 = new Array("ma ko-re?", "lai-la tov.", "a-ni me-ar-tsot ha-brit.", "me-ei-fo a-ta?", "ma shlom-kha?", "a-ni me-ar-tsot ha-brit.", "a-ni me-ar-tsot ha-brit.", "ei-fo a-ta gar?", "ma shim-kha?", "al lo da-var.");
var list_textOf_choice_2 = new Array("bo-ker tov.", "me-ei-fo a-ta?", "me-ei-fo a-ta?", "me-ei-fo a-ta?", "a-ni lo me-vin.", "bo ne-lekh.", "ma shlom-kha?", "a-ta mu-khan?", "a-ni o-ved b…", "a-ni be-se-der.");
var list_textOf_choice_3 = new Array("a-ni me-ar-tsot ha-brit.", "e-rev tov.", "a-ni me-ar-tsot ha-brit.", "to-da ra-ba.", "al lo da-var.", "a-ni tsa-rikh la-le-khet akh-shav.", "ein la-nu ye-la-dim.", "ei-fo a-ta gar?", "a-ni me-ar-tsot ha-brit.", "a-ni me-ar-tsot ha-brit.");
var list_textOf_choice_4 = new Array("a-ta mu-khan?", "ben ka-ma a-ta?", "lai-la tov.", "a-ni lo me-vin.", "a-ni lo me-vin.", "ben ka-ma a-ta?", "a-ni me-ar-tsot ha-brit.", "ma nish-ma?", "ma ko-re?", "a-ni gar be-tel a-viv.");
//var list_answer_key = new Array(2, 3, 4, 3, 3, 2, 2, 4, 4, 2, 3, 3, 3, 2, 2,  1, 2, 2, 2, 2, 1, 2, 3, 2, 2, 3, 2, 2, 3, 3);
var list_answer_key = new Array(2, 3, 4, 3, 3, 2, 2, 4, 4, 2);


var list_numberOf_TimesShown = new Array(0,0,0,0,0,0,0,0,0,0);
var list_numberOf_CorrectAttempts = new Array(0,0,0,0,0,0,0,0,0,0);
var list_numberOf_WrongAttempts = new Array(0,0,0,0,0,0,0,0,0,0);
var list_numberOf_ConsecutiveCorrectAttempts = new Array(0,0,0,0,0,0,0,0,0,0);
var list_masteryOf_questions = new Array(0,0,0,0,0,0,0,0,0,0);
var list_numberOfSleepOns = new Array(0,0,0,0,0,0,0,0,0,0);
var list_paramOf_currentPriority = new Array(0,0,0,0,0,0,0,0,0,0);

// DICTIONARY: -1: Not yet unlocked - 1: Unlocked and currently learning - 2: Unlocked and Mastered
var list_statusOf_questions = new Array(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1);

//
var temp_altered_list_numberOfSleepOns = new Array();


var list_textOf_choice_adjusted_1 = new Array();
var list_textOf_choice_adjusted_2 = new Array();
var list_textOf_choice_adjusted_3 = new Array();
var list_textOf_choice_adjusted_4 = new Array();



function func_copyList_emptyA_fromB(A,B){
  for (var i = 0; i < B.length; i++) {
    A.push(B[i]);
  }
}

function func_showStatus(){
  var temp_element = document.getElementById("show_status");
  temp_element.innerHTML = list_textOf_questions +"<br><br>" + list_numberOf_TimesShown + "list_numberOf_TimesShown:" +"<br>"+ list_numberOf_CorrectAttempts+ "list_numberOf_CorrectAttempts"   +"<br>"+ list_numberOf_WrongAttempts + "list_numberOf_WrongAttempts"   +"<br>"+ list_numberOf_ConsecutiveCorrectAttempts + "list_numberOf_ConsecutiveCorrectAttempts"   +"<br>"+ list_numberOfSleepOns + "list_numberOfSleepOns"  +"<br>"+ list_paramOf_currentPriority + "list_paramOf_currentPriority"  +"<br>"+ list_statusOf_questions + "list_statusOf_questions" ;
}

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }

function func_emptyLocalStorage(){
  localStorage.removeItem("list_statusOf_questions");
}
function func_store_data_appropriately(){

  if (typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
    alert("storage success 1");
    localStorage.setItem("list_statusOf_questions", list_statusOf_questions);
    alert("storage success 2");
    localStorage.list_statusOf_questions = list_statusOf_questions;
    alert("storage success 3");

  }
  else {
    // Sorry! No Web Storage support..
    alert("Sorry! No Web Storage support..");
  }
}


//////////////////////
function func_set_item_texts(indexOf_questionToShow) {
  global_indexOf_item_display = global_indexOf_item_display + 1;
  document.getElementById("element_id_question").innerHTML = list_textOf_questions[indexOf_questionToShow];
  document.getElementById("element_id_choice_1").innerHTML = list_textOf_choice_1[indexOf_questionToShow];
  document.getElementById("element_id_choice_2").innerHTML = list_textOf_choice_2[indexOf_questionToShow];
  document.getElementById("element_id_choice_3").innerHTML = list_textOf_choice_3[indexOf_questionToShow];
  document.getElementById("element_id_choice_4").innerHTML = list_textOf_choice_4[indexOf_questionToShow];
}


function func_getRandomInt_inclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    var returned_random = Math.floor(Math.random() * (max - min + 1)) + min;
    return returned_random;
}


// function to return the indices
function func_getAllIndexes(arr, val) {
    var indexes = [];
    var i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}

// Highlights up to 2 choices with special colors, besides the default color. NOTE: choice 2 superceeds choice 1 (overwrites it)
function func_highlight_choice(index_of_choice_to_highlight_1, color_1, index_of_choice_to_highlight_2, color_2, default_color){
  for (var i = 0; i < 4; i++) {
    var j = i+1;
    var temp_elementOf_selected_choice = document.getElementById("element_id_choice_" + j);
    if (i == index_of_choice_to_highlight_1) {
      temp_elementOf_selected_choice.style.backgroundColor = color_1;
    }
    else {
      temp_elementOf_selected_choice.style.backgroundColor = default_color;
    }
    // If item #2 is the same as item #1, the color of item #2 dominates
    if (i == index_of_choice_to_highlight_2) {
      temp_elementOf_selected_choice.style.backgroundColor = color_2;
    }
  }
}

function func_select_choice(indexOf_selected_choice){
  alert("selected choice index: " + indexOf_selected_choice);
  func_set_control_buttons(2);
  global_indexOf_currently_selected_choice = indexOf_selected_choice;
  func_highlight_choice(indexOf_selected_choice, "yellow",-1,"black","blue");
}

// DICTIONARY: the_described_index: 1(no ans. yet, both disabled) - 2(ans. selected, submit enabled) - 3(ans. submitted, both enabled)
function func_set_control_buttons(the_described_index){
  if (the_described_index == 1) {
    document.getElementById("element_id_submit").disabled = true;
    document.getElementById("element_id_next").disabled = true;
    document.getElementById("element_id_choice_1").disabled = false;
    document.getElementById("element_id_choice_2").disabled = false;
    document.getElementById("element_id_choice_3").disabled = false;
    document.getElementById("element_id_choice_4").disabled = false;
  }
  else if (the_described_index == 2) {
    document.getElementById("element_id_submit").disabled = false;
    document.getElementById("element_id_next").disabled = true;
    document.getElementById("element_id_choice_1").disabled = false;
    document.getElementById("element_id_choice_2").disabled = false;
    document.getElementById("element_id_choice_3").disabled = false;
    document.getElementById("element_id_choice_4").disabled = false;
  }
  else if (the_described_index == 3) {
    document.getElementById("element_id_submit").disabled = true;
    document.getElementById("element_id_next").disabled = false;
    document.getElementById("element_id_choice_1").disabled = true;
    document.getElementById("element_id_choice_2").disabled = true;
    document.getElementById("element_id_choice_3").disabled = true;
    document.getElementById("element_id_choice_4").disabled = true;
  }
}

// MANUAL Variables:
var MANUAL_numberOf_concurrentItems = 3;
var MANUAL_mastery_threshold = 3; // An item must surpass that value (at least 4) to pass threshold

var global_indexOf_currently_showing_question = 0;
var global_indexOf_currently_selected_choice = 0;
var global_indexOf_item_display = 0;

////////////////////////////

function func_prepare_page_onLoad(){
  func_set_control_buttons(1);
  // func_rearrange_orderOf_questionsAndFollowers_randomly(); //
  func_set_item_texts(global_indexOf_currently_showing_question);
  func_adjust_statusOf_concurrentItems(true);
  // Retrieves the data of statuses of questions ONLY IF the key exists
  // The case where the key (list_statusOf_questions) is not yet defined - Probably, first-time usage of the app

  if (localStorage.getItem("list_statusOf_questions") === null) {

    //...
  }
  else {
    list_statusOf_questions = localStorage.list_statusOf_questions; // retrieves data of statuses of items

  }

  func_showStatus();
  func_rearrange_choicesElements_randomly();
  func_highlight_choice(-1,"black",-1,"black","blue"); // This must come after func_rearrange_choicesElements_randomly()

}

function func_submit_onClick(){			
  func_highlight_choice(global_indexOf_currently_selected_choice, "red", list_answer_key[global_indexOf_currently_showing_question]-1, "green", "blue");
  func_set_control_buttons(3);
  func_grade_currentQuestion(global_indexOf_currently_showing_question);

  func_adjust_statusOf_concurrentItems(false);
  func_store_data_appropriately();
  // func_rearrange_orderOf_questionsAndFollowers_randomly();//
  func_elect_indexOf_nextQuestion();
  func_showStatus();
}

function func_next_onClick(){
  func_set_control_buttons(1);
  func_set_item_texts(global_indexOf_currently_showing_question);	
  func_rearrange_choicesElements_randomly();
  func_highlight_choice(-1,"blue",-1,"blue","blue"); // This must come after func_rearrange_choicesElements_randomly()

}

////////////////////////////

function func_adjust_statusOf_concurrentItems(is_initial){
  // The case when this IS the initial call
  if(is_initial){
    for (var i = 0; i < MANUAL_numberOf_concurrentItems; i++) {
      list_statusOf_questions[i] = 1;
    }
  }

  // The case when this is not the initial call
  else {
    // Find any item whose mastery value exceeded the mastery threshold and change its status to 2 (mastered)
    for (var i = 0; i < list_masteryOf_questions.length; i++) {
      if (list_masteryOf_questions[i] > MANUAL_mastery_threshold){
        list_statusOf_questions[i] = 2;
      }
    }

    // Find (count), which is the number of currently active items (having value of 1)
    var count = 0;
    for(var i = 0; i < list_statusOf_questions.length; i++){
        if(list_statusOf_questions[i] == 1){
            count++;
        }
    }

    // If (count) is less than the targeted number, add the first locked item and unlock it, works even at the end!
    var temp_m = MANUAL_numberOf_concurrentItems - count;

    if (temp_m > 0){ // Meaning that the current number of active items is less than the target
      // add items
      for (var i = 0; i < list_statusOf_questions.length; i++) {
        if (list_statusOf_questions[i] == -1){
          list_statusOf_questions[i] = 1;
          //
          break;
        }
      }
    }
    else if (temp_m == 0){
      // Do nothing
    }
    else if (temp_m < 0 ){
      // Do nothing...
    }
    else {
      alert("error_code_1003");
    }
    /* Deprecated Simple Version of the above code block
    if (count < MANUAL_numberOf_concurrentItems){
      for (var i = 0; i < list_statusOf_questions.length; i++) {
        if (list_statusOf_questions[i] == -1){
          list_statusOf_questions[i] = 1;
          break;
        }
      }
    }
    */
  }
}

function func_grade_currentQuestion(ind_of_curr_question) {
  var j = global_indexOf_currently_selected_choice + 1;
  if (j == list_answer_key[ind_of_curr_question]) {
    func_translate_answer_into_lists(ind_of_curr_question, true);
  }
  else {
    func_translate_answer_into_lists(ind_of_curr_question, false);
  }
}

function func_translate_answer_into_lists(index_of_current_question, correctness_boolean){
  alert("This was question #"+index_of_current_question+", and your answer was: "+correctness_boolean+", The correct answer is the " + list_answer_key[index_of_current_question]+"th");

  // Handle the list of (Number of Times Shown)
  list_numberOf_TimesShown[index_of_current_question] = list_numberOf_TimesShown[index_of_current_question] + 1;

  // Handle the list of (SleepOns)
  for (var i = 0; i < list_numberOfSleepOns.length; i++) {
    if (i == index_of_current_question){
      list_numberOfSleepOns[i] = 0;
    }
    else {
      list_numberOfSleepOns[i] = list_numberOfSleepOns[i] + 1;
    }
  }

  // Handle the lists of (Correct Attempts), (Wrong Attempts) & (Consecutive Correct Attempts)
  if (correctness_boolean) {
    list_numberOf_CorrectAttempts[index_of_current_question] = list_numberOf_CorrectAttempts[index_of_current_question] + 1;
    list_numberOf_ConsecutiveCorrectAttempts[index_of_current_question] = list_numberOf_ConsecutiveCorrectAttempts[index_of_current_question] + 1;
  }
  else {
    list_numberOf_WrongAttempts[index_of_current_question] = list_numberOf_WrongAttempts[index_of_current_question] + 1;
    list_numberOf_ConsecutiveCorrectAttempts[index_of_current_question] = 0;

    // In the case where it happened that this was a mastered item and was answered wrongly, set item's status to -1 (not 1 to make code easier)

    // HERE_REVISE
    if(list_statusOf_questions[index_of_current_question] > 1){
      list_statusOf_questions[index_of_current_question] = -1;
    }
  }

  // Handle the list of (Mastery Level)
  // HERE_REVISE
  list_masteryOf_questions[index_of_current_question] = list_numberOf_ConsecutiveCorrectAttempts[index_of_current_question];

  // Handle the special cases of no wrong attempts at all
  if (list_numberOf_TimesShown[index_of_current_question] == list_numberOf_CorrectAttempts[index_of_current_question]){
    list_statusOf_questions[index_of_current_question] = 2;
  }

}

function func_elect_indexOf_nextQuestion() {
  // New Algorithm:
  alert("3-43");

  //(a.1)
  // Check that there is at least one item whose status is 1 (active):

  /*
  var temp_isThere_atLeast_oneItemOf_statusOne = false;
  for (var i = 0; i < list_statusOf_questions.length; i++) {
    if (list_statusOf_questions[i] == 1) {
      temp_isThere_atLeast_oneItemOf_statusOne = true;
      break;
    }
    else {
      temp_isThere_atLeast_oneItemOf_statusOne = false;
    }
  }
  */

  // if there is at least one item of status 1 (temp_isThere_atLeast_oneItemOf_statusOne = true), apply the algorithm only on those with status 1:

  alert("3-44");

  // Simply copying by value since the (.. = ...) copied by reference in javascript
  var temp_altered_list_numberOfSleepOns = [];
  for (var i = 0; i < list_numberOfSleepOns.length; i++) {
    if (list_statusOf_questions[i] !== 1){

      // Revise that method to remove items from a list
      temp_altered_list_numberOfSleepOns.push(-2);
    }
    else {
      temp_altered_list_numberOfSleepOns.push(list_numberOfSleepOns[i]);

    }
  }

/////////////
  alert("3-45:<br>"+temp_altered_list_numberOfSleepOns+" --- alteredSleepPOns<br>"+list_numberOfSleepOns+" --- SleepOns");

  //(A)
  // Find the maximum value of the list of SleepOns
  var temp_valueOf_MaxOf_SleepOnsList = Math.max.apply(Math, temp_altered_list_numberOfSleepOns);

  //(B)
  // Find a list of the indices of the maxima of the Sleep Ons list
  var temp_list_indexesOf_MaxOf_SleepOnsList = func_getAllIndexes(temp_altered_list_numberOfSleepOns, temp_valueOf_MaxOf_SleepOnsList);
  alert("3-46");

  alert("This is the list of the indexes of the maximum SleepOns: "+temp_list_indexesOf_MaxOf_SleepOnsList);

  if (temp_list_indexesOf_MaxOf_SleepOnsList.length > 1){
    // Continue
    var temp_list_valuesOf_corresponding_ConsCorrects = new Array;
    temp_list_valuesOf_corresponding_ConsCorrects = [];
    alert("3-47");

    var temp_list_indexesOf_MinOf_corresponding_ConsCorrects = new Array;
    //(C)
    // Construct a list of the items in Consecutive Correct List that correspond to the maxima of Sleep Ons
    for (var i = 0; i < temp_list_indexesOf_MaxOf_SleepOnsList.length; i++) {
      temp_list_valuesOf_corresponding_ConsCorrects.push(list_numberOf_ConsecutiveCorrectAttempts[temp_list_indexesOf_MaxOf_SleepOnsList[i]]);
    }
    alert("3-48");

    //(D)
    // Find the minimum of the constructed list
    var temp_valueOf_MinOf_CorrespondingConsCorrectsList = Math.min.apply(Math, temp_list_valuesOf_corresponding_ConsCorrects);
    alert("3-48-"+temp_list_valuesOf_corresponding_ConsCorrects)
    //(E)
    // Find the indexes of the minima of the corresponding ConsCorrects List
    temp_list_indexesOf_MinOf_corresponding_ConsCorrects = func_getAllIndexes(temp_list_valuesOf_corresponding_ConsCorrects, temp_valueOf_MinOf_CorrespondingConsCorrectsList);
    //
    var temp_k = temp_list_indexesOf_MinOf_corresponding_ConsCorrects.length -1;
    alert("3-49");

    if (temp_list_indexesOf_MinOf_corresponding_ConsCorrects.length > 1){
      // Continue
      // for now will the index will just be chosen randomly
      global_indexOf_currently_showing_question = temp_list_indexesOf_MaxOf_SleepOnsList[temp_list_indexesOf_MinOf_corresponding_ConsCorrects[func_getRandomInt_inclusive(0,temp_k)]];
      alert("3-50");
    }
    else if (temp_list_indexesOf_MinOf_corresponding_ConsCorrects == 1) {
      // (B)[(E)[0]]
      global_indexOf_currently_showing_question = temp_list_indexesOf_MaxOf_SleepOnsList[temp_list_indexesOf_MinOf_corresponding_ConsCorrects[0]];
      alert("3-51");

    }
    else {
      alert("error_code_1002");
    }
  }
  else if (temp_list_indexesOf_MaxOf_SleepOnsList.length == 1){
    global_indexOf_currently_showing_question = temp_list_indexesOf_MaxOf_SleepOnsList[0];
  }
  else {
    alert("error_code_1001");
  }
}


var list_textOf_questions_rearranged = new Array();
var list_textOf_choice_1_rearranged = new Array();
var list_textOf_choice_2_rearranged = new Array();
var list_textOf_choice_3_rearranged = new Array();
var list_textOf_choice_4_rearranged = new Array();
var list_answer_key_rearranged = new Array();

var list_statusOf_questions_rearranged = new Array();

var list_numberOf_TimesShown_rearranged = new Array();
var list_numberOf_CorrectAttempts_rearranged = new Array();
var list_numberOf_WrongAttempts_rearranged = new Array();

var list_numberOfSleepOns_rearranged = new Array();

var list_numberOf_ConsecutiveCorrectAttempts_rearranged = new Array();
var list_masteryOf_questions_rearranged = new Array();

// var list_paramOf_currentPriority_rearranged = new Array();


func_copyList_emptyA_fromB(list_textOf_questions_rearranged,list_textOf_questions);
func_copyList_emptyA_fromB(list_textOf_choice_1_rearranged,list_textOf_choice_1);
func_copyList_emptyA_fromB(list_textOf_choice_2_rearranged,list_textOf_choice_2);
func_copyList_emptyA_fromB(list_textOf_choice_3_rearranged,list_textOf_choice_3);
func_copyList_emptyA_fromB(list_textOf_choice_4_rearranged,list_textOf_choice_4);
func_copyList_emptyA_fromB(list_answer_key_rearranged,list_answer_key);
func_copyList_emptyA_fromB(list_statusOf_questions_rearranged,list_statusOf_questions);
func_copyList_emptyA_fromB(list_numberOf_TimesShown_rearranged,list_numberOf_TimesShown);
func_copyList_emptyA_fromB(list_numberOf_CorrectAttempts_rearranged,list_numberOf_CorrectAttempts);
func_copyList_emptyA_fromB(list_numberOf_WrongAttempts_rearranged,list_numberOf_WrongAttempts);
func_copyList_emptyA_fromB(list_numberOfSleepOns_rearranged,list_numberOfSleepOns);
func_copyList_emptyA_fromB(list_numberOf_ConsecutiveCorrectAttempts_rearranged,list_numberOf_ConsecutiveCorrectAttempts);
func_copyList_emptyA_fromB(list_masteryOf_questions_rearranged,list_masteryOf_questions);
// func_copyList_emptyA_fromB(list_paramOf_currentPriority_rearranged,list_paramOf_currentPriority);




function func_rearrange_orderOf_questionsAndFollowers_randomly(){
  // NOT EASY AT ALL

  // Generate a list of the same length as the question set and simply consists of 0,1,2,3...
  var temp_list_allPossibleIndexes = new Array();
  var temp_list_rearrangedIndexes = new Array();

  for (var i = 0; i < list_textOf_questions.length; i++) {
    temp_list_allPossibleIndexes.push(i);
    temp_list_rearrangedIndexes.push(i);
  }

  // Not used in our algorithm but might be useful later
  var temp_currentIndexBeingAdded = -1;

  for (var i = 0; i < temp_list_allPossibleIndexes.length; i++) {
    temp_currentIndexBeingAdded = temp_list_allPossibleIndexes[Math.floor(Math.random()*temp_list_allPossibleIndexes.length)];

    temp_list_rearrangedIndexes[i] = temp_currentIndexBeingAdded;
    temp_list_allPossibleIndexes.splice(temp_list_allPossibleIndexes.indexOf(temp_currentIndexBeingAdded),1);

    // Make the new rearranged lists
    list_textOf_questions_rearranged[i] = list_textOf_questions[temp_currentIndexBeingAdded];
    list_textOf_choice_1_rearranged[i] = list_textOf_choice_1[temp_currentIndexBeingAdded];
    list_textOf_choice_2_rearranged[i] = list_textOf_choice_2[temp_currentIndexBeingAdded];
    list_textOf_choice_3_rearranged[i] = list_textOf_choice_3[temp_currentIndexBeingAdded];
    list_textOf_choice_4_rearranged[i] = list_textOf_choice_4[temp_currentIndexBeingAdded];
    list_answer_key_rearranged[i] = list_answer_key[temp_currentIndexBeingAdded];

    list_statusOf_questions_rearranged[i] = list_statusOf_questions[temp_currentIndexBeingAdded];

    list_numberOf_TimesShown_rearranged[i] = list_numberOf_TimesShown[temp_currentIndexBeingAdded];
    list_numberOf_CorrectAttempts_rearranged[i] = list_numberOf_CorrectAttempts[temp_currentIndexBeingAdded];
    list_numberOf_WrongAttempts_rearranged[i] = list_numberOf_WrongAttempts[temp_currentIndexBeingAdded];

    list_numberOfSleepOns_rearranged[i] = list_numberOfSleepOns[temp_currentIndexBeingAdded];

    list_numberOf_ConsecutiveCorrectAttempts_rearranged[i] = list_numberOf_ConsecutiveCorrectAttempts[temp_currentIndexBeingAdded];
    list_masteryOf_questions_rearranged[i] = list_masteryOf_questions[temp_currentIndexBeingAdded];

  //	list_paramOf_currentPriority_rearranged[i] = list_paramOf_currentPriority[temp_currentIndexBeingAdded];
  }


    //
    list_textOf_questions = list_textOf_questions_rearranged;
    list_textOf_choice_1 = list_textOf_choice_1_rearranged;
    list_textOf_choice_2 = list_textOf_choice_2_rearranged;
    list_textOf_choice_3 = list_textOf_choice_3_rearranged;
    list_textOf_choice_4 = list_textOf_choice_4_rearranged;
    list_statusOf_questions = list_statusOf_questions_rearranged;
    list_answer_key = list_answer_key_rearranged;

    list_numberOf_TimesShown = list_numberOf_TimesShown_rearranged;
    list_numberOf_CorrectAttempts = list_numberOf_CorrectAttempts_rearranged;
    list_numberOf_WrongAttempts = list_numberOf_WrongAttempts_rearranged;

    list_numberOfSleepOns = list_numberOfSleepOns_rearranged;

    list_numberOf_ConsecutiveCorrectAttempts = list_numberOf_ConsecutiveCorrectAttempts_rearranged;
    list_masteryOf_questions = list_masteryOf_questions_rearranged[i];

  //	list_paramOf_currentPriority = list_paramOf_currentPriority_rearranged[i];


/*

*/
}


function func_rearrange_choicesElements_randomly(){
  var element_div_container_of_choices = document.getElementById("element_id_div_container_of_choices");
  var temp_list_allPossibleIndexes = new Array(0,1,2,3);
  var temp_list_rearrangedIndexes = new Array(0,1,2,3)

  var temp_currentIndexBeingAdded = -1;


  for (var i = 0; i < 4; i++) {
    temp_currentIndexBeingAdded = temp_list_allPossibleIndexes[Math.floor(Math.random()*temp_list_allPossibleIndexes.length)];


    temp_list_rearrangedIndexes[i] = temp_currentIndexBeingAdded;

    temp_list_allPossibleIndexes.splice(temp_list_allPossibleIndexes.indexOf(temp_currentIndexBeingAdded),1);
  }

  alert(temp_list_rearrangedIndexes);
  var temp_list_rearrangedIndexes_incremented = new Array();

  for (var i = 0; i < temp_list_rearrangedIndexes.length; i++) {
    temp_list_rearrangedIndexes_incremented.push(temp_list_rearrangedIndexes[i] + 1);
  }

  //element_div_container_of_choices.innerHTML = 'sasas"sas"a';

  alert("0013: "+temp_list_rearrangedIndexes+"  THEN: "+temp_list_rearrangedIndexes_incremented);

/*
  var temp_library_textOf_choices = new Array(list_textOf_choice_1, list_textOf_choice_2, list_textOf_choice_3, list_textOf_choice_4);

  var list_textOf_choice_adjusted_1 = list_textOf_choice_1.slice();
  var list_textOf_choice_adjusted_2 = list_textOf_choice_2.slice();
  var list_textOf_choice_adjusted_3 = list_textOf_choice_3.slice();
  var list_textOf_choice_adjusted_4 = list_textOf_choice_4.slice();

  for (var i = 0; i < temp_library_textOf_choices.length; i++) {
    if (temp_list_rearrangedIndexes[0] = i) {
      list_textOf_choice_adjusted_1 = temp_library_textOf_choices[i].slice();
    }
  }
  for (var i = 0; i < temp_library_textOf_choices.length; i++) {
    if (temp_list_rearrangedIndexes[1] = i) {
      list_textOf_choice_adjusted_2 = temp_library_textOf_choices[i].slice();
    }
  }
  for (var i = 0; i < temp_library_textOf_choices.length; i++) {
    if (temp_list_rearrangedIndexes[2] = i) {
      list_textOf_choice_adjusted_3 = temp_library_textOf_choices[i].slice();
    }
  }
  for (var i = 0; i < temp_library_textOf_choices.length; i++) {
    if (temp_list_rearrangedIndexes[3] = i) {
      list_textOf_choice_adjusted_4 = temp_library_textOf_choices[i].slice();
    }
  }
*/



  var list_textOf_choice_adjusted_1 = [];
  var list_textOf_choice_adjusted_2 = [];
  var list_textOf_choice_adjusted_3 = [];
  var list_textOf_choice_adjusted_4 = [];

  func_copyList_emptyA_fromB(list_textOf_choice_adjusted_1, list_textOf_choice_1);
  func_copyList_emptyA_fromB(list_textOf_choice_adjusted_2, list_textOf_choice_2)
  func_copyList_emptyA_fromB(list_textOf_choice_adjusted_3, list_textOf_choice_3)
  func_copyList_emptyA_fromB(list_textOf_choice_adjusted_4, list_textOf_choice_4)


  if (temp_list_rearrangedIndexes[0] == 0) {
    list_textOf_choice_adjusted_1 = list_textOf_choice_1.slice();
  }
  else if (temp_list_rearrangedIndexes[0] == 1) {
    list_textOf_choice_adjusted_1 = list_textOf_choice_2.slice();

  }
  else if (temp_list_rearrangedIndexes[0] == 2) {
    list_textOf_choice_adjusted_1 = list_textOf_choice_3.slice();

  }
  else if (temp_list_rearrangedIndexes[0] == 3) {
    list_textOf_choice_adjusted_1 = list_textOf_choice_4.slice();

  }

////
  if (temp_list_rearrangedIndexes[1] == 0) {
    list_textOf_choice_adjusted_2 = list_textOf_choice_1.slice();
  }
  else if (temp_list_rearrangedIndexes[1] == 1) {
    list_textOf_choice_adjusted_2 = list_textOf_choice_2.slice();

  }
  else if (temp_list_rearrangedIndexes[1] == 2) {
    list_textOf_choice_adjusted_2 = list_textOf_choice_3.slice();

  }
  else if (temp_list_rearrangedIndexes[1] == 3) {
    list_textOf_choice_adjusted_2 = list_textOf_choice_4.slice();

  }

////

  if (temp_list_rearrangedIndexes[2] == 0) {
    list_textOf_choice_adjusted_3 = list_textOf_choice_1.slice();
  }
  else if (temp_list_rearrangedIndexes[2] == 1) {
    list_textOf_choice_adjusted_3 = list_textOf_choice_2.slice();

  }
  else if (temp_list_rearrangedIndexes[2] == 2) {
    list_textOf_choice_adjusted_3 = list_textOf_choice_3.slice();

  }
  else if (temp_list_rearrangedIndexes[2] == 3) {
    list_textOf_choice_adjusted_3 = list_textOf_choice_4.slice();

  }

////

  if (temp_list_rearrangedIndexes[3] == 0) {
    list_textOf_choice_adjusted_4 = list_textOf_choice_1.slice();
  }
  else if (temp_list_rearrangedIndexes[3] == 1) {
    list_textOf_choice_adjusted_4 = list_textOf_choice_2.slice();

  }
  else if (temp_list_rearrangedIndexes[3] == 2) {
    list_textOf_choice_adjusted_4 = list_textOf_choice_3.slice();

  }
  else if (temp_list_rearrangedIndexes[3] == 3) {
    list_textOf_choice_adjusted_4 = list_textOf_choice_4.slice();

  }



  element_div_container_of_choices.innerHTML = '<button id="element_id_choice_'+
  temp_list_rearrangedIndexes_incremented[0]+
  '" class="element_class_answer_choice" onclick="func_select_choice('+
  temp_list_rearrangedIndexes[0]+
  ')">'+list_textOf_choice_adjusted_1[global_indexOf_currently_showing_question]+'</button><button id="element_id_choice_'+
  temp_list_rearrangedIndexes_incremented[1]+
  '" class="element_class_answer_choice" onclick="func_select_choice('+
  temp_list_rearrangedIndexes[1]+
  ')">'+list_textOf_choice_adjusted_2[global_indexOf_currently_showing_question]+'</button><button id="element_id_choice_'+
  temp_list_rearrangedIndexes_incremented[2]+
  '" class="element_class_answer_choice" onclick="func_select_choice('+
  temp_list_rearrangedIndexes[2]+
  ')">'+list_textOf_choice_adjusted_3[global_indexOf_currently_showing_question]+'</button><button id="element_id_choice_'+
  temp_list_rearrangedIndexes_incremented[3]+
  '" class="element_class_answer_choice" onclick="func_select_choice('+
  temp_list_rearrangedIndexes[3]+
  ')">'+list_textOf_choice_adjusted_4[global_indexOf_currently_showing_question]+'</button>';

}
