import React, { useRef, useState } from 'react';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Tag, Space, Dropdown ,message} from 'antd';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import request from 'umi-request';
import ProForm, { ModalForm, 
  ProFormText, 
  ProFormDateRangePicker, 
  ProFormSelect,
   DrawerForm, } from '@ant-design/pro-form';
import axios from 'axios'


export default () => {

    // 创建一个表单指向 目的是为了得到一个 表单实例
    const editFrom = useRef(null);
    // 弹出状态，默认隐藏窗口false
    const  [ showEditModal,setShowEditModal] = useState(false)

    const actionRef = useRef();
    const [modalVisit, setModalVisit] = useState(false);
    // const [drawerVisit, setDrawerVisit] = useState(false);

    const columns = [
      {
        title: '订单ID',
        dataIndex: 'did',
        editable: (text, record, index) => {
          return index !== index;
        },
      },
      {
        title: '订单编号',
        dataIndex: 'orderNumber',
      },
      {
          title: '用户id',
          dataIndex: 'uid',
          //不能编辑
          editable: (text, record, index) => {
            return index !== index;
          },
      },
      {
          title: '用户名',
          dataIndex: 'uname',
          copyable: true,     // 是否支持复制
          ellipsis: true,     // 是否自动缩略
      
      },
      {
        title: '场馆类型',
        dataIndex: 'cdleixing',
        search: false,  //不显示搜索表单
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
          const { cdleixing } = cdleixingOne;
          let _cdleixing = ''
          if(cdleixing==1) _cdleixing='篮球'
          if(cdleixing==2) _cdleixing='足球'
          if(cdleixing==3) _cdleixing='乒乓球'
          if(cdleixing==4) _cdleixing='羽毛球'
          if(cdleixing==5) _cdleixing='排球'
          return ( 
            <div>{_cdleixing}</div>
          )
        }
        

      },
      {
        title: '场地编号',
        dataIndex: 'cdid ',
      },
      {
        title: '预约时间',
        dataIndex: 'yytime ',
        search: false,  //不显示搜索表单
      },
      {
        title: '是否需要服务',
        dataIndex: 'fuwu',
        filters: true,
        onFilter: true,     // 本地查找
        valueType: 'select',
        search: false,  //不显示搜索表单
        valueEnum:{
          0: { text: '否', status: 'Default' },
          1: { text: '是', status: 'Processing' },
        },
        render(_,fuwuOne){
          const { fuwu } = fuwuOne;
          let _fuwu = ''
          if(fuwu==0) _fuwu='否'
          if(fuwu==1) _fuwu='是'
          return (
            <div>{_fuwu}</div>
          )
        }
      },
      {
        title: '预约手机号',
        dataIndex: 'reservePhone',
        copyable: true,     // 是否支持复制
        ellipsis: true,     // 是否自动缩略dtype
    },
    {
      title: '场地价格',
      dataIndex: 'sitePrice',
      copyable: true,     // 是否支持复制
      ellipsis: true,     // 是否自动缩略dtype
      search: false,  //不显示搜索表单
    },
    {
      title: '包场类型',
      dataIndex: 'packageType',
      filters: true,
      onFilter: true,     // 本地查找
      valueType: 'select',
      search: false,  //不显示搜索表单
      valueEnum:{
        1: { text: '全场', status: 'Default' },
        2: { text: '半场', status: 'Processing' },
      },
      render(_,packageTypeOne){
        const { packageType } = packageTypeOne;
        let _packageType = ''
        if(packageType==1) _packageType='全场'
        if(packageType==2) _packageType='半场'
        return ( 
          <div>{_packageType}</div>
        )
      }
    },
     {
      title: '付款时间',
      dataIndex: 'paymentAt',
      copyable: true,     // 是否支持复制
      ellipsis: true,     // 是否自动缩略dtype
      search: false,  //不显示搜索表单
      },
      {
          title: '付款金额',
          dataIndex: 'money',
          copyable: true,     // 是否支持复制
          ellipsis: true,     // 是否自动缩略dtype
          search: false,  //不显示搜索表单
      },
      
      {
        title: '订单类型',
        dataIndex: 'dtype',
        filters: true,
        onFilter: true,      // 本地查找
        search: false,  //不显示搜索表单
        valueType: 'select',
        valueEnum:{
          0: { text: '课程订单', status: 'Course' },
          1: { text: '场馆订单', status: 'Venue' },
        },
        render(_,dtypeOne){
          const { dtype } = dtypeOne;
          let _dtype = ''
          if(dtype==0) _dtype='课程订单'
          if(dtype==1) _dtype='场馆订单'
          return ( 
            <div>{_dtype}</div>
          )
        }
    },
  
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
    {
      title: '留言',
      dataIndex: 'message',
      copyable: true,     // 是否支持复制
      ellipsis: true,     // 是否自动缩略dtype
      search: false,  //不显示搜索表单
    },
    {
      title: '所属教练',
      dataIndex: 'coachName',
      copyable: true,     // 是否支持复制
      // ellipsis: true,     // 是否自动缩略dtype
      search: false,  //不显示搜索表单
    },
    {
      title: '下单课程名称',
      dataIndex: 'courseName',
      copyable: true,     // 是否支持复制
      ellipsis: true,     // 是否自动缩略dtype
      search: false,  //不显示搜索表单
    },
    {
      title: '订单创建时间',
      dataIndex: 'createdAt',
      copyable: true,     // 是否支持复制
      ellipsis: true,     // 是否自动缩略dtype
      search: false,  //不显示搜索表单
    },
    {
      title: '订单更新时间',
      dataIndex: 'updatedAt',
      copyable: true,     // 是否支持复制
      ellipsis: true,     // 是否自动缩略dtype
      search: false,  //不显示搜索表单
    },
    {
        title: '操作',
        valueType: 'option',
        render: (text, record, _, action) => [
          <Button onClick={  ()=>  {  setShowEditModal(true); editFrom.current.setFieldsValue(record)    }   }>查编</Button>,  
          
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
        label: '足球',
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
                        const { pageSize,current,did,uid,}  = params;
                        const postData = {}
                        if(uid) postData.uid = uid;
                        if(did) postData.did = did;
                        const resOne = await   axios.post('http://127.0.0.1:7001/admin/order/find',{
                        page: current,
                        limit:pageSize,
                        ...postData,

                      });
                      const { success,res, } = resOne.data;
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
                        orderNumber:rowData.orderNumber,
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
                
                
                
                dateFormatter="string" headerTitle="订单表" toolBarRender={() => [
                   
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
          title="用户详情" 
                visible={modalVisit} 
                  onFinish={async (values) => {
                  console.log(values);

                  const resTwo = await axios.post('http://127.0.0.1:7001/admin/order/create',{
                          did:values.did,
                          orderNumber:values.orderNumber,
                          uid:values.uid,
                          uname:values.uname,
                          cdleixing:values.cdleixing,
                          cdid:values.cdid,
                          yytime:values.yytime,
                          fuwu:values.fuwu,
                          reservePhone:values.reservePhone,
                          sitePrice:values.sitePrice,
                          packageType:values.packageType,
                          paymentAt:values.paymentAt,
                          money:values.money,
                          dtype:values.dtype,
                          state:values.state,
                          message:values.message,
                          coachName:values.coachName,
                          courseName:values.courseName,
                          createdAt:values.createdAt,
                          updatedAt:values.updatedAt,
                          sdid:values.sdid,
                  })

                  const { success,data } = resTwo.date;

                  if(success){
                    message.success('提交成功');
                    return true;
                  } else {
                    message.success('提交失败');
                    return false
                  }

                
            }} onVisibleChange={setModalVisit}>
                
            <ProForm.Group>
              <ProFormText width="md" name="did" label="订单ID" />
              <ProFormText width="md" name="orderNumber" label="订单编号" />
              <ProFormText width="md" name="uid" label="用户id" />
              <ProFormText width="md" name="uname" label="用户名" />
              <ProFormSelect width="md" name='cdleixing' label="场馆类型"  options={CDType} />
              <ProFormText width="md" name="cdid" label="场地编号" />
              <ProFormText width="md" name="yytime" label="预约时间" />
              <ProFormSelect width="md" name="fuwu" label="是否需要服务"   options={Fuwu} />
              <ProFormText width="md" name="reservePhone" label="预约手机号" />
              <ProFormText width="md" name="sitePrice" label="场地价格" />
              <ProFormSelect width="md" name="packageType" label="包场类型" placeholder="半场 and 全场" options={cdType} />
              <ProFormText width="md" name="paymentAt" label="付款时间" />
              <ProFormText width="md" name="money" label="付款金额" />
              <ProFormSelect width="md" name="dtype" label="订单类型" placeholder="课程订单 and 场馆订单"  options={ddType}/>
              <ProFormSelect width="md" name="state" label="订单状态"  tooltip="订单状态"  options={ddState}/>
              <ProFormText width="md" name="message" label="留言" />
              <ProFormText width="md" name="coachName" label="所属教练" />
              <ProFormText width="md" name="courseName" label="下单课程名称" />
              <ProFormText width="md" name="createdAt" label="订单创建时间" />
              <ProFormText width="md" name="updatedAt" label="订单更新时间" />
            </ProForm.Group>
          </ModalForm>

          
         
        </div>





              ]}
            />

       {/* 查修 */}
            <ModalForm
                  title="修改"
                  //弹窗是否打开
                  visible={showEditModal}
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
                          did:values.did,
                          orderNumber:values.orderNumber,
                          uid:values.uid,
                          uname:values.uname,
                          cdleixing:values.cdleixing,
                          cdid:values.cdid,
                          yytime:values.yytime,
                          fuwu:values.fuwu,
                          reservePhone:values.reservePhone,
                          sitePrice:values.sitePrice,
                          packageType:values.packageType,
                          paymentAt:values.paymentAt,
                          money:values.money,
                          dtype:values.dtype,
                          state:values.state,
                          message:values.message,
                          coachName:values.coachName,
                          courseName:values.courseName,
                          createdAt:values.createdAt,
                          updatedAt:values.updatedAt,
                        })
                        // console.log('values.sdid222',values.sdid)
                        const { success,data} = resUpdate.data;
                        if(success){
                          message.success('提交成功');
                          //关闭窗口
                          setShowEditModal(false)
                        } else {
                          message.success('提交失败');
                          return false
                        }
                  }}
              >
                      <ProForm.Group>
                                <ProFormText width="md" name="did" label="订单ID" disabled tooltip="最长为 24 位"  />
                                <ProFormText width="md" name="orderNumber" label="订单编号" tooltip="最长为 24 位" placeholder="请输入订单编号" />
                                <ProFormText width="md" name="uid" label="用户ID" placeholder="请输入用户ID" />
                                <ProFormText width="md" name="uname" label="用户名" placeholder="请输入用户名" />
                                <ProFormSelect width="md" name='cdleixing' label="场馆类型"  options={CDType} />
                                <ProFormText width="md" name="cdid" label="预约的场地编号" placeholder="请输入预约的场地编号" />
                                <ProFormText width="md" name="yytime" label="预约的时间" placeholder="请输入预约的时间" />
                                
                                <ProFormSelect width="md" name="fuwu" label="是否需要服务"   options={Fuwu} />
                                <ProFormText width="md" name="reservePhone" label="预定的手机号" tooltip="最长为 24 位" placeholder="请输入预定的手机号" />
                                <ProFormText width="md" name="sitePrice" label="场地价格" placeholder="场地价格" />
                                <ProFormSelect width="md" name="packageType" label="包场类型" placeholder="半场 and 全场" options={cdType} />
                                <ProFormText width="md" name='paymentAt' label="付款时间"   />
                                <ProFormText width="md" name="money" label="付款金额" placeholder="付款金额" />
                                <ProFormSelect width="md" name="dtype" label="订单类型" placeholder="课程订单 and 场馆订单"  options={ddType}/>

                                <ProFormSelect width="md" name="state" label="订单状态"  tooltip="订单状态"  options={ddState}/>
                                <ProFormText width="md" name="message" label="留言"  placeholder="留言" />
                                <ProFormText width="md" name="coachName" label="课程所属教练" placeholder="课程所属教练" />
                                <ProFormText width="md" name="courseName" label="课程名单" placeholder="课程名单" />
                                <ProFormText width="md" name='paymentAt' label="付款时间"   />
                                <ProFormText width="md" name="updatedAt" label="订单更新时间" placeholder="订单更新时间" />
                                <ProFormText width="md" name="createdAt" label="订单创建时间" placeholder="订单创建时间" />
                      </ProForm.Group>
              </ModalForm>
      </div>
    
  );

};