<template>
	<div class="pmd">
		<div id="luck" class="luck">
			<!-- luck -->
			<table style="margin: 0 auto;">
				<tr>
					<td class="luck-unit luck-unit-0"><img :src="`{publicPath}images/pmd/prize/PRIZE_0.png`" class="pmdJpImg"></td>
					<td class="luck-unit luck-unit-1"><img :src="`{publicPath}images/pmd/prize/PRIZE_0.png`" class="pmdJpImg"></td>
					<td class="luck-unit luck-unit-2"><img :src="`{publicPath}images/pmd/prize/PRIZE_0.png`" class="pmdJpImg"></td>
				</tr>
				<tr>
					<td class="luck-unit luck-unit-7"><img :src="`{publicPath}images/pmd/prize/PRIZE_0.png`" class="pmdJpImg"></td>
					
						<td class="gaem-btn" id="cjBtn" v-on:click="startLottery"></td>
					<td class="luck-unit luck-unit-3"><img :src="`{publicPath}images/pmd/prize/PRIZE_0.png`" class="pmdJpImg"></td>
				</tr>

				<tr>
					<td class="luck-unit luck-unit-6"><img :src="`{publicPath}images/pmd/prize/PRIZE_0.png`" class="pmdJpImg"></td>
					<td class="luck-unit luck-unit-5"><img :src="`{publicPath}images/pmd/prize/PRIZE_0.png`" class="pmdJpImg"></td>
					<td class="luck-unit luck-unit-4"><img :src="`{publicPath}images/pmd/prize/PRIZE_0.png`" class="pmdJpImg"></td>
				</tr>
			</table>
		</div>
		<!-- luckEnd -->
	</div>
</template>

<script>
	//import pmdjs from "../js/game.js"
	import axios from 'axios'
	import VueAxios from 'vue-axios'
	export default {
	    data:function () {
	      return  {
	      	publicPath: process.env.BASE_URL,
	      	luck:"",
	        btnClick:false, //抽奖状态
	        pmdInitDate:['PRIZE_0','PRIZE_5','PRIZE_1','PRIZE_0','PRIZE_3','PRIZE_4','PRIZE_5','PRIZE_2']   //奖品图片对应位置    
	      }
	    },
	 	name: "pmd",
	  	methods:{
	  		//初始化跑马灯
	   		pmdInit: function () {
	      		var w = $("#luck").width() / 3-10;
				$(".pmd td").css("width", w);
				$(".pmd td").css("height", w);
				
				//初始奖品图
				var num=$(".luck-unit").length;
				for (var i=0;i<this.pmdInitDate.length;i++)
				{ 
				    var url=this.publicPath+"images/pmd/prize/"+this.pmdInitDate[i]+".png";
					$(".luck-unit-" + i).find(".pmdJpImg").attr("src",url);
					$(".luck-unit-" + i).addClass(this.pmdInitDate[i]);
					$(".luck-unit-" + i).attr("id",i);
				}
				
					this.luck = {
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
							console.log(count)
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
					
					this.luck.init('luck');
	    	},
	    	pmdRoll:function(prizeIndex){
				this.luck.times += 1;
				this.luck.roll();
				if (this.luck.times > this.luck.cycle + 10&& this.luck.index == this.luck.prize) {
					clearTimeout(this.luck.timer);
					this.luck.prize = -1;
					this.luck.times = 0;	
					
					var prize=this.pmdInitDate[this.luck.index];  //奖品结果集显示图片
					//setTimeout("jpShow('"+prize+"')",1500);
				} else {
					if (this.luck.times < this.luck.cycle) {
						console.log(this.luck.times)
						this.luck.speed -= 10;
					} else if (this.luck.times == this.luck.cycle) {
						//随机数
						this.luck.prize = prizeIndex;
						this.luck.speed =10;
					} else {
						if (this.luck.times > this.luck.cycle + 10
								&& ((this.luck.prize == 0 && this.luck.index == 7) || this.luck.prize == this.luck.index + 1)) {
							this.luck.speed += 110;
						} else {
							this.luck.speed += 20;
						}
					}
					if (this.luck.speed < 40) {
						this.luck.speed = 40;
					}
		
					this.luck.timer=setTimeout(() => {this.pmdRoll(prizeIndex)},this.luck.speed);
				}
				
				return ;
			},
			startLottery:function(){	
				if(this.btnClick){
				  return false;
				}
				this.btnClick = true;
				this.luck.speed=100;
			
			   	this.pmdRoll(1);
				return false;
			}
	    
	 	},
	 	mounted () { //这个属性就可以，在里面声明初始化时要调用的方法即可
	      this.pmdInit()
	   }
	}
</script>

<style lang="scss">
	
  @import '../assets/css/pmd.scss'; /*引入公共样式*/

</style>