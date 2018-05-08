import React,{ Component } from 'react'
import { Row, Col, Tabs, DatePicker } from 'antd'
import { connect } from 'react-redux'
import store from '../store/index'
import './bar.css'
import { getSelectedTab } from '../actions/addTodo.js'

import moment from 'moment'

const TabPane = Tabs.TabPane

// 这个bar.js是顶部选择时间的那个组件
class Bar extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={13} >
            <div className="selectTime">
              <Tabs activeKey={this.props.activeKey+''} onChange={this.props.callback}>
                <TabPane tab="近一周" key="0"></TabPane>
                <TabPane tab="近一月" key="1"></TabPane>
                <TabPane tab="近一季" key="2"></TabPane>
                <TabPane tab="近半年" key="3"></TabPane>
                <TabPane tab="近一年" key="4"></TabPane>
                <TabPane tab="全部" key="5"></TabPane>
              </Tabs>
            </div>
          </Col>
          <Col span={4}></Col>
          <Col span={7}>
            <div className="datePick">
              <div style={{float:'right',marginRight:40}}>
                <DatePicker 
                  size="small" 
                  style={{width:"100"}}
                  placeholder="结束时间"
                  onChange={this.props.passEndtime}
                  defaultValue={moment()}
                  value={this.props.endtime}
                >
                </DatePicker></div>
              <div className="to"></div>
              <div style={{float:'right'}}>
                <DatePicker
                  size="small" 
                  style={{width:"100"}}
                  placeholder="开始时间"
                  onChange={this.props.passBegintime}
                  value={this.props.begintime}
                  >
                </DatePicker>
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
    list:state.todo.list,
    activeKey:state.todo.activeKey,
    begintime:state.todo.begintime,
    endtime:state.todo.endtime
  }
}

function mapDispatchToProps(dispatch) {
  return {
   callback:(key)=>{
      store.dispatch(getSelectedTab(key))
   },
   onChange:()=>{
    //console.log(234)
   },
   passEndtime:(value)=>{
    // 用户选择了改变开始日期,就dispatch一个方法去store里面改变结束时间
    //console.log(value.format('YYYY-MM-DD HH:mm:ss'));
    if(value!=null){
      //console.log(value)
      store.dispatch({type:"passEndtime",text:value})
    }
   },
   passBegintime:(value)=>{
    //console.log(v.format('YYYY-MM-DD HH:mm:ss'))
    if(value!=null){
      store.dispatch({type:"passBegintime",text:value})
    }
    
   }
  }
}

Bar=connect(
		mapStateToProps,
		mapDispatchToProps
	)(Bar)

export default Bar









