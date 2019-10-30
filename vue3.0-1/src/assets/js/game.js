var btnClick = false;	//抽奖状态
var luck="";
var pmdInitDate={0:'PRIZE_0',1:'PRIZE_5',2:'PRIZE_1',3:'PRIZE_0',4:'PRIZE_3',5:'PRIZE_4',6:'PRIZE_5',7:'PRIZE_2'};   //奖品图片对应位置    
var prizeType="";
var checkRule="";
var actName="";
var prizeLevel="";
var prizeQuanPwd="";
$(function() {
	//关闭奖品信息
	$(".close").click(function() {
	    btnClick = false;
		$(".jpDiv").animate({
			top : "-100%"
		}, "slow",function(){location.href= contextPath+'/actIndex/'+actType+'/index.do?id='+Math.random();});
		
	});
	//绑定点击事件
	$("#cjBtn").click(function() {
		if ( parseInt($("#lotteryLeaveNum").val())<=0) {
			showMsg("您的抽奖次数已用尽！",null,contextPath+"/mobileres/common/images/tip/tip_cry.png")
			return;
		}
		startLottery();
	});
	//初始跑马灯数据
	pmdInit();
});


function copyContent(_this){
	var id=$(_this).attr("data");
    var clipboard = new Clipboard('.copy',{text: function() {return $("#"+id).html().trim(); } });

    clipboard.on('success', function(e) {
        console.log(e);
        $("#copyTip").css("display","flex");
        return;
    });

    clipboard.on('error', function(e) {
        console.log(e);
        return;
    });
}
$("#copyTipOk").click(function(){
	$("#copyTip").hide();
})

//跑马灯页面初始化
function pmdInit(){
	var w = $("#luck").width() / 3-10;
	$(".pmd-div td").css("width", w);
	$(".pmd-div td").css("height", w);
	$(".active_1").css("width", w);
	$(".active_1").css("height", w);

	//初始奖品图
	$(".luck-unit").each(function(i){
		/*var url="../images/pmd/prize/"+pmdInitDate[i]+".png";
		$(".luck-unit-" + i).find(".pmdJpImg").attr("src",url);
		$(".luck-unit-" + i).addClass(pmdInitDate[i]);
		$(".luck-unit-" + i).attr("id",i);*/
	})
	
	luck = {
		index : -1, //当前转动到哪个位置，起点位置
		count : 9, //总共有多少个位置
		timer : 0, //setTimeout的ID，用clearTimeout清除
		speed : 20, //初始转动速度
		times : 0, //转动次数
		cycle : 50, //转动基本次数：即至少需要转动多少次再进入抽奖环节
		prize : -1, //中奖位置
		init : function(id) {
			if ($("#" + id).find(".luck-unit").length > 0) {
				var luckId = $("#" + id);
				var units = luckId.find(".luck-unit");
				this.obj = luckId;
				this.count =units.length;
				luckId.find(".luck-unit-" + this.index).addClass("active");
			}
			;
		},

		roll : function() {
			var index = this.index;
			var count = this.count;
			var luck = this.obj;
			$(luck).find(".luck-unit-" + index).removeClass("active");
			index += 1;
			if (index > count - 1) {
				index = 0;
			};
			
			$(luck).find(".luck-unit-" + index).addClass("active");
			this.index = index;
			
			return false;
		},
		stop : function(index) {
			this.prize = index;
			return false;
		}
	};
	
	luck.init('luck');
}
//开始抽奖
function startLottery(){	
	if(btnClick){
	  return false;
	}
	//抽奖次数已用完
	if($("#lcount").html()==0){
		showMsg("抱歉，您暂无抽奖次数哦！",null,contextPath+"/mobileres/common/images/tip/tip_cry.png");
		return false;
	}
	btnClick = true;
	luck.speed=100;

   //抽奖请求
	var contextPath=$("#contextPath").val();
    var actType=$("#actType").val();
  
	//按下弹起效果
	$.ajax({
           type : 'POST',
           url : contextPath+'/lottery/'+actType+'/pmd.do',
           dataType : 'json',
           data:{},
           cache : false,
           async:false,//同步
           error : function(e) {
           // alert('请不要重复点击哦！');
            return false;
           },
           success : function(json){
        	 if(json.errCode == '0000'){  
        		 /*****************新加********************/
        		 prizeType=json.data.prizeType;
        		 checkRule=json.data.checkRule;
        		 actName=json.data.actName;
        		 prizeLevel=json.data.prizeLevel;
        		 prizeQuanPwd = json.data.type;
        		 /*****************新加********************/
        		 $("#lotteryLeaveNum").val(parseInt(json.data.actLcount));
           	    $("#lcount").html(parseInt(json.data.actLcount));
	       		  //获取当钱奖品在页面数量个数
	       		    var length=parseInt($("."+json.data.prizeLevel).length);
	       		    var index="";
	       		    if(length>1){
	       		    	var indexArray=new Array();
	       		    	$("."+json.data.prizeLevel).each(function(i){
	       		    		indexArray[i]=parseInt($(this).attr("id"));
	       		    	})
	       		    	//随机取下标位置
	       		    	index=indexArray[Math.floor(Math.random() *indexArray.length)];
	       		    }else{
	       		    	index=parseInt($("."+json.data.prizeLevel).attr("id"));
	       		    }
		       		pmdRoll(index);
	       			return false;
	       	   }else  if(json.errCode == '1230' || json.errCode == '2002'){  
	       		   //session 失效 归属地不对
	       		   showMsg(json.errMsg,null,contextPath+"/mobileres/common/images/tip/tip_cry.png");
	       		   return false;
	       	   }else {
	       		   var index=$(".PRIZE_0").attr("id");
	       		   //谢谢惠顾
	       		   pmdRoll(index); //谢谢惠顾
	       		   return false;
	       	   }
	        },
	        complete:function(){
	        	btnClick=false;
	        }
   		});

}

function pmdRoll(prizeIndex){
		luck.times += 1;
		luck.roll();
		if (luck.times > luck.cycle + 10&& luck.index == luck.prize) {
				clearTimeout(luck.timer);
				luck.prize = -1;
				luck.times = 0;	
				
				var prize=pmdInitDate[luck.index];  //奖品结果集显示图片
				setTimeout("jpShow('"+prize+"')",1500);
				//发送短信
				if(prizeLevel!="PRIZE_0"){
					//sendLotteryMsg(prizeType,checkRule,actName);
				}

		} else {
			if (luck.times < luck.cycle) {
				luck.speed -= 10;
			} else if (luck.times == luck.cycle) {
				//随机数
				luck.prize = prizeIndex;
				luck.speed =10;
			} else {
				if (luck.times > luck.cycle + 10
						&& ((luck.prize == 0 && luck.index == 7) || luck.prize == luck.index + 1)) {
					luck.speed += 110;
				} else {
					luck.speed += 20;
				}
			}
			if (luck.speed < 40) {
				luck.speed = 40;
			}

			luck.timer = setTimeout("pmdRoll("+prizeIndex+")", luck.speed);
		}
		
		return ;
}


//奖品显示
function jpShow(prize){
	$("#winprize").attr("src",$("#contextPath").val()+"/mobileres/"+$("#actType").val()+"/images/game/prize/"+prize+".png") ;
	$("#winprizediv").fadeIn(200);
			
//	var flag = false;
//	var content="<img src='"+$("#contextPath").val()+"/mobileres/"+$("#actType").val()+"/images/game/prize/"+prize+".png' style='width: 80%;'/>";
//	if (prizeQuanPwd) {
//		var quanPwd = prizeQuanPwd.split("@#@");
//		if (quanPwd && quanPwd.length == 2) {
//			var pwd = quanPwd[1];
//			if (pwd.indexOf("https://") == 0 || pwd.indexOf("http://") == 0) {
//				//显示按钮
//				content += "<div class='exchange' onclick='showLink(\""+pwd+"\")'>立即兑换</div>";
//			}else{
//				content += "<div class='code'><span>券码：</span><label id='codeNum'>"+quanPwd[0]+"</label><a href='#' class='codeNum copy' data='codeNum' onclick='copyContent(this)'>点我复制</a></div>" +
//					"<div class='code'><span>券密：</span><label id='codePwd'>"+quanPwd[1]+"</label><a href='#' class='codePwd copy' data='codePwd' onclick='copyContent(this)'>点我复制</a></div>"
//			}
//			flag = true;
//		}
//	}
//	actAlertReload(content,flag);
}

function showLink(url){
	$("#linkIframe").attr("src",url)
	$("#copyTip1").fadeIn();
}
//发送短信
function sendLotteryMsg(prizeType,checkRule,actName){
	//按下弹起效果
	$.ajax({
           type : 'POST',
           url : contextPath+'/lottery/'+actType+'/sendLotteryMsg.do',
           dataType : 'json',
           data:{prizeType:prizeType,checkRule:checkRule,actName:actName},
           cache : false,
           async:false,//异步
           error : function(e) {
           // alert('请不要重复点击哦！');
            return false;
           },
           success : function(json){
	       	   
	        }
   		});
}

function actAlertReload(msg,flag){
	 layer.open({
		  content: msg,
		  btn: 'OK',
		  shadeClose: false,
		  className: flag?'prizeDiv':'',
		  yes: function(index){location.href= contextPath+'/actIndex/'+actType+'/index.do?id='+Math.random();}
	 });
}
