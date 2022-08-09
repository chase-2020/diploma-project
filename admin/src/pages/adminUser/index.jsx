import React, { useRef } from 'react';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Tag, Space, Menu, message,Popconfirm,Descriptions } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import request from 'umi-request';
import axios from 'axios'

import ProForm, {
  ModalForm,
  ProFormText,
  ProFormSelect,
  DrawerForm,
  ProFormDateTimePicker,
} from '@ant-design/pro-form';
import { useState } from 'react';
import Field from '@ant-design/pro-field';

function AdminUser() {

  // 弹窗刷新页面
  const actionRef = useRef();

  // 创建一个表单指向 目的是为了得到一个 表单实例
  const editFrom = useRef(null);
  // 弹出状态，默认隐藏窗口false
  const  [ showEditModal,setShowEditModal] = useState(false)

  const columns= [
 
    {
      title: '用户id',
      dataIndex: 'uid',
      copyable: true, // 是否支持复制
      ellipsis: true, // 是否支持缩略
      // 第二行不允许编辑,index !== 0;
      //text:取得相对应dataIndex的sdid该行值, record:行内容, index:行下标，从0开始
      editable: (text, record, index) => {
        return index !== index;
      },
    },
    {
      title: '用户名',
      dataIndex: 'username',
      search: true, //是否显示搜索表单，传入对象时为搜索表单的配置
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      copyable: true, // 是否支持复制
      ellipsis: true, // 是否支持缩略
      search: false,  //不显示搜索表单
    },
    {
      title: '性别',
      dataIndex: 'sex',
      search: true,  //显示搜索表单
      filters: true, //表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueEnum:{
        0: { text: '男', status: 'Default' },
        1: { text: '女', status: 'Processing' },
      },
      render(_,record){
        const { sex } = record;
        let _sexstr = ''
        if(sex==0) _sexstr="男"
        if(sex==1) _sexstr="女"
        return ( 
          <div>{_sexstr}</div>
        )
      }
    },
    {
      title: '身份证号码',
      dataIndex: 'senFen',
      search: false,  //不显示搜索表单
      copyable: true, // 是否支持复制
    },
    {
      title: '居住地址',
      dataIndex: 'address',
      ellipsis: true, // 是否支持缩略
      search: false,  //不显示搜索表单
      copyable: true, // 是否支持复制
      
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <Button onClick={  ()=>  {  setShowEditModal(true); editFrom.current.setFieldsValue(record)    }   }>编辑</Button>,
        
        <Popconfirm
					title="确定要删除吗？"
					okText="是"
					cancelText="否"
					onConfirm={async () => {
						const resTow = await axios.post('http://127.0.0.1:7001/admin/user/destroy', {
							uid: record.uid,
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

        <DrawerForm
            width="800px"
            title="全部数据"
            trigger={
              <a type="primary"> 更多 </a>
            }
            onFinish={async () => {
                          return true;
                      }}
            onVisibleChange={() => {
              actionRef.current.reload();
            }}
        >
          <Descriptions
              bordered
              // 2列数据
              column={1}
          >
              <Descriptions.Item label="用户id">
                <Field text={record.uid} valueType="digit" />
              </Descriptions.Item>
              <Descriptions.Item label="用户名">
                <Field text={record.username} valueType="text" />
              </Descriptions.Item>
              <Descriptions.Item label="联系电话">
                <Field text={record.phone} valueType="text" />
              </Descriptions.Item>
              <Descriptions.Item label="性别">
                <Field 
                  text={record.sex}
                  valueType="text" 
                  render={(sex,record) =>{
                    let _sex = ''
                    if (sex == 0) _sex = "男"
                    if (sex == 1) _sex = "女"
                    return (
                      <div>{_sex}</div>
                    )
                  }}
                />
              </Descriptions.Item>
              <Descriptions.Item label="身份证号码">
                <Field text={record.senFen} valueType="text" />
              </Descriptions.Item>
              <Descriptions.Item label="居住地址">
                <Field text={record.address} valueType="text" />
              </Descriptions.Item>
              <Descriptions.Item label="微信号">
                <Field text={record.wxOpenId} valueType="text" />
              </Descriptions.Item>
              <Descriptions.Item label="QQ">
                <Field text={record.qq} valueType="text" />
              </Descriptions.Item>
              <Descriptions.Item label="是否为会员">
                <Field 
                  text={record.type}
                  valueType="text" 
                  render={(type,record) =>{
                    let _type = ''
                    if (type == 0) _type = "否"
                    if (type == 1) _type = "是"
                    return (
                      <div>{_type}</div>
                    )
                  }}
                />
              </Descriptions.Item>
              <Descriptions.Item label="邮箱">
                <Field text={record.email} valueType="text" />
              </Descriptions.Item>
              <Descriptions.Item label="个人积分">
                <Field text={record.integral} valueType="text" />
              </Descriptions.Item>
              <Descriptions.Item label="生日">
                <Field text={record.birthday} valueType="date" />
              </Descriptions.Item>
              <Descriptions.Item label="个性签名">
                <Field text={record.motto} valueType="text" />
              </Descriptions.Item>
              <Descriptions.Item label="创建时间">
                <Field text={record.createdAt} valueType="dateTime" />
              </Descriptions.Item>
              <Descriptions.Item label="更新时间">
                <Field text={record.updatedAt} valueType="dateTime" />
              </Descriptions.Item>
          </Descriptions>
        </DrawerForm>,

      ],
    },

  ];

  const jobType = [
    {
      value: 0,
      label: '男',
    },
    {
      value: 1,
      label: '女',
    },
  ];
  const jobType1 = [
    {
      value: 0,
      label: '否',
    },
    {
      value: 1,
      label: '是',
    },
  ];

    return (
        <PageContainer>
             <ProTable
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
                  headerTitle="用户管理表格"
                  //行的 key，一般是行 id
                  rowKey="uid"
                  //EditableProTable - 可编辑表格
                  // editable={{
                  //   type: 'multiple',
                  //   //3个参数:行ID，行内容，行内容，undefined
                  //   onSave: async (rowKey, data) => {
                  //       console.log('修改',rowKey);
                  //       console.log("address",data.address)
                  //       await axios.post('http://127.0.0.1:7001/admin/user/update',{
                  //       uid:data.uid,
                  //       username:data.username,
                  //       sex:data.sex,
                  //       senFen:data.senFen,
                  //       phone:data.phone,
                  //       address:data.address,
                  //   })
                  //   },
                  //   //3个参数:行ID，行内容，undefined    
                  //   onDelete: async (rowId,rowData) => {
                  //     const resTow = await axios.post('http://127.0.0.1:7001/admin/user/destroy',{
                  //     uid:rowData.uid,
                  //     })
                  //     //拿接口返回来的状态(success)值true或者false
                  //     const { success} = resTow.data;
                  //     if(success){
                  //       message.success('删除成功');
                  //       return true;
                  //     } else {
                  //       message.success('删除失败');
                  //       return false
                  //     }
                  //   }, 
                //}}
                // 获取用户信息列表
                request={async (params) => {
                          const { pageSize,current,uid,username,sex}  = params;
                          const postData = {}
                          if(uid) postData.uid = uid;
                          if(sex) postData.sex = sex;
                          if(username) postData.username = username;
                          const resOne = await axios.post('http://127.0.0.1:7001/admin/user/findAll',{
                            page: current,
                            limit:pageSize,
                            ...postData
                          })
                          const { success,res } = resOne.data;
                          const total = res.count;
                          const data = res.rows;
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
        />

<ModalForm
                  title="修改个人信息"
                  //弹窗是否打开
                  visible={showEditModal}
                  //通过 formRef 获取到表单实例的引用，通过引用可以调用表单方法实现表单重置，设置表单，获取表单值等功能
                  formRef={editFrom}
                  modalProps={{
                    //取消窗口时触发
                    onCancel: () => setShowEditModal(false)
                  }}

                    //弹窗刷新
                    onVisibleChange={() => {
                      actionRef.current.reload();
                    }}

                  onFinish={async (values) => {
                        // console.log('values',values)
                        // console.log('values.sdid111',values.sdid)
                        const resUpdate = await  axios.post('http://127.0.0.1:7001/admin/user/update',{
                              uid:values.uid,
                              username:values.username,
                              sex:values.sex,
                              senFen:values.senFen,
                              address:values.address,
                              phone:values.phone,
                              hight:values.hight,
                              weight:values.weight,
                              wxOpenId:values.wxOpenId,
                              qq:values.qq,
                              keCheng:values.keCheng,
                              type:values.type,
                              email:values.email,
                              birthday:values.birthday,
                              phone:values.phone,
                        })
                        // console.log('values.sdid222',values.sdid)
                        const { success,data} = resUpdate.data;
                        if(success){
                          message.success('修改成功');
                          //关闭窗口
                          setShowEditModal(false)
                          return true;
                        } else {
                          message.success('修改失败');
                          return false
                        }
                  }}
              >
                          <ProForm.Group>
                                <ProFormText width="md" name="uid" label="用户id" disabled tooltip="最长为 24 位"  />
                                <ProFormText width="md" name="username" label="用户名" tooltip="最长为 24 位" placeholder="请输入用户名" />
                          </ProForm.Group>
                          <ProForm.Group>
                                <ProFormSelect width="md" name="sex" label="性别" placeholder="请输入性别" options={jobType} />
                                <ProFormText width="md" name='senFen' label="身份证号码"  placeholder="请输入身份号码" />
                          </ProForm.Group>
                          <ProForm.Group>
                                <ProFormText width="md" name='phone' label="手机号码"  placeholder="请输入手机号码" />
                                <ProFormText width="md" name="address" label="居住地址" placeholder="请输入地址" />
                          </ProForm.Group>
                          <ProForm.Group>
                                <ProFormText width="md" name='hight' label="身高"  placeholder="请输入身高" />
                                <ProFormText width="md" name="weight" label="体重" placeholder="请输入体重" />
                          </ProForm.Group>
                          <ProForm.Group>
                                <ProFormText width="md" name='wxOpenId' label="微信账号"  placeholder="请输入账号" />
                                <ProFormText width="md" name="qq" label="QQ账号" placeholder="请输入账号" />
                          </ProForm.Group>
                          <ProForm.Group> 
                                <ProFormText width="md" name='keCheng' label="所选课程"  placeholder="请输入课程名称" />
                                <ProFormSelect width="md" name="type" label="是否为会员" options={jobType1} />
                          </ProForm.Group>
                          <ProForm.Group>
                                <ProFormText width="md" name='email' label="邮箱"  placeholder="请输入邮箱" />
                                <ProFormDateTimePicker width="md" name="birthday" label="生日" placeholder="请输入日期" />
                          </ProForm.Group>
                          <ProForm.Group>
                                <ProFormText width="md" name='motto' label="个性签名"  placeholder="请输入内容" />
                          </ProForm.Group>
              </ModalForm>

        </PageContainer>
    )
}


export default AdminUser;

