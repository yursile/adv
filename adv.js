(function(window){
	function ADUtil(opt){
		var option = {
			Itemspaceid:12862,
			adps:6401136,
			adsrc:13,
			apt:4,
			maxPic:6,
			turn:"2",
			isTurn:false
		}
		for(var i in opt){
			option[i] = opt[i];
		}
		this.option= option;
		if(this.option.isTurn){
			this.genrateTurn();
		}
	}

	function genrateTurn(){
		var maxPic = this.option.maxPic;

		if(!localStorage.turn){
			localStorage.turn = Math.floor(Math.random(0,1)*maxPic);
		}

		this.option.turn = (localStorage.turn++)%maxPic+1; 
		
		console.log(this.option.turn);
	}
	// genrateTurn();
	function getAD(callback){
		var _this = this;
		console.log(this.option.turn);
		$.ajax({
		  type: "GET",
		  url: "http://10.16.10.63/adgtr/",
		  data:_this.option,
		  dataType: "jsonp",
		  success: function(data){
		  	var img  = data[0].resource.file;
		  	if(typeof callback ==="function"){
		  		callback(img)
		  	}else{
		  		document.getElementsByClassName("loading")[0].style.cssText = 'background:url('+img+')'+' no-repeat;'+"background-size:100%";	
		  	}  
		    submitAD(data,"dd");
		  }
		});
	}
	function submitAD(addata){
		var reg = /\/c\/(\d{5})\//;
		var _this = this;
		var data = addata[0];
		var pvData = {
			aid:data.adid,	
			apid:"beans_"+data.adid,
			pgid:"pgid"+new Date().getTime(),
			at:"1",
			ax:"0",
			ay:"0",
			bucket:data.bucket,
			c:data.c,
			// ch_trans:"",
			e:data.e,
			ed:data.ed,
			ext:data.ext,
			freq:data.freq,
			impid:data.impression_id,
			ipos:"1",
			jsv:"06301130",
			mkey:data.monitorkey,
			newschn:reg.exec(document.location.pathname)[1],
			r:Math.ceil(Math.random(0,1)*100000000000000),
			rsln:"640*1136",
			sf:"false",
			supplyid:"4",
			turn:"1"
		}

		var ad_plusData = {
			_dc:"1451030323800",
			a:"99",
			apid:"beans_12294",
			impid:data.impression_id,
		}

		var pv_ajax = {
			  type: "GET",
			  url: "http://i.go.sohu.com/count/v",
			  dataType: "jsonp",
			  data:pvData,
			  success: function(data){
			  	
			  	// console.log("pv_ajax");
			  	// console.log(data);
			  }
		}

		var av_ajax = {
			 type: "GET",
			  url: "http://i.go.sohu.com/count/av",
			  dataType: "jsonp",
			  data:pvData,
			  success: function(data){

			  	// console.log("av_ajax");
			  	// console.log(data);
			  }
		}

		var ad_ajax = {
			 type: "GET",
			  url: "http://imp.optaim.com/201409/8e1630f4158f49845c16b015b90d34bf.php",
			  dataType: "jsonp",
			  data:ad_plusData,
			  success: function(data){
			  	// console.log("ad_ajax");
			  	// console.log(data);
			  }
		}

		if(data == null){
			$.ajax({
				 type: "GET",
				  url: "http://i.go.sohu.com/count/v",
				  dataType: "jsonp",
				  data:{apid:"beans_"+_this.option.Itemspaceid},
				  success: function(data){
				  
				  	// console.log(data);
				  }
			});
		}else{
			
			$.ajax(pv_ajax);
			$.ajax(av_ajax);
			$.ajax(ad_ajax);
		}	
	}

	ADUtil.prototype.genrateTurn  = genrateTurn;
	ADUtil.prototype.getAD = getAD;
	ADUtil.prototype.submitAD = submitAD;

	window.ADUtil = ADUtil;
	exports.resLoader = resLoader;
	export {ADUtil as default}
})(window);