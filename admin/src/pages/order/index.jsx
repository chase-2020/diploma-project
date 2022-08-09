import React, { useRef, useState } from 'react';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Tag, Space, Dropdown ,message, Popconfirm,Descriptions} from 'antd';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import request from 'umi-request';
import ProForm, { ModalForm, 
  ProFormText, 
  ProFormDateRangePicker, 
  ProFormSelect,
   DrawerForm, } from '@ant-design/pro-form';
import axios from 'axios'
import Field from '@ant-design/pro-field';


export default () => {

    // 创建一个表单指向 目的是为了得到一个 表单实例
    const editFrom = useRef(null);
    // 弹出状态，默认隐藏窗口false
    const  [ showEditModal,setShowEditModal] = useState(false)
     const [drawerVisit, setDrawerVisit] = useState(false);

    const actionRef = useRef();
    const [modalVisit, setModalVisit] = useState(false);
    // const [drawerVisit, setDrawerVisit] = useState(false);

    const columns = [
      // {
      //   title: '订单ID',
      //   dataIndex: 'did',
      //   editable: (text, record, index) => { 
      //     return index !== index;
      //   },
      // },
      {
        title: '订单编号',
        dataIndex: 'orderNum',
      },
      {
          title: '用户id',
          dataIndex: 'userid',
          search: false,  //不显示搜索表单
          //不能编辑
          editable: (text, record, index) => {
            return index !== index;
          },
      },
      {
          title: '用户名',
          dataIndex: 'name',
          search: true,  //不显示搜索表单
          copyable: true,     // 是否支持复制
          ellipsis: true,     // 是否自动缩略
      
      },
      {
        title: '场馆类型',
        dataIndex: 'courtType',
      
        filters: true,      // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
        onFilter: true,     // 筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
        valueEnum:{
          1: { text: '篮球', status: 'Default' },
          2: { text: '足球', status: 'Processing' },
          3: { text: '乒乓球', status: 'Success' },
          4: { text: '羽毛球', status: 'Error' },
          5: { text: '排球', status: 'Error' },
        },
        render(_,cdleixingOne){
          const { courtType } = cdleixingOne;
          let _cdleixing = ''
          if(courtType==1) _cdleixing='篮球'
          if(courtType==2) _cdleixing='足球'
          if(courtType==3) _cdleixing='乒乓球'
          if(courtType==4) _cdleixing='羽毛球'
          if(courtType==5) _cdleixing='排球'
          return ( 
            <div>{_cdleixing}</div>
          )
        }
        

      },
      // {
      //   title: '场地编号',
      //   dataIndex: 'cdid',
      //   search: false,  //不显示搜索表单
      // },
      // {
      //   title: '预约时间',
      //   dataIndex: 'yytime ',
      //   search: false,  //不显示搜索表单
      // },
      // {
      //   title: '是否需要服务',
      //   dataIndex: 'fuwu',
      //   filters: true,
      //   onFilter: true,     // 本地查找
      //   valueType: 'select',
      //   search: false,  //不显示搜索表单
      //   valueEnum:{
      //     0: { text: '否', status: 'Default' },
      //     1: { text: '是', status: 'Processing' },
      //   },
      //   render(_,fuwuOne){
      //     const { fuwu } = fuwuOne;
      //     let _fuwu = ''
      //     if(fuwu==0) _fuwu='否'
      //     if(fuwu==1) _fuwu='是'
      //     return (
      //       <div>{_fuwu}</div>
      //     )
      //   }
      // },
      {
        title: '预约手机号',
        dataIndex: 'phone',
        copyable: true,     // 是否支持复制
        ellipsis: true,     // 是否自动缩略dtype
    },




    
    // {
    //   title: '场地价格',
    //   dataIndex: 'sitePrice',
    //   copyable: true,     // 是否支持复制
    //   ellipsis: true,     // 是否自动缩略dtype
    //   search: false,  //不显示搜索表单
    // },
    {
      title: '包场类型',
      dataIndex: 'packageType',
      filters: true,
      onFilter: true,     // 本地查找
      valueType: 'select',
      search: false,  //不显示搜索表单
      valueEnum:{
        0: { text: '无', status: 'Default' },
        1: { text: '全场', status: 'Default' },
        2: { text: '半场', status: 'Processing' },
      },
      render(_,packageTypeOne){
        const { packageType } = packageTypeOne;
        let _packageType = ''
        if(packageType==0) _packageType='无'
        if(packageType==1) _packageType='全场'
        if(packageType==2) _packageType='半场'
        return ( 
          <div>{_packageType}</div>
        )
      }
    },
    //  {
    //   title: '付款时间',
    //   dataIndex: 'paymentAt',
    //   copyable: true,     // 是否支持复制
    //   ellipsis: true,     // 是否自动缩略dtype
    //   search: false,  //不显示搜索表单
    //   },
      {
          title: '付款金额',
          dataIndex: 'money',
          copyable: true,     // 是否支持复制
          ellipsis: true,     // 是否自动缩略dtype
          search: false,  //不显示搜索表单
      },
      
    //   {
    //     title: '订单类型',
    //     dataIndex: 'dtype',
    //     filters: true,
    //     onFilter: true,      // 本地查找
    //     search: false,  //不显示搜索表单
    //     valueType: 'select',
    //     valueEnum:{
    //       0: { text: '课程订单', status: 'Course' },
    //       1: { text: '场馆订单', status: 'Venue' },
    //     },
    //     render(_,dtypeOne){
    //       const { dtype } = dtypeOne;
    //       let _dtype = ''
    //       if(dtype==0) _dtype='课程订单'
    //       if(dtype==1) _dtype='场馆订单'
    //       return ( 
    //         <div>{_dtype}</div>
    //       )
    //     }
    // },
  
    {
      title: '订单状态',
      dataIndex: 'state',
      filters: true,
      onFilter: true,     // 本地查找
      valueType: 'select',
      search: false,  //不显示搜索表单
      valueEnum:{
        1: { text: '未支付', status: 'Default' },
        2: { text: '已支付', status: 'Processing' },
        3: { text: '已取消', status: 'Success' },
        4: { text: '已退款', status: 'Error' },
      },
      render(_,stateOne){
        const { state } = stateOne;
        let _state = ''
        if(state==1) _state='未支付'
        if(state==2) _state='已支付'
        if(state==3) _state='已取消'
        if(state==4) _state='已退款'
        return ( 
          <div>{_state}</div>
        )
      }
    },
    // {
    //   title: '留言',
    //   dataIndex: 'message',
    //   copyable: true,     // 是否支持复制
    //   ellipsis: true,     // 是否自动缩略dtype
    //   search: false,  //不显示搜索表单
    // },
    // {
    //   title: '所属教练',
    //   dataIndex: 'coachName',
    //   copyable: true,     // 是否支持复制
    //   // ellipsis: true,     // 是否自动缩略dtype
    //   search: false,  //不显示搜索表单
    // },
    // {
    //   title: '下单课程名称',
    //   dataIndex: 'courseName',
    //   copyable: true,     // 是否支持复制
    //   ellipsis: true,     // 是否自动缩略dtype
    //   search: false,  //不显示搜索表单
    // },
    // {
    //   title: '订单创建时间',
    //   dataIndex: 'createdAt',
    //   copyable: true,     // 是否支持复制
    //   ellipsis: true,     // 是否自动缩略dtype
    //   search: false,  //不显示搜索表单
    // },
    // {
    //   title: '订单更新时间',
    //   dataIndex: 'updatedAt',
    //   copyable: true,     // 是否支持复制
    //   ellipsis: true,     // 是否自动缩略dtype
    //   search: false,  //不显示搜索表单
    // },
    {
        title: '操作',
        valueType: 'option',
        render: (text, record, _, action) => [
          <a onClick={  ()=>  {  setShowEditModal(record.orderNumber); editFrom.current.setFieldsValue(record);   }   }>编辑</a>,
          // 编辑
          <ModalForm
                  title="编辑"
                  editable="true"
                  //弹窗是否打开
                  visible={showEditModal === record.orderNumber}
                  //通过 formRef 获取到表单实例的引用，通过引用可以调用表单方法实现表单重置，设置表单，获取表单值等功能
                  formRef={editFrom}
                  modalProps={{
                    //取消窗口时触发
                    onCancel: () => setShowEditModal(false)
                  }}
                  onFinish={async (values) => {
                        console.log('values',values)
                        // console.log('values.sdid111',values.sdid)
                        const resUpdate = await  axios.post('http://127.0.0.1:7001/admin/order/update',{
                          did:record.did, // 订单ID
                          orderNumber:values.orderNumber, // 订单编号
                          userid:values.userid, // 用户ID 
                          uname:values.uname, // 用户名
                        // 场馆订单
                          cdleixing:values.cdleixing, // 预约的场地类型
                          cdid:values.cdid, // 预约的场地编号
                          yytime:values.yytime, // 预约时间
                          fuwu:values.fuwu, // 是否需要服务
                          reservePhone:values.reservePhone, // 预约的手机号
                          sitePrice:values.sitePrice, // 场地价格
                          packageType:values.packageType, // 包场类型
                          paymentAt:values.paymentAt, // 付款时间
                          money:values.money, // 付款金额
                          dtype:values.dtype, // 订单类型
                          state:values.state, // 订单状态
                          message:values.message, // 留言
                          coachName:values.coachName, // 下单课程所属教练
                          courseName:values.courseName, // 下单课程类似
                          createdAt:values.createdAt, // 订单创建时间
                          updatedAt:values.updatedAt, // 订单更新时间
                        // 课程订单字段
                          ctid:values.ctid, // 场馆编号
                          mid:values.mid, // 运营商编号
                          courseAddress:values.courseAddress, // 课程上课的地点
                          courseChangDi:values.courseChangDi, // 上课所在场馆
                          coachPhone:values.coachPhone, // 上课教练的电话
                          userNumber:values.userNumber, // 上课人数
                          uid:values.uid, // 用户ID
                          startTime:values.startTime, // 课程开始上课时间
                          endTime:values.endTime, //  课程结束上课时间
                          sjCoachPlace:values.sjCoachPlace, // 私教上课场所
                          sjCoachName:values.sjCoachName, // 私教教练名称
                          coachId:values.coachId, // 私教ID
                          sjBookTime:values.sjBookTime, // 私教预约时间
                          courseNum:values.courseNum, // 课程次数
                          studentAge:values.studentAge, // 学生年龄段

                        })
                        // console.log('values.sdid222',values.sdid)
                        const { success,data} = resUpdate.data;
                        if(success){
                          message.success('提交成功');
                          //关闭窗口
                          setShowEditModal(false)
                          return true;
                        } else {
                          message.success('提交失败');
                          return false
                        }
                  }}
              >
                      {  record.dtype ==1?(
                  <div>
                    <Descriptions
                      bordered
                      // 2列数据
                      column={2}
                      size= 'middle '
                      editable="true"
                  >
                       <ProForm.Group>
                            <ProFormText width="md" name="did" label="订单ID" disabled tooltip="最长为 24 位" placeholder={record.did} />
                            <ProFormText width="md" name="orderNumber" label="订单编号" disabled tooltip="最长为 24 位"  placeholder={record.orderNumber} />
                      </ProForm.Group>
                      <ProForm.Group>
                            <ProFormText width="md" name="userid" label="用户ID" placeholder={record.userid} />
                            <ProFormText width="md" name="uname" label="用户名" placeholder={record.uname} />
                      </ProForm.Group>
                      <ProForm.Group>
                            <ProFormSelect width="md" name='cdleixing' label="场馆类型"  options={CDType} placeholder={record.cdleixing} />
                            <ProFormText width="md" name="cdid" label="预约的场地编号" placeholder={record.cdid} />
                      </ProForm.Group>
                      <ProForm.Group> 
                            <ProFormText width="md" name="reservePhone" label="预定的手机号" tooltip="最长为 24 位" placeholder={record.reservePhone}/>
                            <ProFormSelect width="md" name="fuwu" label="是否需要服务" placeholder={record.fuwu}  options={Fuwu} />
                      </ProForm.Group>
                      <ProForm.Group>
                            <ProFormText width="md" name="money" label="付款金额" placeholder={record.money} />
                            <ProFormText width="md" name="sitePrice" label="场地价格" placeholder={record.sitePrice} />
                      </ProForm.Group>
                      <ProForm.Group>
                            <ProFormText width="md" name="yytime" label="预约的时间" placeholder={record.yytime} />
                            <ProFormSelect width="md" name="packageType" label="包场类型" placeholder={record.packageType} options={cdType} />
                      </ProForm.Group>
                      <ProForm.Group>
                            <ProFormSelect width="md" name="state" label="订单状态"  tooltip="订单状态"  placeholder={record.state} options={ddState}/>
                            <ProFormSelect width="md" name="dtype" label="订单类型" placeholder={record.dtype}  options={ddType}/>
                      </ProForm.Group>
                      <ProForm.Group>
                            <ProFormText width="md" name='paymentAt' label="付款时间"  placeholder={record.paymentAt} />  
                            <ProFormText width="md" name="message" label="留言"  placeholder={record.message} />
                      </ProForm.Group>
                      <ProForm.Group>
                            <ProFormText width="md" name="updatedAt" label="订单更新时间" placeholder={record.updatedAt} />
                      </ProForm.Group>
                      <ProForm.Group>
                            <ProFormText width="md" name="createdAt" label="订单创建时间" placeholder={record.createdAt} />
                      </ProForm.Group>

                      </Descriptions>
                  </div>

              ):(
                <div>
                  <Descriptions
                      bordered
                      // 2列数据
                      column={2}
                      size= 'middle '
                      editable="true"
                  >
                       <ProForm.Group>
                            <ProFormText width="md" name="did" label="订单ID" disabled tooltip="最长为 24 位" placeholder={record.did} />
                            <ProFormText width="md" name="orderNumber" label="订单编号" disabled tooltip="最长为 24 位"  placeholder={record.orderNumber} />
                      </ProForm.Group>
                      <ProForm.Group>
                            <ProFormText width="md" name="userid" label="用户ID" placeholder={record.userid} />
                            <ProFormText width="md" name="uname" label="用户名" placeholder={record.uname} />
                      </ProForm.Group>
                      <ProForm.Group>
                            <ProFormText width="md" name="reservePhone" label="预定的手机号" tooltip="最长为 24 位" placeholder={record.reservePhone}/>
                            <ProFormText width="md" name='paymentAt' label="付款时间"  placeholder={record.paymentAt} />  
                      </ProForm.Group>
                      <ProForm.Group>
                            <ProFormText width="md" name="money" label="付款金额" placeholder={record.money} />
                            <ProFormText width="md" name="sitePrice" label="场地价格" placeholder={record.sitePrice} />
                      </ProForm.Group>
                      <ProForm.Group>
                            <ProFormSelect width="md" name="state" label="订单状态"  tooltip="订单状态"  placeholder={record.state} options={ddState}/>
                            <ProFormSelect width="md" name="dtype" label="订单类型" placeholder={record.dtype}  options={ddType}/>
                      </ProForm.Group>

                      <ProForm.Group>
                            <ProFormText width="md" name="coachName" label="课程所属教练"    placeholder={record.coachName} />
                            <ProFormSelect width="md" name='cdleixing' label="课程类型"  options={CDType} placeholder={record.cdleixing} />
                      </ProForm.Group>
                      <ProForm.Group>
                            <ProFormText width="md" name="courseAddress" label="课程地点"    placeholder={record.courseAddress} />
                            <ProFormText width="md" name='courseChangDi' label="课程所在场馆"   placeholder={record.courseChangDi} />
                      </ProForm.Group>
                      <ProForm.Group>
                            <ProFormText width="md" name="coachPhone" label="上课教练的电话"    placeholder={record.coachPhone} />
                            <ProFormText width="md" name='userNumber' label="上课的人数"   placeholder={record.userNumber} />
                      </ProForm.Group>
                      <ProForm.Group>
                            <ProFormText width="md" name="startTime" label="课程开始上课时间"    placeholder={record.startTime} />
                      </ProForm.Group>
                      <ProForm.Group>
                            <ProFormText width="md" name='endTime' label="课程结束上课时间"   placeholder={record.endTime} />
                      </ProForm.Group>

                      <ProForm.Group>
                            <ProFormText width="md" name="updatedAt" label="订单更新时间" placeholder={record.updatedAt} />
                      </ProForm.Group>
                      <ProForm.Group>
                            <ProFormText width="md" name="createdAt" label="订单创建时间" placeholder={record.createdAt} />
                      </ProForm.Group>

                      </Descriptions>
                </div>
              )}
              </ModalForm>,
          // 删除
          <Popconfirm
					title="确定要删除吗？"
					okText="是"
					cancelText="否"
					onConfirm={async () => {
						const resTow = await axios.post('http://127.0.0.1:7001/admin/order/delete', {
							did: record.did,
						})
						//拿接口返回来的状态(success)值true或者false
						const { success } = resTow.data;
						if (success) {
							message.success('删除成功');
							actionRef.current.reload();
							return true;
						} else {
							message.success('删除失败');
							return false
						}
					}}
				>
					<a href="#">删除</a>
				</Popconfirm>,

          // 详情
         <DrawerForm
            width="800px"
            title="详情"
            trigger={ <a type="primary" > 更多 </a> }
            onFinish={async () => {
              return true;
            }}
            onVisibleChange={() => {
              actionRef.current.reload();
            }}
            
            >

              {  record.dtype ==1?(
                  <div>
                    <Descriptions
                      bordered
                      // 2列数据
                      column={2}
                      size= 'middle '
                      
                  >
                      <Descriptions.Item label="订单ID">
                        <Field text={record.did} valueType="text" />
                      </Descriptions.Item>
                      <Descriptions.Item label="订单编号">
                        <Field text={record.orderNumber} valueType="text" />
                      </Descriptions.Item>
                      <Descriptions.Item label="用户ID">
                        <Field text={record.userid} valueType="text" />
                      </Descriptions.Item>
                      <Descriptions.Item label="用户名">
                        <Field text={record.uname} valueType="text" />
                      </Descriptions.Item>
                      <Descriptions.Item label="预约场馆类型">
                        <Field 
                              text={record.cdleixing} 
                              valueType="text" 
                              render={(stateOne) => {
                                let _state = ''
                                if(stateOne==1) _state='篮球'
                                if(stateOne==2) _state='足球'
                                if(stateOne==3) _state='羽毛球'
                                if(stateOne==4) _state='乒乓球'
                                if(stateOne==5) _state='排球'
                                return ( 
                                  <div>{_state}</div>
                                )
                              }}
                        />
                      </Descriptions.Item>
                      <Descriptions.Item label="预约场地编号">
                        <Field text={record.cdid} valueType="text" />
                      </Descriptions.Item>
                      <Descriptions.Item label="是否需要场馆服务">
                        <Field 
                              text={record.fuwu} 
                              valueType="text" 
                              render={(stateOne) => {
                                let _state = ''
                                if(stateOne==0) _state='否'
                                if(stateOne==1) _state='是'
                                return ( 
                                  <div>{_state}</div>
                                )
                              }}
                        />
                      </Descriptions.Item>
                      <Descriptions.Item label="预约手机号">
                        <Field text={record.reservePhone} valueType="text" />
                      </Descriptions.Item>
                      <Descriptions.Item label="包场类型">
                        <Field 
                              text={record.packageType} 
                              valueType="text" 
                              render={(stateOne) => {
                                let _state = ''
                                if(stateOne==1) _state='半场'
                                if(stateOne==2) _state='全场'
                                return ( 
                                  <div>{_state}</div>
                                )
                              }}
                        />
                      </Descriptions.Item>
                      <Descriptions.Item label="订单类型">
                        <Field 
                              text={record.dtype} 
                              valueType="text" 
                              render={(stateOne) => {
                                let _state = ''
                                if(stateOne==0) _state='课程订单'
                                if(stateOne==1) _state='场馆订单'
                                return ( 
                                  <div>{_state}</div>
                                )
                              }}
                        />
                      </Descriptions.Item>
                      <Descriptions.Item label="预约时间">
                        <Field text={record.yytime} valueType="dateTime" />
                      </Descriptions.Item>
                      <Descriptions.Item label="付款时间">
                        <Field text={record.paymentAt} valueType="text" />
                      </Descriptions.Item>
                      <Descriptions.Item label="付款金额">
                        <Field text={record.money} valueType="text" />
                      </Descriptions.Item>
                      <Descriptions.Item label="场地价格">
                        <Field text={record.sitePrice} valueType="text" />
                      </Descriptions.Item>
                      
                      <Descriptions.Item label="订单状态">
                        <Field 
                              text={record.state} 
                              valueType="text"
                              render={(stateOne) => {
                                let _state = ''
                                if(stateOne==1) _state='未支付'
                                if(stateOne==2) _state='已支付'
                                if(stateOne==3) _state='已取消'
                                if(stateOne==4) _state='已退款'
                                return ( 
                                  <div>{_state}</div>
                                )
                              }} 
                        />
                      </Descriptions.Item>
                      <Descriptions.Item label="留言">
                        <Field text={record.message} valueType="text" />
                      </Descriptions.Item>
                      <Descriptions.Item label="创建时间">
                        <Field text={record.createdAt} valueType="text" />
                      </Descriptions.Item>
                      <Descriptions.Item label="更新时间">
                        <Field text={record.updatedAt} valueType="text" />
                      </Descriptions.Item>

                      </Descriptions>
                  </div>

              ):(
                <div>
                  <Descriptions
                      bordered
                      // 2列数据
                      column={2}
                      size= 'small'
                      
                  >
                      <Descriptions.Item label="订单ID">
                        <Field text={record.did} valueType="text" />
                      </Descriptions.Item>
                      <Descriptions.Item label="订单编号">
                        <Field text={record.orderNumber} valueType="text" />
                      </Descriptions.Item>
                      <Descriptions.Item label="用户ID">
                        <Field text={record.userid} valueType="text" />
                      </Descriptions.Item>
                      <Descriptions.Item label="用户名">
                        <Field text={record.uname} valueType="text" />
                      </Descriptions.Item>
                     
                      <Descriptions.Item label="预约手机号">
                        <Field text={record.reservePhone} valueType="text" />
                      </Descriptions.Item>
                     
                      <Descriptions.Item label="付款时间">
                        <Field text={record.paymentAt} valueType="text" />
                      </Descriptions.Item>
                      <Descriptions.Item label="付款金额">
                        <Field text={record.money} valueType="text" />
                      </Descriptions.Item>
                      <Descriptions.Item label="订单类型">
                      <Field 
                              text={record.dtype} 
                              valueType="text" 
                              render={(stateOne) => {
                                let _state = ''
                                if(stateOne==0) _state='课程订单'
                                if(stateOne==1) _state='场馆订单'
                                return ( 
                                  <div>{_state}</div>
                                )
                              }}
                        />
                      </Descriptions.Item>
                      <Descriptions.Item label="订单状态">
                      <Field 
                              text={record.state} 
                              valueType="text"
                              render={(stateOne) => {
                                let _state = ''
                                if(stateOne==1) _state='未支付'
                                if(stateOne==2) _state='已支付'
                                if(stateOne==3) _state='已取消'
                                if(stateOne==4) _state='已退款'
                                return ( 
                                  <div>{_state}</div>
                                )
                              }} 
                        />
                      </Descriptions.Item>
                      <Descriptions.Item label="留言">
                        <Field text={record.message} valueType="text" />
                      </Descriptions.Item>
                      <Descriptions.Item label="课程所属的教练">
                        <Field text={record.coachName} valueType="text" />
                      </Descriptions.Item>
                      <Descriptions.Item label="课程类型">
                      <Field 
                              text={record.state} 
                              valueType="text"
                              render={(stateOne) => {
                                let _state = ''
                                if(stateOne==1) _state='篮球'
                                if(stateOne==2) _state='足球'
                                if(stateOne==3) _state='乒乓球'
                                if(stateOne==4) _state='羽毛球'
                                if(stateOne==5) _state='排球'
                                return ( 
                                  <div>{_state}</div>
                                )
                              }} 
                        />
                      </Descriptions.Item>
                      <Descriptions.Item label="课程地点">
                        <Field text={record.courseAddress} valueType="text" />
                      </Descriptions.Item>
                      <Descriptions.Item label="课程所属场馆">
                        <Field text={record.courseChangDi} valueType="text" />
                      </Descriptions.Item>
                      <Descriptions.Item label="上课教练的电话">
                        <Field text={record.coachPhone} valueType="text" />
                      </Descriptions.Item>
                      <Descriptions.Item label="上课的人数">
                        <Field text={record.userNumber} valueType="text" />
                      </Descriptions.Item>
                      <Descriptions.Item label="课程开始上课时间">
                        <Field text={record.startTime} valueType="text" />
                      </Descriptions.Item>
                      <Descriptions.Item label="课程结束上课时间">
                        <Field text={record.endTime} valueType="text" />
                      </Descriptions.Item>
                      <Descriptions.Item label="创建时间">
                        <Field text={record.createdAt} valueType="text" />
                      </Descriptions.Item>
                      <Descriptions.Item label="更新时间">
                        <Field text={record.updatedAt} valueType="text" />
                      </Descriptions.Item>

                      </Descriptions>
                </div>
              )}
            
                  
                  
            

          </DrawerForm>,

        ],
    },
  ];

    const CDType = [
      {
        value: 1,
        label: '篮球',
      },
      {
        value: 2,
        label: '足球',
      },
      {
        value: 3,
        label: '乒乓球',
      },
      {
        value: 4,
        label: '羽毛球',
      },
      {
        value: 5,
        label: '排球',
      },
    ];

    const Fuwu = [
      {
        value: 0,
        label: '否',
      },
      {
        value: 1,
        label: '是',
      },
    ];
    const cdType = [
      {
        value: 0,
        label: '无',
      },
      {
        value: 1,
        label: '全场',
      },
      {
        value: 2,
        label: '半场',
      },
    ];
    const ddType = [
      {
        value: 0,
        label: '课程订单',
      },
      {
        value: 1,
        label: '场馆订单',
      },
    ];
    const ddState = [
      {
        value: 1,
        label: '未支付',
      },
      {
        value: 2,
        label: '已支付',
      },
      {
        value: 3,
        label: '已取消',
      },
      {
        value: 4,
        label: '已退款',
      },
    ];








    return (
      <div>
            <ProTable 
                    columns={columns} 
                    actionRef={actionRef} 
                    // 行的 key ,一般是行ID
                    rowKey="did" 
                    // 搜索的表单
                    search={{
                      // 表单的宽度
                    labelWidth: 'auto',
                    }}
                    // 一页 默认多少行数据
                    pagination={{
                      pageSize: 10,
                    }} 

                    // 所有数据与查找
                    request={async (params) => {
                        const { pageSize,current,did,userid,orderNumber,reservePhone,cdid,uname}  = params;
                        const postData = {}
                        if(userid) postData.userid = userid;
                        if(did) postData.did = did;
                        if(uname) postData.uname = uname;
                        if(orderNumber) postData.orderNumber = orderNumber;
                        if(reservePhone) postData.reservePhone = reservePhone;
                        if(cdid) postData.cdid = cdid;
                        const resOne = await   axios.post('http://127.0.0.1:7001/admin/order/find',{
                        page: current,
                        limit:pageSize,
                        ...postData,

                      });
                      console.log(resOne)
                      console.log('res',resOne.data)
                      const { success,res} = resOne.data;
                      const total = res.count;    // 数据数量
                      const data = res.rows;      // 数据内容
                      
                      return {      
                        total,
                        data,
                        success
                      }

                }} 
                // 可编辑表格
                editable={{
                    type: 'multiple',
                    // 删除数据
                    onDelete: async (tow,rowData) =>{
                      console.log('rowData.did',rowData.did);
                      const expurgate = await axios.post('http://127.0.0.1:7001/admin/order/delete',{
                        did:rowData.did,
                      })
                      const { success } = expurgate.data;
                      if( success ){
                        message.success('删除成功');
                        return true;
                      } else {
                        message.success('删除失败');
                        return false
                      }
                    },
                }}
                    

                

                form={{
                    // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
                    syncToUrl: (values, type) => {
                        if (type === 'get') {
                            return Object.assign(Object.assign({}, values), { created_at: [values.startTime, values.endTime] });
                        }
                        return values;
                    },
                }} 
                
                
                
                dateFormatter="string" headerTitle="订单列表" toolBarRender={() => [
                   
        <div>
          <Space>
            <Button type="primary" onClick={() => {
                setModalVisit(true);
            }}>
              {/* <PlusOutlined />      加号图标  */}
              添加
            </Button>
            
          </Space>
          <ModalForm 

          // 添加
          title="添加订单" 
                visible={modalVisit} 
                formRef={editFrom}
                  modalProps={{
                    // 重置添加表里面的信息
                    destroyOnClose: true,
                    //取消窗口时触发
                    onCancel: () => setShowEditModal(false)
                  }}
                  onFinish={async (values) => {
                  console.log(values);

                  const resTwo = await axios.post('http://127.0.0.1:7001/admin/order/create',{
                    did:values.did,
                    orderNumber:values.orderNumber,
                    userid:values.userid,
                    uname:values.uname,
                    cdleixing:values.cdleixing,
                    cdid:values.cdid,
                    yytime:values.yytime,
                    fuwu:values.fuwu,
                    reservePhone:values.reservePhone,
                    sitePrice:values.sitePrice,
                    packageType:values.packageType,
                    money:values.money,
                    dtype:values.dtype,
                    state:values.state,
                    message:values.message,
                    coachName:values.coachName,
                    courseName:values.courseName,
                    createdAt:values.createdAt,
                    updatedAt:values.updatedAt,
                    paymentAt:values.paymentAt,
                  })

                  const { success,data } = resTwo.data;

                  if(success){
                    message.success('提交成功');
                    //关闭窗口
                    setShowEditModal(false)
                    return true;
                  } else {
                    message.success('提交失败');
                    return false
                  }

                
            }} onVisibleChange={setModalVisit}>
                
            <ProForm.Group>
              <ProFormText width="md" name="orderNumber" label="订单编号" />
              <ProFormText width="md" name="userid" label="用户id" />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormText width="md" name="uname" label="用户名" />
              <ProFormSelect width="md" name='cdleixing' label="场馆类型"  options={CDType} />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormText width="md" name="cdid" label="场地编号" />
              <ProFormText width="md" name="yytime" label="预约时间" />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormSelect width="md" name="fuwu" label="是否需要服务"   options={Fuwu} />
              <ProFormText width="md" name="reservePhone" label="预约手机号" />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormText width="md" name="sitePrice" label="场地价格" />
              <ProFormSelect width="md" name="packageType" label="包场类型" placeholder="半场 and 全场" options={cdType} />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormText width="md" name="money" label="付款金额" />
              <ProFormSelect width="md" name="dtype" label="订单类型" placeholder="课程订单 and 场馆订单"  options={ddType}/>
            </ProForm.Group>
            <ProForm.Group>
              <ProFormSelect width="md" name="state" label="订单状态"  tooltip="订单状态"  options={ddState}/>
              <ProFormText width="md" name="message" label="留言" />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormText width="md" name="coachName" label="所属教练" />
              <ProFormText width="md" name="courseName" label="下单课程名称" />
            </ProForm.Group>
          </ModalForm>

          
         
        </div>





              ]}
            />

       {/* 编辑 */}
            

              
        
      </div>
    
  );

};