/*jshint strict:false */


function loadQuestion(){
    $.getJSON( "/js/FF3.json", function( data ) {
        var items = [];
        $.each( data, function( key, val ) {
            //console.log( val.length + ' ' + key );
            //setanswerdash(val, val.length)
            items.push("<option>" + key + "</option>")
           
        });
        //console.log(items)
        $('#qholder').html(items);
        

    }).fail(function(){
        console.log("An error has occurred.");
    });
}

function clickanser(id, num){
   
    if( $('#'+id).hasClass('record') == true){
        alert('Already Recorded')
    }else{
        btncorrect();
        

        sendMessage('shan', num)

        $('#'+id).css('color', 'red').addClass('record');
        var survey = $('#s'+num).text();
        var totalscore = $('#boardScore').text();
        $('#boardScore').empty().text( Number(totalscore) + Number(survey));
    }
   
}


function awardTo(team){
    var scoreboard = $('#boardScore').text();
    var score = $('#'+team).text();
    $('#'+team).text(Number(scoreboard) + Number(score));
    sendMessage('award', scoreboard, team)
    $('#boardScore').text('0');
    //sendMessage = (type, num, team)
    
}

function setanswerdash(){
        var qust = $('#qholder').val()
        if(qust != ''){
            $.getJSON( "/js/FF3.json", function( data ) {
                var anslent = Object.keys(data[qust]).length;
                //console.log(anslent)
                $('#answercnt').val(anslent);
                
                var answer = [];
                var answer2 = [];
               
                if (anslent >= 6){
                    for (let index = 0; index < 6; index++) {
                        var cnt = index + 1;
                        answer.push('<div class="cardHolder" style="perspective: 800px;">' + 
                                        '<div onclick="clickanser(this.id, '+cnt+')" id="card' + cnt + '" class="card " style="transform-style: preserve-3d; transform: matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1);">' +
                                        ' <div class="front" style="backface-visibility: hidden;">'+
                                                '<span class="DBG">' + cnt +  '</span>'+
                                        ' </div>'+
                                            '<div  class="back DBG" style="transform: matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1); backface-visibility: hidden;">'+
                                            ' <span id="ans'+ cnt +'">'+ data[qust][index][0] +'</span>'+
                                                '<b id="s'+ cnt +'" class="LBG">'+ data[qust][index][1] +'</b>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>')
                    }
                    $('.col1').empty().html(answer);

                    for (let index2 = 6; index2 < anslent; index2++) {
                        var cnt2 = index2 + 1;
                        //console.log(data[qust][index2]);
                        answer2.push('<div  class="cardHolder" style="perspective: 800px;">' + 
                                        '<div onclick="clickanser(this.id, '+cnt2+')" id="dcard' + cnt2 + '" class="card" style="transform-style: preserve-3d; transform: matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1);">' +
                                        ' <div class="front" style="backface-visibility: hidden;">'+
                                                '<span class="DBG">' + index2+1 +  '</span>'+
                                        ' </div>'+
                                            '<div class="back DBG" style="transform: matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1); backface-visibility: hidden;">'+
                                            ' <span id="ans'+ cnt2 +'">'+ data[qust][index2][0] +'</span>'+
                                                '<b id="s'+ cnt2 +'" class="LBG">'+ data[qust][index2][1] +'</b>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>')
                    }
                   
                    var blank = 6 - Object.keys(answer2).length ;
                    if(blank <= 12){
                        for (let index3 = 0; index3 < blank; index3++) {
                            var cnt3 = index3 + 1;
                            answer2.push('<div onclick="clickanser(this.id)" id="card' + cnt3 + '" class="cardHolder empty" style="perspective: 800px;"><div></div></div>');                        
                        }
                    }
                    
                    
                   
                                 
                    $('.col2').empty().html(answer2);

                }else if( anslent <= 6){
                    $('.col1').empty();
                    $('.col2').empty();
                    var tempa = [];
        
                    for (let index = 0; index < 6 ; index++) {
                      var cnt = index + 1;
                      tempa.push('<div class="cardHolder" style="perspective: 800px;">' + 
                                    '<div onclick="clickanser(this.id, '+cnt+')" id="card' + cnt + '" class="card " style="transform-style: preserve-3d; transform: matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1);">' +
                                    ' <div class="front" style="backface-visibility: hidden;">'+
                                            '<span class="DBG">' + cnt +  '</span>'+
                                    ' </div>'+
                                        '<div  class="back DBG" style="transform: matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1); backface-visibility: hidden;">'+
                                        ' <span>'+ data[qust][index][0] +'</span>'+
                                            '<b id="s'+ cnt +'" class="LBG">'+ data[qust][index][1] +'</b>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>')
                      
                    }
                    $('.colHolder').empty().html(tempa);
        
                  }
                
                
              

            })
        }else{
            alert('Load And Select questions first');
        }
        
        
        
}




 function btnwrong(id){
    $('#'+ id).css('background-color','red')
    const audio = new Audio("/sound/wrong.mp3");    
    switch (id) {
        case 'one':
            sendMessage('wrong', 'X', '');
            audio.play();            
            break;
        case 'two':
            sendMessage('wrong', 'XX', '');
            audio.play(); 
            break;
        case 'three':
            sendMessage('wrong', 'XXX', '');
            audio.play(); 
            break; 
        default:
            break;
    }
   
 }

 function btncorrect(){
    const audio = new Audio("/sound/correct.mp3");
    audio.play();
 }

 function playmusic(id){
    
    if(id == 1){
        const audio1 = new Audio("/sound/correct.mp3");
        audio.play();
    }
    if(id == 2){
        const audio = new Audio("/sound/wrong.mp3");
        audio.play();
    }

 }

 function btnwrong1(){
    const audio = new Audio("/sound/wrong.mp3");
    audio.play();
 }

 function spinsound(){
    const audio = new Audio("/sound/spin1.mp3");
    audio.play();
 }

 function resertwrongbtn(){
    $('#one').css('background-color','yellow')
    $('#two').css('background-color','yellow')
    $('#three').css('background-color','yellow')
 }


 // Create WebSocket connection.
 const socket = new WebSocket('ws://localhost:80');

 // Connection opened
 socket.addEventListener('open', function (event) {
     console.log('Connected to WS Server')
 });

 // Listen for messages
 socket.addEventListener('message', function (event) {
     console.log(event.data);
 });

 const sendMessage = (type, num, team) => {    
    if(type == 'sq'){
        var msg = {   
            status: 'quest',         
            question: $('#qholder').val(),
            answer: $('#answercnt').val()
        }
        if($('#qholder').val() != ''){
            socket.send(JSON.stringify(msg));            
        }
        
    
    }else if( type == 'shan'){
        var ans = $('#ans'+ num).html();
        var scr = $('#s'+ num ).html();
        console.log( ans + ' ' + scr)
        var msg = {
            status: 'anser',           
            ans:  ans,
            scr: scr,
            num: num
        }
        socket.send(JSON.stringify(msg));

    }else if (type == 'award'){
        var msg = {
            status: 'award',
            team: team,
            num: num
        }
        socket.send(JSON.stringify(msg));
    
    }else if(type == 'wrong'){
        //sendMessage('wrong', 'X', '')
        var msg = {
            status: 'wrong',
            team: '',
            num: num
        }
        socket.send(JSON.stringify(msg));


    }else if(type == 'roullete'){
        //console.log('here')
        var msg = {
            status: 'roulette',
            team: team,
            num: ''
        }
        socket.send(JSON.stringify(msg));
    }else if(type =='spin'){
        var msg = {
            status: 'spin',
            team: '',
            num: ''
        }
        socket.send(JSON.stringify(msg));
    }else if (type == 'doublesc'){
        var msg = {
            status: 'doublesc',
            team: '',
            num: Number($('#boardScore').text())
        }
        socket.send(JSON.stringify(msg));
    }else if(type == 'shquest'){
        var msg = {
            status: 'shquest',
            team: '',
            num: num
        }
        socket.send(JSON.stringify(msg));
    
    }else if(type == 'shans'){
        var msg = {
            status: 'shans',
            team: '',
            num: ''
        }
        socket.send(JSON.stringify(msg));
    
    }else if(type == 'closemodal'){
        var msg = {
            status: 'closemodal',
            team: '',
            num: ''
        }
        socket.send(JSON.stringify(msg));
    }
    else{
        var msg = {           
            questions: $('#qholder').val()
        }
    }  
     
   
 }


 function spinwheel(){
    sendMessage('spin', '', '');
    spinsound()
 }

 function closemodal(){
    sendMessage('closemodal', '', '');
 }


 function showquestd(id){

    $('#'+id).css('background-color', 'green');
    
    switch (id) {
        case 'mq1': //math        
            sendMessage('shquest', '/img/math/q1/q.jpg', '');
            break;
        case 'mq2':
            sendMessage('shquest', '/img/math/q2/q.jpg', '');
            break;
        case 'mq3':
            sendMessage('shquest', '/img/math/q3/q.jpg', '');
            break;
            //sci
        case 'sciq1':
            sendMessage('shquest', '/img/science/q1/q.jpg', '');
            break;
        case 'sciq2':
            sendMessage('shquest', '/img/science/q2/q.jpg', '');
            break;            
        case 'sciq3':
            sendMessage('shquest', '/img/science/q3/q.jpg', '');
            break;
            //Fil
        case 'filq1':
            sendMessage('shquest', '/img/fil/q1/q.jpg', '');
            break;
        case 'filq2':
            sendMessage('shquest', '/img/fil/q2/q.jpg', '');
            break;
        case 'filq3':
            sendMessage('shquest', '/img/fil/q3/q.jpg', '');
            break;
            //his
        case 'hisq1':
            sendMessage('shquest', '/img/his/q1/q.jpg', '');
            break;
        case 'hisq2':
            sendMessage('shquest', '/img/his/q2/q.jpg', '');
            break;            
        case 'hisq3':
            sendMessage('shquest', '/img/his/q3/q.jpg', '');
            break;
        case 'hisq4':
            sendMessage('shquest', '/img/his/q4/q.jpg', '');
            break;
         case 'hisq4':
            sendMessage('shquest', '/img/his/q5/q.jpg', '');
            break;
            //Agriculture
        case 'agq1':
            sendMessage('shquest', '/img/agri/q1/q.jpg', '');
            break;
        case 'agq2':
            sendMessage('shquest', '/img/agri/q2/q.jpg', '');
            break;
        case 'agq3':
            sendMessage('shquest', '/img/agri/q3/q.jpg', '');
            break;
            //music
        case 'musq1':
            sendMessage('shquest', '/img/music/q1/q.jpg', '');
            break;
        case 'musq2':
            sendMessage('shquest', '/img/music/q2/q.jpg', '');
            break;            
        case 'musq3':
            sendMessage('shquest', '/img/music/q3/q.jpg', '');
            break;
            //shobiz
        case 'shq1': 
            sendMessage('shquest', '/img/shobiz/q1/q.jpg', '');
            break;
        case 'shq2':
            sendMessage('shquest', '/img/shobiz/q2/q.jpg', '');
            break;
        case 'shq3':
            sendMessage('shquest', '/img/shobiz/q3/q.jpg', '');
            break;
            //sports
        case 'shq4':
            sendMessage('shquest', '/img/shobiz/q4/q.jpg', '');
            break;
        case 'shq5':
            sendMessage('shquest', '/img/shobiz/q5/q.jpg', '');
            break;
            //sports
        case 'spoq1':
            sendMessage('shquest', '/img/sports/q1/q.jpg', '');
            break;
        case 'spoq2':
            sendMessage('shquest', '/img/sports/q2/q.jpg', '');
            break;            
        case 'spoq3':
            sendMessage('shquest', '/img/sports/q3/q.jpg', '');
            break;
            //politics
        case 'polq1':
            sendMessage('shquest', '/img/pol/q1/q.jpg', '');
            break;
        case 'polq2':
            sendMessage('shquest', '/img/pol/q2/q.jpg', '');
            break;
        case 'polq3':
            sendMessage('shquest', '/img/pol/q3/q.jpg', '');
            break;
            //economics
        case 'econq1':
            sendMessage('shquest', '/img/econ/q1/q.jpg', '');
            break;
        case 'econq2':
            sendMessage('shquest', '/img/econ/q2/q.jpg', '');
            break;            
        case 'econq3':
            sendMessage('shquest', '/img/econ/q3/q.jpg', '');
            break;
            
    
        default:
            break;
    }

   
 }

 function showqans(id){
    switch (id) {
        case 'ma1': //math        
            sendMessage('shquest', '/img/math/q1/a.jpg', '');
            break;
        case 'ma2':
            sendMessage('shquest', '/img/math/q2/a.jpg', '');
            break;
        case 'ma3':
            sendMessage('shquest', '/img/math/q3/a.jpg', '');
            break;
            //sci
        case 'scia1':
            sendMessage('shquest', '/img/science/q1/a.jpg', '');
            break;
        case 'scia2':
            sendMessage('shquest', '/img/science/q2/a.jpg', '');
            break;            
        case 'scia3':
            sendMessage('shquest', '/img/science/q3/a.jpg', '');
            break;
            //Fil
        case 'fila1':
            sendMessage('shquest', '/img/fil/q1/a.jpg', '');
            break;
        case 'fila2':
            sendMessage('shquest', '/img/fil/q2/a.jpg', '');
            break;
        case 'fila3':
            sendMessage('shquest', '/img/fil/q3/a.jpg', '');
            break;
            //his
        case 'hisa1':
            sendMessage('shquest', '/img/his/q1/a.jpg', '');
            break;
        case 'hisa2':
            sendMessage('shquest', '/img/his/q2/a.jpg', '');
            break;            
        case 'hisa3':
            sendMessage('shquest', '/img/his/q3/a.jpg', '');
            break;
        case 'hisa4':
            sendMessage('shquest', '/img/his/q4/a.jpg', '');
            break;            
        case 'hisa5':
            sendMessage('shquest', '/img/his/q5/a.jpg', '');
            break;
            //Agriculture
        case 'aga1':
            sendMessage('shquest', '/img/agri/q1/a.jpg', '');
            break;
        case 'aga2':
            sendMessage('shquest', '/img/agri/q2/a.jpg', '');
            break;
        case 'aga3':
            sendMessage('shquest', '/img/agri/q3/a.jpg', '');
            break;
            //music
        case 'musa1':
            sendMessage('shquest', '/img/music/q1/a.jpg', '');
            break;
        case 'musa2':
            sendMessage('shquest', '/img/music/q2/a.jpg', '');
            break;            
        case 'musa3':
            sendMessage('shquest', '/img/music/q3/a.jpg', '');
            break;
            //shobiz
        case 'sha1': 
            sendMessage('shquest', '/img/shobiz/q1/a.jpg', '');
            break;
        case 'sha2':
            sendMessage('shquest', '/img/shobiz/q2/a.jpg', '');
            break;
        case 'sha3':
            sendMessage('shquest', '/img/shobiz/q3/a.jpg', '');
            break;
        case 'sha4':
            sendMessage('shquest', '/img/shobiz/q4/a.jpg', '');
            break;
        case 'sha5':
            sendMessage('shquest', '/img/shobiz/q5/a.jpg', '');
            break;
            //sports
        case 'spoa1':
            sendMessage('shquest', '/img/sports/q1/a.jpg', '');
            break;
        case 'spoa2':
            sendMessage('shquest', '/img/sports/q2/a.jpg', '');
            break;            
        case 'spoa3':
            sendMessage('shquest', '/img/sports/q3/a.jpg', '');
            break;
            //politics
        case 'pola1':
            sendMessage('shquest', '/img/pol/q1/a.jpg', '');
            break;
        case 'pola2':
            sendMessage('shquest', '/img/pol/q2/a.jpg', '');
            break;
        case 'pola3':
            sendMessage('shquest', '/img/pol/q3/a.jpg', '');
            break;
            //economics
        case 'econa1':
            sendMessage('shquest', '/img/econ/q1/a.jpg', '');
            break;
        case 'econa2':
            sendMessage('shquest', '/img/econ/q2/a.jpg', '');
            break;            
        case 'econa3':
            sendMessage('shquest', '/img/econ/q3/a.jpg', '');
            break;           
    
        default:
            break;        
        
    }
    btncorrect()
 }




 function showHide_roulette(id){ 
    //hideshow()   true or false
    
   
    if($('#'+id).css('background-color') == 'rgb(0, 128, 0)'){
        $('#'+ id).removeAttr('style').css('background-color','yellow').text('Show Roullete')
        sendMessage('roullete', '', false) 
    }else if ($('#'+id).css('background-color') == 'rgb(255, 0, 0)'){
        $('#'+ id).css('background-color','green').text('Hide Roullete')
        sendMessage('roullete', '', true) 
    }else if($('#'+id).css('background-color') == 'rgb(255, 255, 0)'){

        $('#'+ id).css('background-color','green').text('Hide Roullete')
        sendMessage('roullete', '', true) 
    }
   
 }

 function double(tre){
   
    var vall = $('#boardScore').text();
    var doubleer = 0;
    if(tre != 'tre'){
        doubleer = Number(vall) + Number(vall);
    }else{
        doubleer = Number(vall) * 3;
    }

   
    
    $('#boardScore').text(doubleer);
    sendMessage('doublesc', '' , '')
    btncorrect()
 }


 


/*jshint strict:false */