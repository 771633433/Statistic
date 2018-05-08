import React,{ Component } from 'react'
import { Row, Col, Tabs, DatePicker } from 'antd'
import { connect } from 'react-redux'
import store from '../store/index'

import './cj.css'
// 这个Cj组件下面的5个统计块

class Cj extends Component {
	render(){
		return (
				<div>
					<Row>
						<Col span={23}>
							<div className="five-box">
								<div className="box">
									<div className="cjgcl">
										<div className="amount">{this.props.cjCount.HIS_CL_COUNT}</div>
										<div className="amount_name">采集过车辆</div>
									</div>
									<div className="increase">
										<div className="dot">
											<div className="dott"></div>
											<div className="dott"></div>
											<div className="dott"></div>
										</div>
										<div className="increase_icon">
											<div className="icon"></div>
											<div className="compare">同上期增长{this.props.cjCount.CL_CHANGE}</div>
										</div>
									</div>
								</div>
								<div className="box">
									<div className="cjgcl">
										<div className="amount">{this.props.cjCount.HIS_RL_COUNT}</div>
										<div className="amount_name">采集人脸数</div>
									</div>
									<div className="increase">
										<div className="dot">
											<div className="dott"></div>
											<div className="dott"></div>
											<div className="dott"></div>
										</div>
										<div className="increase_icon">
											<div className="icon"></div>
											<div className="compare">同上期增长{this.props.cjCount.RL_CHANGE}</div>
										</div>
									</div>
								</div>
								<div className="box">
									<div className="cjgcl">
										<div className="amount">{this.props.cjCount.HIS_SJ_COUNT}</div>
										<div className="amount_name">采集手机信息量</div>
									</div>
									<div className="increase">
										<div className="dot">
											<div className="dott"></div>
											<div className="dott"></div>
											<div className="dott"></div>
										</div>
										<div className="increase_icon">
											<div className="icon_decrease"></div>
											<div className="compare" style={{color:"#e7466a"}}>同上期减少{this.props.cjCount.SJ_CHANGE}</div>
										</div>
									</div>
								</div>
								<div className="box">
									<div className="cjgcl">
										<div className="amount">{this.props.cjCount.HIS_CD_COUNT}</div>
										<div className="amount_name">采集车底照片数</div>
									</div>
									<div className="increase">
										<div className="dot">
											<div className="dott"></div>
											<div className="dott"></div>
											<div className="dott"></div>
										</div>
										<div className="increase_icon">
											<div className="icon_decrease"></div>
											<div className="compare" style={{color:"#e7466a"}}>同上期减少{this.props.cjCount.CD_CHANGE}</div>
										</div>
									</div>
								</div>
								<div className="box" style={{marginRight:0}}>
									<div className="cjgcl">
										<div className="amount">{this.props.cjCount.HIS_GJ_COUNT}</div>
										<div className="amount_name">报警数</div>
									</div>
									<div className="increase">
										<div className="dot">
											<div className="dott"></div>
											<div className="dott"></div>
											<div className="dott"></div>
										</div>
										<div className="increase_icon">
											<div className="icon"></div>
											<div className="compare">同上期增长{this.props.cjCount.RL_CHANGE}</div>
										</div>
									</div>
								</div>
							</div>
						</Col>
					</Row>
        		</div>
			)
	}
}

function mapStateToProps(state) {
  return {
    cjCount:state.todo.cjCount
  }
}

function mapDispatchToProps(dispatch) {
  return {
 
  }
}

Cj=connect(
		mapStateToProps,
		mapDispatchToProps
	)(Cj)

export default Cj