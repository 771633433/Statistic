// 这个reducer主要是用来处理 下面部分,echart图表相关的数据

export default function updateEchart(state='',action){
	switch(action.type){
		case 'sendChart':
			return state=action.text;
		default:
			return state
	}
}



