// action 创建函数

export function getSelectedTab(key){
	return{
		type:'getSelectedTab',
		text:key
	}
	
}


export function getId(id){
	return{
		type:'getId',
		text:id
	}	
	
}


export function getList(list){
	return{
		type:'check',
		text:list
	}		
}
