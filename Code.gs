/* 
*. Google Classrooms Useful Scripts
*  
*  A collection of scripts developed to populate and manage Google Classrooms. By Andrew Chiu achiu@mchk.edu.hk / Twitter: @chew_ed
*
*
*/


/**
 * function getAllClassrooms()
 * Writes all the classrooms names, ID, owner ID and classroom email address onto the active sheet
 *
 * Useful for getting Classroom names and IDs
 */
function getAllClassrooms() {
  var thisData = [];
  var myclasses = Classroom.Courses.list();
  for (var x=0; x < myclasses.courses.length; x++){
    Logger.log(myclasses.courses[x].name);
    thisData.push([myclasses.courses[x].name, myclasses.courses[x].id, myclasses.courses[x].ownerId, myclasses.courses[x].courseGroupEmail]);
  }
  SpreadsheetApp.getActiveSheet().getRange(2,1,thisData.length, thisData[0].length).setValues(thisData);
}


/**
 *  function AddPeopleToClassroom()
 *
 *  Adds the list of given users (email addresses) on the sheet "AddStudent" to the classroom as students
 *  Expects a sheet in the spreadsheet named "AddStudent", with 3 columns: 
 *. A: Classroom Name (this is optional)
 *. B: Classroom ID (required. must be column B)
 *  C: student email (required. must be column C)
 *
*/
function AddPeopleToClassroom(){
  var workingSheet = 'AddStudent';
  var mySs = SpreadsheetApp.getActiveSpreadsheet();
  var mySheet = mySs.getSheetByName(workingSheet);
  var myData = mySheet.getDataRange().getValues();
  var errorAccounts = [];
  
  for(var r=1; r < myData.length; r++){
      var myS = Classroom.newStudent();
      myS.userId = myData[r][2];  
      
    try{
      Logger.log('%s (%s)',myS, myData[r][1]);
      var thisClass = Classroom.Courses.Students.create(myS,myData[r][1]);
    } catch(e){
      Logger.log(e)
      errorAccounts.push(myData[r][2]);
    }      
  }
  //Still to add: if errorAccounts.length > 0 then write them to an errorlog sheet
}


/**
 *  function AddTeacherToClassroom()
 *
 *  Adds the list of given users (email addresses) to the classroom on the sheet "AddStudent"
 *  Expects a sheet in the spreadsheet named "AddStudent", with 3 columns: 
 *. A: Classroom Name (this is optional)
 *. B: Classroom ID (required. must be column B)
 *  C: Teacher email (required. must be column C)
 *
*/
function AddTeacherToClassroom(){
  var workingSheet = 'AddTeacher';
  var mySs = SpreadsheetApp.getActiveSpreadsheet();
  var mySheet = mySs.getSheetByName(workingSheet);
  var myData = mySheet.getDataRange().getValues();
  var errorAccounts = [];
  
  for(var r=1; r < myData.length; r++){
      var myS = Classroom.newTeacher();
      myS.userId = myData[r][2];  
      
    try{
      Logger.log('%s (%s)',myS, myData[r][1]);
      var thisClass = Classroom.Courses.Teachers.create(myS,myData[r][1]);
    } catch(e){
      Logger.log(e)
      errorAccounts.push(myData[r][2]);
    }
      
  }
  //Still to add: if errorAccounts.length > 0 then write them to an errorlog sheet
}


