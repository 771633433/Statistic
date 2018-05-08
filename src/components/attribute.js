import React,{ Component } from 'react'
import { connect } from 'react-redux'
import './attribute.css'

import echarts from 'echarts';

// 这个attribute组件是  报警属性区分  那个小竖直长条
class Attribute extends Component {
	componentDidMount(){	

	}
	render(){
		return (
			<div className="attr">
				<div className="bjsx">报警属性区分统计</div>
				<div className="ring">
					<div id="main"></div>
					<div className="ring_right">
						<div className="percentage">{this.props.ringObject.CLGJ_PERCENTAGE}</div>
						<div className="percentage_01">{this.props.ringObject.KKRLGJ_PERCENTAGE}</div>
						<div className="percentage_01" style={{color:"#64ebda"}}>{this.props.ringObject.DTRLGJ_PERCENTAGE}</div>
						<div className="percentage_01" style={{color:"#52a3ff"}}>{this.props.ringObject.SJGJ_PERCENTAGE}</div>
					</div>
				</div>
				<div className="tjAmount">
					<div className="tjAmount_detail">
						<div className="clbj_icon"></div>
						<div className="clbj_char">车辆报警</div>
						<div className="clbj_number">{this.props.ringObject.CLGJ_COUNT}</div>
					</div>
					<div className="tjAmount_detail" style={{marginTop:50}}>
						<div className="cpbj_icon"></div>
						<div className="cpbj_char">车牌报警</div>
						<div className="clbj_number">{this.props.ringObject.KKRLGJ_COUNT}</div>
					</div>
					<div className="tjAmount_detail" style={{marginTop:50}}>
						<div className="face_icon"></div>
						<div className="cpbj_char">动态人脸报警</div>
						<div className="clbj_number">{this.props.ringObject.DTRLGJ_COUNT}</div>
					</div>
					<div className="tjAmount_detail" style={{marginTop:50}}>
						<div className="sj_icon"></div>
						<div className="cpbj_char">手机热点报警</div>
						<div className="clbj_number">{this.props.ringObject.SJGJ_COUNT}</div>
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
  return {
  		attrOption:state.todo.attrOption,
  		ringObject:state.todo.ringObject
  }
}

function mapDispatchToProps(dispatch) {
  return {
   
  }
}

Attribute=connect(
		mapStateToProps,
		mapDispatchToProps
	)(Attribute)

export default Attribute


























