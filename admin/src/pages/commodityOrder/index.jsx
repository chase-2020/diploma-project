import React, { useState, useRef, useEffect } from 'react';
import { Button, Tag, Space, message, Select, Popconfirm, Descriptions } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, {
	ModalForm,
	ProFormText,
	ProFormSelect,
  ProFormDateTimePicker,
	DrawerForm,
    ProFormTextArea,
} from '@ant-design/pro-form';

import request from 'umi-request';
import axios from 'axios';
import moment from 'moment';
import Field from '@ant-design/pro-field';
import {findMorder,updateMorder,createMorder,deleteMorder} from '../../services/ant-design-pro/api'


function CommodityOrder() {
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
      title: '订单编号',
      dataIndex: 'orderNumber',
      copyable: true, // 是否支持复制
      ellipsis: true, // 是否支持缩略
      align: 'center',
      // 第二行不允许编辑,index !== 0;
      //text:取得相对应dataIndex的vipId该行值, record:行内容, index:行下标，从0开始
      editable: ( index) => {
        
        return index !== index;
      },
    },
    {
      title: '购买商品的用户',
      dataIndex: 'user',
      align: 'center',
      search: true, //是否显示搜索表单，传入对象时为搜索表单的配置
    },
    {
      title: '购买商品的数量',
      dataIndex: 'commoditys',
      align: 'center',
      ellipsis: true, // 是否支持缩略
      search: false,  //不显示搜索表单
    },
    {
      title: '该订单的总金额',
      dataIndex: 'totalAmount',
      align: 'center',
      search: false,  //显示搜索表单
      ellipsis: true, // 是否支持缩略
    },
    {
      title: '订单的提交时间',
      align: 'center',
      dataIndex: 'placeAnOrder',
      search: false,  //显示搜索表单
      ellipsis: true, // 是否支持缩略
    },
    {
      title: '订单的完成时间',
      dataIndex: 'orderComplete',
      align: 'center',
      ellipsis: true, // 是否支持缩略
      search: false,  //不显示搜索表单
      
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
						const resTow = await deleteMorder( {
							orderNumber: record.orderNumber,
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
						<a type="primary" > 查看 </a>
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
            <Descriptions.Item label="商品订单编号">
							<Field text={record.orderNumber} valueType="text" />
						</Descriptions.Item>
						<Descriptions.Item label="购买商品的用户">
							<Field text={record.user} valueType="text" />
						</Descriptions.Item>
						<Descriptions.Item label="购买商品的数量">
							<Field text={record.commoditys} valueType="text" />
						</Descriptions.Item>
            <Descriptions.Item label="该订单的总金额">
							<Field text={record.totalAmount} valueType="text" />
						</Descriptions.Item>
						
            <Descriptions.Item label="订单的提交时间">
							<Field text={record.placeAnOrder} valueType="date" />
						</Descriptions.Item>
            <Descriptions.Item label="订单的完成时间">
							<Field text={record.orderComplete} valueType="date" />
						</Descriptions.Item>
            <Descriptions.Item label="创建时间">
							<Field text={record.createdAt} valueType="date" />
						</Descriptions.Item>
            <Descriptions.Item label="更新时间">
							<Field text={record.updatedAt} valueType="date" />
						</Descriptions.Item>
					</Descriptions>
				</DrawerForm>,
			],
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
              headerTitle="商品订单管理表格"
              //行的 key，一般是行 id
              rowKey="orderNumber"
            request={async (params) => {
                   //根据搜索
                    const { pageSize,current,orderNumber,user}  = params;
                    console.log('params',params)

                    //查询对象属性值
                    const postData = {}
                    if(orderNumber) postData.orderNumber = orderNumber;
                    if(user) postData.user = user;
                    
                    const resOne = await findMorder({
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
            toolBarRender={ () => [
                <ModalForm
                      title="添加商品订单信息"
                      trigger={
                        <Button type="primary">
                                <PlusOutlined />
                                添加商品订单信息
                        </Button>
                      }
                      modalProps={{
                        onCancel: () => console.log('run'),
                        
                      }}
                      onFinish={async (values) => {
                            const res1 = await  createMorder({
                                  user: values.user,
                                  totalAmount: values.totalAmount,
                                  commoditys: values.commoditys,
                                  placeAnOrder: values.placeAnOrder,
                                  orderComplete: values.orderComplete,
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
                                name="user"
                                label="购买商品的用户"
                                placeholder="请输入购买商品的用户"
                        />
                        <ProFormText width="md" name="totalAmount" label="订单的总金额" placeholder="请输入订单的总金额" />
                    </ProForm.Group> 
                    <ProForm.Group>     
                      <ProFormDateTimePicker width="md" name='placeAnOrder' label="订单的提交时间"  placeholder="请输入订单的提交时间" />
                      <ProFormDateTimePicker  width="md" name="orderComplete" label="订单的完成时间" placeholder="请输入订单的完成时间" />
                    </ProForm.Group> 
                    <ProForm.Group>  
                      <ProFormText width="md" name="commoditys" label="购买商品的数量" placeholder="请输入购买商品的数量" />
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
                  // visible (窗口)改变时触发，需要弹窗return true;
                  onVisibleChange={() => {
                    // 刷新
                    actionRef.current.reload();
                  }}
                  onFinish={async (values) => {
                        const resUpdate = await  updateMorder({
                            orderNumber:values.orderNumber,
                            user:values.user,
                            totalAmount:values.totalAmount,
                            commoditys:values.commoditys,
                            placeAnOrder:values.placeAnOrder,
                            orderComplete:values.orderComplete,
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
                        <ProFormText width="md" name="orderNumber" label="当前商品订单编号" disabled/>
                        <ProFormText width="md" name="user" label="购买的用户id" tooltip="最长为 24 位" placeholder="请输入购买的用户id" />
                        <ProFormText width="md" name="totalAmount" label="订单的总金额" placeholder="请输入订单的总金额" />
                        <ProFormText width="md" name="commoditys" label="购买商品的数量" placeholder="请输入购买商品的数量" />
                        {/* <ProFormSelect width="md" name='placeAnOrder' label="订单的提交时间"   /> */}
                        {/* <ProFormText width="md" name="orderComplete" label="订单的完成时间" placeholder="请输入订单的完成时间" /> */}
                            
                  </ProForm.Group>
              </ModalForm>
    </PageContainer>
  );
}

export default CommodityOrder;
