let playerOne = prompt("Player One Enter Your Name, you will be Blue");
let playerTwo = prompt("Player Two Enter Your Name, you will be Red");
let td = document.querySelectorAll("tr");



// // convert data into two demantional array but i know it late
// let t = $('table tr');
// let rowss = [[]] ;
//
// for (let i = 5, z = 0; i >= 0, z <= 5; i--, z++){
//     rowss[z] = t.eq(i).find('td');
// }
// console.log(rowss);

/*
covert data into opject and convert row to colm and also make it from down to up
from line 9 to line 24
*/

let rows = {row0:[],
  row1:[],
  row2:[],
  row3:[],
  row4:[],
  row5:[],
  row6:[]
};

for(let i = 0; i < 7; i++){
  let s = 'row' + i;
  for(let j = 5; j >= 0; j--){
    rows[s][j-5] = (td[j].children)[i];
  }
}





/*
here is get input from the user and sign it into the connect4
5ly balk awl 2 loop 34an y5lo el cilck yat3mlha save x el memory
el for loop el 3 34an ya3'yr mn a2rb wa7d t7t

*/

  let click = 0;
  let oneWin = 0;
  let displayName = "";
  for(let i = 0; i < 7; i++){
    let s= 'row' + i;
    for(let j = 0; j >= -5; j--){
        $(rows[s][j]).click(function(){
          if (!oneWin){
            for(let k = 0; k >= -5; k--){
              if($(rows[s][k]).css( "background-color") === 'rgb(169, 169, 169)'){
                if (click === 0){
                  $(rows[s][k]).css( "background-color","rgb(0, 0, 255)");
                  click = 1;
                  displayName = playerOne+": it is your turn, please pick a coulmn to drop your blue chip.";
                  $('h4').text(displayName);
                  break;}
                else{
                  $(rows[s][k]).css( "background-color","rgb(255, 0, 0)");
                  click = 0;
                  displayName = playerTwo+": it is your turn, please pick a coulmn to drop your Red chip.";
                  $('h4').text(displayName);
                  break;}
                }
              }
          }
          if(checkWin('rgb(0, 0, 255)')){
            displayName = playerOne + " has won! Refresh your browser to\nplay agin";
              $('h1').text(displayName);
              $('h3').text('Congratulation '+playerOne);
              $('h4').text('Hard Luck! '+playerTwo);
              oneWin = 1;
          }
          else if(checkWin('rgb(255, 0, 0)')){
            displayName = playerTwo + " has won! Refresh your browser to\nplay agin";
            $('h1').text(displayName);
            $('h3').text('Congratulation '+playerTwo);
            $('h4').text('Hard Luck! '+playerOne);
            oneWin = 1;
          }
          else if(tie()){
            displayName = "NO one has won! Refresh your browser to\nplay agin";
            $('h1').text(displayName);
            $('h3').text(playerOne + " and " + playerTwo +" are Tie");
            $('h4').text(" ");
            oneWin = 1;
          }
        });
      }
    }


function checkColumn(color){
  let win = 0;
  for(let i = 0; i < 7; i++){
    win = 0;
    let s= 'row' + i;
    for(let j = 0; j >= -5; j--){
      if($(rows[s][j]).css( "background-color") === color){
        win++;
      }
      else{
        win = 0;
      }
      if (win === 4){
        return true;
      }
    }
  }
  return false;
}
function checkRow(color){
  let win = 0;
  for(let j = 0; j >= -5; j--){
    win = 0;
  for(let i = 0; i < 7; i++){
    let s= 'row' + i;
    // console.log(win);
      if($(rows[s][j]).css( "background-color") === color){
        win++;
      }
      else{
        win = 0;
      }
      if (win === 4){
        return true;
      }
    }
  }
  return false;
}


function checkCross(color){
  //check for up from row zero to row 4 and -1 , -2 and up
  let win = 0;
  for(let i = 0; i < 4; i++){
    win = 0;
    for(let j = i, k = 0; j < 7 && k >= -5; j++,k--){
      if($(rows['row'+j][k]).css( "background-color") === color){
        win++;
        console.log("cross win" +  win);
      }
      else{
        win = 0;
      }
      if (win === 4){
        return true;
      }
    }
  }
  win = 0;
  for(let i = -1; i >= -3; i--){
    win = 0;
    for(let j = 0, k = i; j <= 5 + i && k >= -5; j++,k--){
      if($(rows['row'+j][k]).css( "background-color") === color){
        win++;
      }
      else{
        win = 0;
      }
      if (win === 4){
        return true;
      }
    }
  }

  //check for down from row zero to row 4 and -1 , -2 and down
  win = 0;
  for(let i = 6; i >= 3; i--){
    win = 0;
    for(let j = i, k = 0; j >= 0 && k >= -5; j--,k--){
      if($(rows['row'+j][k]).css( "background-color") === color){
        win++;
      }
      else{
        win = 0;
      }
      if (win === 4){
        return true;
      }
    }
  }
  win = 0;
  for(let i = -1; i >= -3; i--){
    win = 0;
    for(let j = 6, k = i; j >= 1 - i && k >= -5; j--,k--){
      if($(rows['row'+j][k]).css( "background-color") === color){
        win++;
      }
      else{
        win = 0;
      }
      if (win === 4){
        return true;
      }
    }
  }
  return false;
}

function tie(){
  for(let i = 0; i < 7; i++){
    let s= 'row' + i;
    for(let j = 0; j >= -5; j--){
      if($(rows['row'+i][j]).css( "background-color") === 'rgb(169, 169, 169)'){
        return false;
      }
    }
  }
  console.log('Tie');
  return true;
}

function checkWin(k){
    if(checkColumn(k)){
      console.log("WIN FROM COLUMN");
      return true;
    }
    if(checkRow(k)){
      console.log("WIN FROM ROW");
      return true;
    }
    if(checkCross(k)){
      console.log("WIN FROM Cross");
      return true;
    }
    return false;
}
