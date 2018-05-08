import React,{ Component } from 'react'
import { connect } from 'react-redux'
import store from '../store/index'
import './echart.css';
import echarts from 'echarts';

// 这个echart组件是右下角的统计图

class Echart extends Component{
	componentDidMount(){	
		var myChart=echarts.init(document.getElementById('differ'));
		//this.props.sendChart(myChart);
            // 获取option里面的数据 
		myChart.setOption(this.props.option);
	}
	render(){	
		return(
				<div className="echart">
					<div id="differ"></div>
				</div>
			)
	}
}

function mapStateToProps(state) {
  return {
    myChart:state.modify,
    option:state.todo.option
  }
}

function mapDispatchToProps(dispatch){
	return{
		
	}
}

Echart=connect(
		mapStateToProps,
		mapDispatchToProps
	)(Echart)


export default Echart