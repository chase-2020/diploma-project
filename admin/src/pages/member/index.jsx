import React, { useState, useRef, useEffect } from 'react';
import { Button, Tag, Space, message, Select, Popconfirm, Descriptions,DatePicker } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, {
	ModalForm,
	ProFormText,
	ProFormSelect,
	DrawerForm,
  ProFormDateTimePicker,
  ProFormDatePicker,
  ProFormTextArea,
} from '@ant-design/pro-form';

import request from 'umi-request';
import axios from 'axios';
import moment from 'moment';
import Field from '@ant-design/pro-field';
import {findMember,updateMember,createMember,deleteMember} from '../../services/ant-design-pro/api'

function Member() {
  	// 弹窗刷新页面
	const actionRef = useRef();
  // 创建一个表单指向 目的是为了得到一个 表单实例
  const editFrom = useRef(null);
  const editFromOne = useRef(null);
  // 弹出状态，默认隐藏窗口false
  const  [ showEditModal,setShowEditModal] = useState(false)

    // 查看 弹窗
	const [see, setSee] = useState(false)

  const columns= [
 
    {
      title: '会员编号',
      dataIndex: 'vipId',
      copyable: true, // 是否支持复制
      ellipsis: true, // 是否支持缩略
      // 第二行不允许编辑,index !== 0;
      //text:取得相对应dataIndex的vipId该行值, record:行内容, index:行下标，从0开始
      // editable: ( index) => {
        
      //   return index !== index;
      // },
    },
    {
      title: '会员卡号',
      dataIndex: 'vipNumber',
      search: true, //是否显示搜索表单，传入对象时为搜索表单的配置
      align: 'center',
    },
    {
      title: '性别',
      dataIndex: 'vipSex',
      ellipsis: true, // 是否支持缩略
      search: false,  //不显示搜索表单
      align: 'center',
      // filters: true, //表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      // onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueEnum:{
        0: { text: '男', status: 'Nan' },
        1: { text: '女', status: 'Nv' },
       
      },
      render(_,record){
        const { vipSex } = record;
        let _typestr = ''
        if(vipSex==0) _typestr="男"
        if(vipSex==1) _typestr="女"
        return ( 
          <div>{_typestr}</div>
        )
      }
    },
    {
      title: '会员卡类型',
      dataIndex: 'vipType',
      align: 'center',
      search: true,  //显示搜索表单
      ellipsis: true, // 是否支持缩略
      filters: true, //表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选

      valueEnum:{
        0: { text: '年卡', status: 'Default' },
        1: { text: '月卡', status: 'Processing' },
        2: { text: '季卡', status: 'Yue' },
        3: { text: '周卡', status: 'Success' },
        4: { text: '次卡', status: 'Error' },
        5: { text: '半年卡', status: 'ban' },
        // 6: {text: '全部', status: 'all'},
      },
      render(_,record){
        const { vipType } = record;
        let _typestr = ''
        if(vipType==0) _typestr="年卡"
        if(vipType==1) _typestr="月卡"
        if(vipType==2) _typestr="季卡"
        if(vipType==3) _typestr="周卡"
        if(vipType==4) _typestr="次卡"
        if(vipType==5) _typestr="半年卡"
        //if(vipType==6) _typestr="全部"
        return ( 
          <div>{_typestr}</div>
        )
      }
    },
    {
      title: '会员姓名',
      dataIndex: 'vipName',
      align: 'center',
      search: true,  //显示搜索表单
      ellipsis: true, // 是否支持缩略
    },
    {
      title: '消费的项目',
      dataIndex: 'spendItem',
      align: 'center',
      ellipsis: true, // 是否支持缩略
      search: false,  //不显示搜索表单
      
    },

    {
      title: '会员电话',
      dataIndex: 'vipPhone',
      align: 'center',
      ellipsis: true, // 是否支持缩略
      search: false,  //不显示搜索表单
      
    },
    {
      title: '会员状态',
      dataIndex: 'vipState',
      align: 'center',
      ellipsis: true, // 是否支持缩略
      search: true,  //不显示搜索表单
      valueEnum:{
        
        0: { text: '不可用', status: 'Success' },
        1: { text: '可用', status: 'Error' },
      },
      render(_,record){
        const { vipState } = record;
        let _typestr = ''
        if(vipState==0) _typestr="不可用"
        if(vipState==1) _typestr="可用"
        
        return ( 
          <div>{_typestr}</div>
        )
      }
    },

    {
			title: '操作',
			valueType: 'option',
			align: 'center',
			//text:未知 record:行内容 san:第几行,从0开始 action:未知
			render: (text, record, san, action) => [
				<a onClick={() => {
          
					setShowEditModal(true);
					// 判断网页渲染的场馆类型是否属于字符串，是进行转数组
					// 用于多选下拉框，在弹窗界面正常显示羽毛球，乒乓球等多个内容
					
						// 把表单数据传入弹窗
						//setFieldsValue设置表单的值(form表单)
            
						editFrom.current.setFieldsValue(record)
				}}>
					编辑
				</a>,
				
				<Popconfirm
					title="是否删除数据？"
					okText="是"
					cancelText="否"
					onConfirm={async () => {
						const resTow = await deleteMember( {
							vipId: record.vipId,
						})
						//拿接口返回来的状态(success)值true或者false
						const { success } = resTow;
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
					<a>删除</a>
				</Popconfirm>,
				<DrawerForm
                    // DrawerForm没有modalProps={{onCancel: () => {}}}取消时触发
					width="800px"
					title="全部数据"
					trigger={
						<a type="primary" > 查看
             </a>
					}
                    onFinish={async () => {
                        // 确认按钮 触发关闭弹窗
                        return true;
                      }}
					onVisibleChange={() => {
						actionRef.current.reload();
					}}
				>
					<Descriptions
                        // 有边框
						bordered
						// 2列数据
						column={1}
					>
              <Descriptions.Item label="会员卡编号">
							<Field text={record.vipId} valueType="digit" />
						</Descriptions.Item>
						<Descriptions.Item label="会员卡号">
							<Field text={record.vipNumber} valueType="text" />
						</Descriptions.Item>
						<Descriptions.Item label="会员姓名">
							<Field text={record.vipName} valueType="text" />
            </Descriptions.Item>
            <Descriptions.Item label="会员性别">
            <Field 
                                text={record.type} 
                                valueType="vipSex" 
                                render={(type,b)=> {
                                    let jobSex = typeof type === 'string' ? type.split(',') : []// ["1", "2", "3"]
                                    const typeArrOne = []
                                    let _typestr = ''
                                    for (const i of jobSex) {
                                        if (i == 0) _typestr = "男"
                                        if (i == 1) _typestr = "女"
                                        typeArrOne.push(_typestr)
                                    }
                                    return (
                                        <div>{typeArrOne.join('、')}</div>
                                    )
                                }}
                            />
						</Descriptions.Item>
						<Descriptions.Item label="会员卡类型">
							<Field 
                                text={record.type} 
                                valueType="vipType" 
                                render={(type,b)=> {
                                    let jobType = typeof type === 'string' ? type.split(',') : []// ["1", "2", "3"]
                                    const typeArrOne = []
                                    let _typestr = ''
                                    for (const i of jobType) {
                                        if (i == 0) _typestr = "年卡"
                                        if (i == 1) _typestr = "月卡"
                                        if (i == 2) _typestr = "季卡"
                                        if (i == 3) _typestr = "周卡"
                                        if (i == 4) _typestr = "次卡"
                                        if (i == 5) _typestr = "半年卡"
                                        typeArrOne.push(_typestr)
                                    }
                                    return (
                                        <div>{typeArrOne.join('、')}</div>
                                    )
                                }}
                            />
						</Descriptions.Item>
                        <Descriptions.Item label="消费项目">
							<Field text={record.spendItem} valueType="text" />
						</Descriptions.Item>
            <Descriptions.Item label="会员电话">
							<Field text={record.vipPhone} valueType="text" />
						</Descriptions.Item>
            <Descriptions.Item label="会员状态">
							<Field 
                                text={record.type} 
                                valueType="spendItem" 
                                render={(type,b)=> {
                                    let jobState = typeof type === 'string' ? type.split(',') : []// ["1", "2", "3"]
                                    const typeArrOne = []
                                    let _typestr = ''
                                    for (const i of jobState) {
                                        if (i == 0) _typestr = "不可用"
                                        if (i == 1) _typestr = "可用"
                                        typeArrOne.push(_typestr)
                                    }
                                    return (
                                        <div>{typeArrOne.join('、')}</div>
                                    )
                                }}
                            />
						</Descriptions.Item>
            <Descriptions.Item label="开卡日期">
							<Field text={record.startTime} valueType="date" />
						</Descriptions.Item>
            <Descriptions.Item label="到期日期">
							<Field text={record.endTime} valueType="date" />
						</Descriptions.Item>
            <Descriptions.Item label="消费总额">
							<Field text={record.totalSpend} valueType="text" />
						</Descriptions.Item>
            <Descriptions.Item label="会员积分">
							<Field text={record.vipIntegral} valueType="text" />
						</Descriptions.Item>
            <Descriptions.Item label="卡内余额">
							<Field text={record.cardsRemain} valueType="text" />
						</Descriptions.Item>
            <Descriptions.Item label="会员生日">
							<Field text={record.vipBirthday} valueType="date" />
						</Descriptions.Item>
            <Descriptions.Item label="会员卡折后价格">
							<Field text={record.vipQian} valueType="text" />
						</Descriptions.Item>
            <Descriptions.Item label="会员卡实际价格">
							<Field text={record.vipMoney} valueType="text" />
						</Descriptions.Item>
            <Descriptions.Item label="会员卡图片">
							<Field text={record.vipImg} valueType="text" />
						</Descriptions.Item>
            <Descriptions.Item label="有效天数">
							<Field text={record.vipDays} valueType="text" />
						</Descriptions.Item>
            <Descriptions.Item label="可约课次数">
							<Field text={record.vipyueke} valueType="text" />
						</Descriptions.Item>
            <Descriptions.Item label="可约课创建时间次数">
							<Field text={record.createdAt} valueType="text" />
						</Descriptions.Item>
            <Descriptions.Item label="更新时间">
							<Field text={record.updatedAt} valueType="text" />
						</Descriptions.Item>
					</Descriptions>
				</DrawerForm>,
			],
		},
  
  ];
    const jobSex = [
      {
        value: 0,
        label: '男',
      },
      {
        value: 1,
        label: '女',
      }
    ];
    const jobState = [
      {
        value: 0,
        label: '不可用',
      },
      {
        value: 1,
        label: '可用'
      }
    ];
    const jobType = [
      {
        value: 0,
        label: '年卡',
      },
      {
        value: 1,
        label: '月卡',
      },
      {
        value: 2,
        label: '季卡',
      },
      {
        value: 3,
        label: '周卡',
      },
      {
        value: 4,
        label: '次卡',
      },
      {
        value: 5,
        label: '半年卡',
      },
    ];

  return (
    <PageContainer>
         <ProTable
              // 渲染表单数据第一行
              columns={columns}
              // 弹窗刷新页面
				      actionRef={actionRef}
              //搜索表单
              search={{
                //标签的宽度
                labelWidth: 'auto',
              }} 
              /* 默认一页显示多少数据 */
              pagination={{
                pageSize: 20,
              }}
              /* 转化 moment 格式数据为特定类型，false 不做转化 */
              dateFormatter="string"
              /* 列表头部主标题 */
              headerTitle="会员卡管理表格"
              //行的 key，一般是行 id
              rowKey="vipId"
            request={async (params) => {
                   //根据搜索
                    const { pageSize,current,vipId,vipName,vipNumber,vipType,vipState}  = params;
                    console.log('params',params)

                    //查询对象属性值
                    const postData = {}
                    if(vipId) postData.vipId = vipId;
                    if(vipName) postData.vipName = vipName;
                    if(vipNumber) postData.vipNumber = vipNumber
                    if(vipType) postData.vipType = vipType
                    if(vipState) postData.vipState = vipState
                    const resOne = await findMember({
                      page: current,
                      limit:pageSize,
                      ...postData

                    })
                    //res接口有多少条数据
                    console.log(resOne)
                    console.log(resOne.data)
                    const { success,rows,count } = resOne.res;
                    const total = count;
                    const data = rows;
                    
                    return {
                      total,
                      data,
                      success
                    }
            }}

            form={{
              // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
              syncToUrl: (values, type) => {
                if (type === 'get') {
                  return {
                    ...values,
                    created_at: [values.startTime, values.endTime],
                  };
                }
                return values;
              },
            }}

            toolBarRender={ () => [
                  <ModalForm
                        title="添加会员卡信息"
                        trigger={
                          <Button type="primary">
                                  <PlusOutlined />
                                  添加会员卡
                          </Button>
                        }
                        modalProps={{
                          onCancel: () => console.log('run'),
                          
                        }}
                        onVisibleChange={() => {
                          // 刷新
                          actionRef.current.reload();
                        }}
                        onFinish={async (values) => {
                              const res1 = await  createMember({
                                    vipNumber: values.vipNumber,
                                    vipSex: values.vipSex,
                                    vipName: values.vipName,
                                    vipPhone: values.vipPhone,
                                    vipType: values.vipType,
                                    spendItem: values.spendItem,
                                    vipState: values.vipState,
                              })
                              console.log(res1)
                              if(res1.success==true){
                                message.success(res1.info);
                                console.log('123',123)
                                return true
                              } 
                              else {
                                message.warning(res1.errorMessage);
                                console.log(res1.info)
                                console.log('123',123)
                                return false
                              }
                        }}
                  >
                      <ProForm.Group>
                        <ProFormText
                                width="md"
                                name="vipNumber"
                                label="会员卡号"
                                tooltip="最长为 24 位"
                                placeholder="请输入卡号"
                        />
                        <ProFormSelect width="md" name="vipSex" label="会员性别" options={jobSex} />
                      </ProForm.Group>
                      <ProForm.Group>
                        <ProFormSelect width="md" name='vipType' label="会员卡类型"  options={jobType} />
                        <ProFormText width="md" name="vipPhone" label="会员联系电话" placeholder="请输入会员联系电话" />
                      </ProForm.Group>
                      <ProForm.Group>
                        <ProFormText width="md" name="vipName" label="会员卡姓名" placeholder="请输入会员姓名" />
                        <ProFormText width="md" name="spendItem" label="消费的项目" placeholder="请输入消费的项目" />
                      </ProForm.Group>
                      <ProForm.Group>
                        <ProFormSelect width="md" name="vipState" label="会员卡的状态" options={jobState} />
                      </ProForm.Group>
                  </ModalForm>
            ]}
    />
    <ModalForm
            title="修改商品订单信息"
            //弹窗是否打开
            visible={showEditModal}
            //通过 formRef 获取到表单实例的引用，通过引用可以调用表单方法实现表单重置，设置表单，获取表单值等功能
            formRef={editFrom}
            modalProps={{
              //取消窗口时触发
              onCancel: () => setShowEditModal(false)
            }}
            onVisibleChange={() => {
              // 刷新
              actionRef.current.reload();
            }}
            onFinish={async (values) => {

                  const resUpdate = await  updateMember({
                    vipId:values.vipId,
                    vipName:values.vipName,
                    vipSex:values.vipSex,
                    vipType:values.vipType,
                    vipPhone:values.vipPhone,
                    vipState:values.vipState,
                    vipDays:values.vipDays,
                    vipyueke:values.vipyueke,
                    startTime:values.startTime,
                    endTime:values.endTime,
                    totalSpend:values.totalSpend,
                    spendItem:values.spendItem,
                    vipIntegral:values.vipIntegral,
                    cardsRemain:values.cardsRemain,
                    vipBirthday:values.vipBirthday,
                    vipQian:values.vipQian,
                    vipMoney:values.vipMoney,
                    vipImg:values.vipImg,
                  })
                  
                  const { success,data} = resUpdate;
                  if(success){
                    message.success('修改成功');
                    //关闭窗口
                    setShowEditModal(false)
                  } else {
                    message.success('修改失败');
                    return false
                  }
            }}
        >
                <ProForm.Group>
                  <ProFormText width="md" name="vipId" label="当前会员编号" disabled tooltip="最长为 24 位"  />
                  <ProFormText width="md" name="vipName" label="会员姓名"  tooltip="最长为 24 位" placeholder="请输入会员姓名" />
                </ProForm.Group>
                <ProForm.Group>
                  <ProFormSelect width="md" name="vipSex" label="性别" options={jobSex} />
                  <ProFormSelect width="md" name="vipType" label="会员卡类型" options={jobType} />
                </ProForm.Group>
                <ProForm.Group>
                  <ProFormSelect width="md" name="vipState" label="会员卡状态" options={jobState} />  
                  <ProFormText width="md" name='vipPhone' label="会员联系电话"  placeholder="请输入会员联系电话" />
                </ProForm.Group>
                <ProForm.Group>
                  <ProFormText width="md" name="vipDays" label="有效天数" placeholder="请输入有效天数" />
                  <ProFormText width="md" name="vipyueke" label="可约课次数" placeholder="请输入可约课次数" />
                </ProForm.Group>
                <ProForm.Group>
                  <ProFormDatePicker width="md" name="startTime" label="开卡日期" placeholder="请输入开卡日期" />
                  <ProFormDatePicker width="md" name="endTime" label="结束日期" placeholder="请输入结束日期" />
                </ProForm.Group>
                <ProForm.Group>
                  <ProFormText width="md" name="totalSpend" label="消费总额" placeholder="请输入消费总额" />
                  <ProFormText width="md" name="spendItem" label="消费项目" placeholder="请输入消费项目" />
                </ProForm.Group>
                <ProForm.Group>
                  <ProFormText width="md" name="vipIntegral" label="会员积分" placeholder="请输入会员积分" />
                  <ProFormText width="md" name="cardsRemain" label="卡内剩余" placeholder="请输入卡内剩余" />
                </ProForm.Group>
                <ProForm.Group>
                  <ProFormDatePicker width="md" name="vipBirthday" label="会员生日" placeholder="请输入会员生日" />
                  <ProFormText width="md" name="vipQian" label="会员卡折后价格" placeholder="请输入会员卡折后价格" />
                </ProForm.Group>
                <ProForm.Group>
                  <ProFormText width="md" name="vipMoney" label="会员卡实际价格" placeholder="请输入会员卡实际价格" />
                  <ProFormText width="md" name="vipImg" label="会员卡图片" placeholder="请输入会员卡图片" />
                </ProForm.Group>

    </ModalForm>
    </PageContainer>
  )
}

export default Member;
