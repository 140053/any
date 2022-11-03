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
        $('#'+id).css('color', 'red').addClass('record');
        var survey = $('#s'+num).text();
        var totalscore = $('#boardScore').text();
        $('#boardScore').empty().text( Number(totalscore) + Number(survey));
    }
   
}


function awardTo(team){
    var scoreboard = $('#boardScore').text();
    $('#'+team).text(scoreboard);
    $('#boardScore').text('0');
}

function setanswerdash(){
        var qust = $('#qholder').val()
        if(qust != ''){
            $.getJSON( "/js/FF3.json", function( data ) {
                var anslent = Object.keys(data[qust]).length;
                
                var answer = [];
                var answer2 = [];
               
                if (anslent > 6){
                    for (let index = 0; index < 6; index++) {
                        var cnt = index + 1;
                        answer.push('<div class="cardHolder" style="perspective: 800px;">' + 
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
                    $('.col1').empty().html(answer);

                    for (let index2 = 6; index2 < anslent; index2++) {
                        var cnt2 = index2 + 1;
                        //console.log(data[qust][index2]);
                        answer2.push('<div  class="cardHolder" style="perspective: 800px;">' + 
                                        '<div onclick="clickanser(this.id, '+cnt2+')" id="card' + cnt2 + '" class="card" style="transform-style: preserve-3d; transform: matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1);">' +
                                        ' <div class="front" style="backface-visibility: hidden;">'+
                                                '<span class="DBG">' + index2+1 +  '</span>'+
                                        ' </div>'+
                                            '<div class="back DBG" style="transform: matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1); backface-visibility: hidden;">'+
                                            ' <span>'+ data[qust][index2][0] +'</span>'+
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

                }
                
              

            })
        }else{
            alert('Load And Select questions first');
        }
        
        
        
}


const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/387");
 //   audio.play();




/*jshint strict:false */