import React,{ Component } from 'react'
import { connect } from 'react-redux'

import "./today.css"

class Today extends Component {
	render(){
		this.props.today.TODAY_CL=this.props.today.TODAY_CL+""
		this.props.today.TODAY_RL=this.props.today.TODAY_RL+""
		this.props.today.TODAY_GJ=this.props.today.TODAY_GJ+""
		return(
				<div className="today">
					<div className="jinri">今日</div>
					<div className="today_num">
						<div className="cls">
							<div className="cls_top">
								<div className="cls_top_dot"></div>
								<div className="cls_num">{this.props.today.TODAY_CL.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')}</div>
							</div>
							<div className="cls_bottom">车辆数</div>
						</div>

						<div className="cls">
							<div className="cls_top">
								<div className="cls_top_dot" style={{background:"#64ebda"}}></div>
								<div className="cls_num">{this.props.today.TODAY_RL.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')}</div>
							</div>
							<div className="cls_bottom">人脸数</div>
						</div>

						<div className="cls">
							<div className="cls_top">
								<div className="cls_top_dot" style={{background:"#ff6d01"}}></div>
								<div className="cls_num">{this.props.today.TODAY_GJ.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')}</div>
							</div>
							<div className="cls_bottom">报警数</div>
						</div>
					</div>
				</div>
			)
	}

}


function mapStateToProps(state) {
  return {
  		today:state.todo.today
  }
}

function mapDispatchToProps(dispatch) {
  return {
   
  }
}

Today=connect(
		mapStateToProps,
		mapDispatchToProps
	)(Today)

export default Today

















