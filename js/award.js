var myNumber;
var result = [];//抽奖结果
var code = [];//总人数
var all = '';
var localstroage = window.localStorage;  

$('#allCount').change(function(){
	all = $('#allCount').val();
	$(this).attr('disabled','disabled');
	for(var i=1;i<=all;i++){
		if(i != 250){
    		code.push(i)
    	}
		
	}
	console.log(code);
});
 
var voice = document.getElementById("voice");

/*随机所有的code并且不重复*/
function showRandomNum(num) {
    var li = "";
    code.sort(function(){//随机排序
      return 0.5 - Math.random();
    });

    for(var i = 0; i < num; i++){
      li += '<li>'+code[i]+'</li>';
    }
	 
    $(".prize_list ul").html(li);
}


$(".start").click(function(){
  if($("#prize_btn").val() == 0){        
    if($("#set_grade").val() == "选择奖项") {
        alert("请选择奖项");
        return;
    }else if($("#prizeCount").val() == "") {
        alert("请输入中奖人数");
        return;
    }else if($("#prizeCount").val() > 10) {
        alert("单次抽奖人数不能超过10人");
        return;
    }else{
    	if(code.length <= 0 || code.length <= 5){
	    	alert("抽奖人数不能为0或小于0或小于5;\n抽奖结束")
	    }else{
	    	$("#prize_btn").val(1);
          	var num = $("#prizeCount").val();
          	$(this).find("img").attr("src","images/prize_stop.png");

	        myNumber = setInterval(function(){
	            showRandomNum(num);
	        }, 10);
	        voice.src = "m1.mp3";
	        voice.play();
	        localStorage.clear(); 
	        $('#allCount').val(code.length);
	    }
    }   
}else{
	voice.src = "m02.wav";
	voice.play();
    $("#prize_btn").val(0);
  	var arr = [];//当前中奖号码
    $('.vetically li').each(function(){
    	var n = parseInt($(this).text());
    	
    	code.splice($.inArray(n,code),1)
    	
    	arr.push(n)
    });
    var k = $(".prize_grade span").text();
    console.log(k)
    var now = {
    	name: k,
    	data: arr
    }
    result.push(now);
    console.log("中奖号码："+arr);
  	console.log("剩余抽奖人数为:"+code.length);
  	
    clearInterval(myNumber);
    $(this).find("img").attr("src","images/prize_start.png");
    
	console.log(result)
	localstroage.setItem('result',JSON.stringify(result));
  }    
 
});

$("#set_grade").change(function(){
  $(".prize_grade span").text($(this).val());
});


//页面刷新时调用
$('.clear').click(function(){
	localStorage.clear(); 
});

  