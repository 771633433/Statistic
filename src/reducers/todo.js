// 这个todo.js主要是存储数据的
import axios from 'axios'
import store from '../store/index'
import moment from 'moment'

import echarts from 'echarts';

var intialBegintime=moment().add(-1,'week')
var intialEndtime=moment()

// 页面初始化的时候给个initialCount 最近7天的记录
var initialCount={}

//  这个intialAttr是左边圆环的默认值
var intialAttr={};

// 这个intialringObject 是初始化的时候,左侧报警属性区分的数据
var intialringObject={}

// 这个是请求最近7天的记录,拿到数据后渲染进页面,historyCount是最上面5大块
axios.get(`http://172.20.22.43:8742/statical/historyCount?startTime=${intialBegintime.format("YYYY-MM-DD")}&endTime=${moment().format("YYYY-MM-DD")}`)
		.then(res=>{
			//console.log(res.data.content);
			initialCount=res.data.content
			// 处理异步请求需要再次dispatch
			store.dispatch({type:"getDefaultList",text:initialCount})
		})
			.catch(err=>{
				console.log(err)
			})


// 页面刚进来的时候,发送一个ajax请求,拿到左边圆环的数据,主要是几个百分比的数据
axios.get(`http://172.20.22.43:8742/statical/gjlbtj?startTime=${moment().add(-1,'week').format("YYYY-MM-DD")}&endTime=${moment().format("YYYY-MM-DD")}`)
				.then(res=>{
					// 更新intialAttr,那个圆环
					intialAttr={       
                			series : [
			                           {
								            type:'pie',
								            radius: ['50%', '70%'],
								            labelLine: {
			                					normal: {
			                    					show: false
			                					}
			            					},
								            data:[{value:res.data.content.CLGJ_COUNT},{value:res.data.content.KKRLGJ_COUNT},{value:res.data.content.DTRLGJ_COUNT},{value:res.data.content.SJGJ_COUNT}]
			        					}
                    		],
                 		color: ['#ffb449','#ff704f','#64ebda','#52a3ff']
            		};
					// 异步的请求都是要dispatch一个action的
					store.dispatch({type:"getDefaultRing",text:res.data.content})

					// 在发送一个action,更新ring圆环
					// console.log(intialAttr)
					store.dispatch({type:"updateRing",text:intialAttr})
				})
					.catch(err=>{
						console.log(err)
					})

// 再发送一次ajax请求,获得当天的数据,中间的那个今日: 车辆数、人脸数、报警数
axios.get('http://172.20.22.43:8742/statical/todaytj')
		.then(res=>{
			console.log(res.data.content);
			store.dispatch({type:"getTodayCount",text:res.data.content})
		})
			.catch(err=>{
				console.log(err)
			})

function getDefaultRing(action,state){
	return {
		...state,
		ringObject:action.text
	}
}


function updateRing(action,state){
	// console.log(action.text)
	var myChart=echarts.init(document.getElementById('main'));
            // 插入数据,渲染页面
	myChart.setOption(action.text);
	return {
		...state,
		attrOption:action.text
	}
}


//  这个initialOption是默认的最近7天的右下角统计图
var	initialOption = {
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['周一','周二','周三','周四','周五','周六','周日']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'手机热点',
            type:'bar',
            barWidth : 5,
            itemStyle:{
                        normal:{
                        	color:'#52a3ff'
                        }
            },
            stack: '告警信息',
            data:[620, 732, 701, 734, 1090, 1130, 1120]
        },
        {
            name:'动态人脸',
            type:'bar',
            itemStyle:{
                    normal:{
                       	color:'#64ebda'
                    }
            },
            stack: '告警信息',
            data:[120, 132, 101, 134, 290, 230, 220]
        },
        {
            name:'车牌报警',
            type:'bar',
            itemStyle:{
                    normal:{
                       	color:'#ff704f'
                    }
            },
            stack: '告警信息',
            data:[60, 72, 71, 74, 190, 130, 110]
        },
        {
            name:'车辆报警',
            type:'bar',
            itemStyle:{
                    normal:{
                       	color:'#ffb449'
                    }
            },
            stack: '告警信息',
            data:[62, 82, 91, 84, 109, 110, 120]
        }
    ]
};



function getDefaultList(action,state){
	// console.log(action.text)
	// 这个是用户选择了右侧时间控件后,请求的数据
	return {
		...state,
		cjCount:action.text
	}
}

var cjcount;
// 当用户点击切换时间时候的逻辑
function getSelectedTab(action,state){
	// 判断用户选择的时间段
	//console.log(action.text);
	var begintime;
	var endtime;
    
	if(action.text==0){
		// 过去一周
		begintime=moment().add(-1,'week')
		endtime=moment()
		ToggAxios(begintime,endtime)
		return {
			...state,
			activeKey:0,
			begintime:begintime,
			endtime:moment()
		}	

	}else if(action.text==1){
		// 过去一个月
		begintime=moment().add(-1,'month')
		endtime=moment()
		ToggAxios(begintime,endtime)
		return {
			...state,
			activeKey:1,
			begintime:begintime,
			endtime:moment()
		}
	}else if(action.text==2){
		// 过去一个季度
		begintime=moment().add(-3,'month')
		endtime=moment()
		ToggAxios(begintime,endtime)
		return {
			...state,
			activeKey:2,
			begintime:begintime,
			endtime:moment()
		}
	}else if(action.text==3){
		// 近半年
		begintime=moment().add(-6,'month')
		endtime=moment()
		ToggAxios(begintime,endtime)
		return {
			...state,
			activeKey:3,
			begintime:begintime,
			endtime:moment()
		}
	}else if(action.text==4){
		// 最近一年,假数据模拟,后面begintime和endtime拼起来请求
		begintime=moment().add(-1,'year')
		endtime=moment()
		ToggAxios(begintime,endtime)
		return {
			...state,
			activeKey:4,
			begintime:begintime,
			endtime:moment()
		}

	}else{
		// 如果网络出错,默认返回过去7天的结果
		begintime=moment().add(-1,'week')
	}

	return{
		...state,
		begintime:begintime
	}
}

// passEndtime 这个方法用来处理用户右边切换结束时间的
function passEndtime(action,state){
	if(state.begintime){
		// 如果开始时间、结束时间都有的话,就请求数据,渲染页面

		axios.get(`http://172.20.22.43:8742/statical/historyCount?startTime=${state.begintime.format("YYYY-MM-DD")}&endTime=${action.text.format("YYYY-MM-DD")}`)
				.then(res=>{
					cjcount=res.data.content;
					store.dispatch({type:"getDefaultList",text:cjcount})
				})
					.catch(err=>{
						console.log(err)
					})
		// 这里面要做个处理,把左边的Tab选项卡清空

		// 下面再发送axios请求,处理左侧栏的圆环显示问题
		axios.get(`http://172.20.22.43:8742/statical/gjlbtj?startTime=${state.begintime.format("YYYY-MM-DD")}&endTime=${action.text.format("YYYY-MM-DD")}`)
				.then(res=>{
					// 更新intialAttr,那个圆环
					intialAttr={       
                			series : [
			                           {
								            type:'pie',
								            radius: ['50%', '70%'],
								            labelLine: {
			                					normal: {
			                    					show: false
			                					}
			            					},
								            data:[{value:res.data.content.CLGJ_COUNT},{value:res.data.content.KKRLGJ_COUNT},{value:res.data.content.DTRLGJ_COUNT},{value:res.data.content.SJGJ_COUNT}]
			        					}
                    		],
                 		color: ['#ffb449','#ff704f','#64ebda','#52a3ff']
            		};
					// 异步的请求都是要dispatch一个action的
					store.dispatch({type:"getDefaultRing",text:res.data.content})

					// 在发送一个action,更新ring圆环
					// console.log(intialAttr)
					store.dispatch({type:"updateRing",text:intialAttr})
				})

		return {
			...state,
			begintime:state.begintime,
			endtime:action.text,
			activeKey:""
		}
	}else{
		return state
	}
	
}


function getTodayCount(action,state){
	return {
		...state,
		today:action.text
	}
}



// passBegintime 这个方法用来处理用户右边切换结束时间的
function passBegintime(action,state){

// console.log(action.text);
	if(state.endtime){
		// console.log("结束时间不为空");
		// 如果开始时间、结束时间都有的话,就请求数据,渲染页面
		axios.get(`http://172.20.22.43:8742/statical/historyCount?startTime=${action.text.format("YYYY-MM-DD")}&endTime=${state.endtime.format("YYYY-MM-DD")}`)
				.then(res=>{
					cjcount=res.data.content;
					store.dispatch({type:"getDefaultList",text:cjcount})
				})
					.catch(err=>{
						console.log(err)
					})

		// 下面再发送axios请求,处理左侧栏的圆环显示问题
		axios.get(`http://172.20.22.43:8742/statical/gjlbtj?startTime=${action.text.format("YYYY-MM-DD")}&endTime=${state.endtime.format("YYYY-MM-DD")}`)
				.then(res=>{
					// 更新intialAttr,那个圆环
					intialAttr={       
                			series : [
			                           {
								            type:'pie',
								            radius: ['50%', '70%'],
								            labelLine: {
			                					normal: {
			                    					show: false
			                					}
			            					},
								            data:[{value:res.data.content.CLGJ_COUNT},{value:res.data.content.KKRLGJ_COUNT},{value:res.data.content.DTRLGJ_COUNT},{value:res.data.content.SJGJ_COUNT}]
			        					}
                    		],
                 		color: ['#ffb449','#ff704f','#64ebda','#52a3ff']
            		};
					// 异步的请求都是要dispatch一个action的
					store.dispatch({type:"getDefaultRing",text:res.data.content})

					// 在发送一个action,更新ring圆环
					// console.log(intialAttr)
					store.dispatch({type:"updateRing",text:intialAttr})
				})
		// 这里面要做个处理,把左边的Tab选项卡清空, activeKey:""
		return {
			...state,
			begintime:action.text,
			endtime:state.endtime,
			activeKey:""
		}			
	}else{
		return state
	}
	
}



export default function todo(state={begintime:intialBegintime,endtime:intialEndtime,cjCount:initialCount,activeKey:0,option:initialOption,attrOption:intialAttr,ringObject:intialringObject,today:{}},action){
	switch (action.type){
		case 'getSelectedTab':
			return getSelectedTab(action,state)
		case 'getDefaultList':
			return getDefaultList(action,state)
		case 'passEndtime':
				return passEndtime(action,state)
		case 'passBegintime'	:
				return 	passBegintime(action,state)
		case 'getDefaultRing':
			return getDefaultRing(action,state)
		case 'updateRing':
			return updateRing(action,state)
		case "getTodayCount":
			return getTodayCount(action,state)
		default:
			return state
	}
}

// 封装一个函数,用来做axios请求

function ToggAxios(begintime,endtime){
	// 请求数据
	axios.get(`http://172.20.22.43:8742/statical/historyCount?startTime=${begintime.format("YYYY-MM-DD")}&endTime=${moment().format("YYYY-MM-DD")}`)
				.then(res=>{
					// console.log(res);
					cjcount=res.data.content;
					store.dispatch({type:"getDefaultList",text:cjcount})
				})
					.catch(err=>{
						console.log(err)
					})

		// 这个axios请求是 左侧报警属性区分统计
axios.get(`http://172.20.22.43:8742/statical/gjlbtj?startTime=${begintime.format("YYYY-MM-DD")}&endTime=${moment().format("YYYY-MM-DD")}`)
				.then(res=>{
					// 更新intialAttr,那个圆环
					intialAttr={       
                			series : [
			                           {
								            type:'pie',
								            radius: ['50%', '70%'],
								            labelLine: {
			                					normal: {
			                    					show: false
			                					}
			            					},
								            data:[{value:res.data.content.CLGJ_COUNT},{value:res.data.content.KKRLGJ_COUNT},{value:res.data.content.DTRLGJ_COUNT},{value:res.data.content.SJGJ_COUNT}]
			        					}
                    		],
                 		color: ['#ffb449','#ff704f','#64ebda','#52a3ff']
            		};
					// 异步的请求都是要dispatch一个action的
					store.dispatch({type:"getDefaultRing",text:res.data.content})

					// 在发送一个action,更新ring圆环
					// console.log(intialAttr)
					store.dispatch({type:"updateRing",text:intialAttr})
				})
					.catch(err=>{
						console.log(err)
					})
}
