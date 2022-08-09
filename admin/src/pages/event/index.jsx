import React, { useRef } from 'react';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Tag, Space, Menu, message,Popconfirm,Descriptions } from 'antd';
import { PlusOutlined,EditOutlined  } from '@ant-design/icons';
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


function event() {

    // 弹窗刷新页面
    const actionRef = useRef();

    // 创建一个表单指向 目的是为了得到一个 表单实例
    const editFrom = useRef(null);
    // 弹出状态，默认隐藏窗口false
    const  [ showEditModal,setShowEditModal] = useState(false)

  const columns= [
 
    {
      title: '赛事活动编号',
      dataIndex: 'actId',
      copyable: true, // 是否支持复制
      ellipsis: true, // 是否支持缩略
      // 第二行不允许编辑,index !== 0;
      //text:取得相对应dataIndex的sdid该行值, record:行内容, index:行下标，从0开始
      editable: (text, record, index) => {
        console.log('index',index)
        console.log('record',record)
        console.log('text',text)
        return index !== index;
      },
    },
    {
      title: '赛事活动名称',
      copyable: true, // 是否支持复制
      dataIndex: 'theme',
      search: true, //是否显示搜索表单，传入对象时为搜索表单的配置
    },
    {
      title: '活动类型',
      dataIndex: 'type',
      ellipsis: true, // 是否支持缩略
      search: true,  //显示搜索表单
      filters: true, //表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      valueType:'select',
      valueEnum:{
        1: { text: '个人活动', status: 'Default' },
        2: { text: '团体活动', status: 'Processing' },
      },
      render(_,record){
        const { type } = record;
        let _typestr = ''
        if(type==1) _typestr="个人活动"
        if(type==2) _typestr="团体活动"
        return ( 
          <div>{_typestr}</div>
        )
      }
    },
    {
      title: '赛事活动项目',
      dataIndex: 'project',
      search: true,  //不显示搜索表单
      filters: true, //表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType:'select',
      valueEnum:{
        1: { text: '足球', status: 'Default' },
        2: { text: '篮球', status: 'Processing' },
        3: { text: '网球', status: 'Success' },
        4: { text: '羽毛球', status: 'Error' },
        5: { text: '乒乓球', status: 'Error' },
        6: { text: '桌球', status: 'Error' },
        7: { text: '排球', status: 'Error' },
        8: { text: '游泳', status: 'Error' },
      },
      render(_,record){
        const { project } = record;
        let _projectstr = ''
        if(project==1) _projectstr="足球"
        if(project==2) _projectstr="篮球"
        if(project==3) _projectstr="网球"
        if(project==4) _projectstr="羽毛球"
        if(project==5) _projectstr="乒乓球"
        if(project==6) _projectstr="桌球"
        if(project==7) _projectstr="排球"
        if(project==8) _projectstr="游泳"
        return ( 
          <div>{_projectstr}</div>
        )
      }
    },
    {
      title: '赛事活动场地',
      dataIndex: 'field',
      copyable: true, // 是否支持复制
      search: false,  //不显示搜索表单
    },
    {
      title: '举办方联系电话',
      dataIndex: 'organizerphone',
      ellipsis: true, // 是否支持缩略
      copyable: true, // 是否支持复制
      search: false,  //不显示搜索表单
      
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
						const resTow = await axios.post('http://127.0.0.1:7001/admin/event/destroy', {
							actId: record.actId,
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
              <Descriptions.Item label="赛事活动编号">
                <Field text={record.actId} valueType="digit" />
              </Descriptions.Item>
              <Descriptions.Item label="赛事活动名称">
                <Field text={record.theme} valueType="text" />
              </Descriptions.Item>
              <Descriptions.Item label="赛事活动场地">
                <Field text={record.field} valueType="text" />
              </Descriptions.Item>
              <Descriptions.Item label="活动类型">
                <Field 
                  text={record.type}
                  valueType="text" 
                  render={(type,record) =>{
                    let _type = ''
                    if (type == 1) _type = "个人活动"
                    if (type == 2) _type = "团体活动"
                    return (
                      <div>{_type}</div>
                    )
                  }}
                />
              </Descriptions.Item>
              <Descriptions.Item label="赛事活动项目">
                <Field 
                  text={record.project}
                  valueType="text" 
                  render={(project,record) =>{
                    let _project = ''
                    if (project == 1) _project = "足球"
                    if (project == 2) _project = "篮球"
                    if (project == 3) _project = "网球"
                    if (project == 4) _project = "羽毛球"
                    if (project == 5) _project = "乒乓球"
                    if (project == 6) _project = "桌球"
                    if (project == 7) _project = "排球"
                    if (project == 8) _project = "游泳"
                    return (
                      <div>{_project}</div>
                    )
                  }}
                />
              </Descriptions.Item>
              <Descriptions.Item label="举办方">
                <Field text={record.organizer} valueType="text" />
              </Descriptions.Item>
              <Descriptions.Item label="举办方联系电话">
                <Field text={record.organizerphone} valueType="text" />
              </Descriptions.Item>
              <Descriptions.Item label="活动参与方式">
                <Field text={record.mode} valueType="text" />
              </Descriptions.Item>
              <Descriptions.Item label="赛事活动赞助商">
                <Field text={record.sponsor} valueType="text" />
              </Descriptions.Item>
              <Descriptions.Item label="赛事活动内容介绍">
                <Field text={record.content} valueType="text" />
              </Descriptions.Item>
              <Descriptions.Item label="活动赛事名额">
                <Field text={record.quota} valueType="text" />
              </Descriptions.Item>
              <Descriptions.Item label="赛事活动报名费">
                <Field text={record.registration} valueType="money" />
              </Descriptions.Item>
              <Descriptions.Item label="一等奖">
                <Field text={record.first} valueType="text" />
              </Descriptions.Item>
              <Descriptions.Item label="二等奖">
                <Field text={record.second} valueType="text" />
              </Descriptions.Item>
              <Descriptions.Item label="三等奖">
                <Field text={record.third} valueType="text" />
              </Descriptions.Item>
              <Descriptions.Item label="报名开始时间">
                <Field text={record.rttStartTime} valueType="date" />
              </Descriptions.Item>
              <Descriptions.Item label="报名结束时间">
                <Field text={record.rttEndTime} valueType="date" />
              </Descriptions.Item>
              <Descriptions.Item label="活动状态">
                <Field 
                  text={record.state}
                  valueType="text" 
                  render={(type,record) =>{
                    let _type = ''
                    if (type == 1) _type = "报名中"
                    if (type == 2) _type = "已结束"
                    if (type == 3) _type = "预约中"
                    if (type == 4) _type = "已截止"
                    return (
                      <div>{_type}</div>
                    )
                  }}
                />
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
      value: "1",
      label: '个人活动',
    },
    {
      value: "2",
      label: '团体活动',
    },
  ];
  const jobType1 = [
    {
      value: "1",
      label: '足球',
    },
    {
      value: "2",
      label: '篮球',
    },
    {
      value: "3",
      label: '网球',
    },
    {
      value: "4",
      label: '羽毛球',
    },
    {
      value: "5",
      label: '乒乓球',
    },
    {
      value: "6",
      label: '桌球',
    },
    {
      value: "7",
      label: '排球',
    },
    {
      value: "8",
      label: '游泳',
    },
  ];

  const jobType2 = [
    {
      value: "1",
      label: '报名中',
    },
    {
      value: "2",
      label: '已结束',
    },
    {
      value: "3",
      label: '预约中',
    },
    {
      value: "4",
      label: '已截止',
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
                  headerTitle="场馆管理表格"
                  //行的 key，一般是行 id
                  rowKey="actId"
                  //EditableProTable - 可编辑表格
                //   editable={{
                //     type: 'multiple',
                //     //3个参数:行ID，行内容，行内容，undefined
                //     onSave: async (rowKey, data) => {
                //         console.log('修改',rowKey);
                //         await axios.post('http://127.0.0.1:7001/admin/event/update',{
                //         actId:data.actId,
                //         theme:data.theme,
                //         project:data.project,
                //         type:data.type,
                //         organizerphone:data.organizerphone,
                //         field:data.field,
                //         organizer:data.organizer, 
                //         mode:data.mode,
                //         sponsor:data.sponsor,
                //         content:data.content,
                //         quota:data.quota,
                //         registration:data.registration,
                //         first:data.first,
                //         second:data.second,
                //         third:data.third,
                //     })
                //     },
                //     //3个参数:行ID，行内容，undefined    
                //     onDelete: async (rowId,rowData) => {
                //       const resTow = await axios.post('http://127.0.0.1:7001/admin/event/destroy',{
                //         actId:rowData.actId,
                //       })
                //       //拿接口返回来的状态(success)值true或者false
                //       const { success} = resTow.data;
                //       if(success){
                //         message.success('删除成功');
                //         return true;
                //       } else {
                //         message.success('删除失败');
                //         return false
                //       }
                //     }, 

                // }}
                request={async (params) => {
                        console.log('params',params)
                        const { pageSize,current,actId,theme,type,project}  = params;

                        const postData = {}
                        if(actId) postData.actId = actId;
                        if(theme) postData.theme = theme;
                        if(type) postData.type = type;
                        if(project) postData.project = project;
                        const resOne = await axios.post('http://127.0.0.1:7001/admin/event/findAll',{
                          page: current,
                          limit:pageSize,
                          ...postData

                        })
                        //res接口有多少条数据
                        console.log(resOne)
                        console.log(resOne.data)
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

                toolBarRender={ () => [
                                  <ModalForm
                                        title="添加赛事"
                                        layout="vertical"
                                        trigger={
                                          <Button type="primary">
                                                  <PlusOutlined />
                                                  添加赛事
                                          </Button>
                                        }

                                        //弹窗刷新
                                        onVisibleChange={() => {
                                          actionRef.current.reload();
                                        }}

                                        modalProps={{
                                          onCancel: () => console.log('run'),
                                          
                                        }}
                                        onFinish={async (values) => {
                                              const res1 = await  axios.post('http://127.0.0.1:7001/admin/event/create',{
                                                theme: values.theme,
                                                field: values.field,
                                                project: values.project,
                                                organizerphone: values.organizerphone,
                                                type: values.type,
                                                organizer: values.organizer,
                                                mode: values.mode,
                                                sponsor: values.sponsor,
                                                content: values.content,
                                                quota: values.quota,
                                                registration: values.registration,
                                                first: values.first,
                                                second: values.second,
                                                third: values.third,
                                                state: values.state,
                                                rttStartTime: values.rttStartTime,
                                                rttEndTime: values.rttEndTime,
                                              })
                                              const { success,data} = res1.data;
                                              if(success){
                                                message.success('提交成功');
                                                return true;
                                              } else {
                                                message.success('提交失败');
                                                return false
                                              }
                                        }}
                                  >
                                                 <ProForm.Group>
                                                      <ProFormText
                                                              width="md"
                                                              name="theme"
                                                              label="赛事名称"
                                                              tooltip="最长为 24 位"
                                                              placeholder="请输入名称"
                                                      />
                                                      <ProFormSelect width="md" name='type' label="赛事类型"  options={jobType} />
                                                  </ProForm.Group>
                                                  <ProForm.Group>
                                                      <ProFormSelect width="md" name='project' label="项目类型"  options={jobType1} />
                                                      <ProFormText width="md" name="field" label="赛事活动场地" placeholder="请输入赛事地址" />
                                                  </ProForm.Group>
                                                  <ProForm.Group>
                                                      <ProFormText width="md" name='organizer' label="举办方"  placeholder="请输入举办方" />
                                                      <ProFormText width="md" name="organizerphone" label="举办方联系电话" placeholder="请输入举办方联系电话" />
                                                  </ProForm.Group>
                                                  <ProForm.Group>
                                                      <ProFormText width="md" name='mode' label="活动参与方式"  placeholder="请输入活动参与方式" />
                                                      <ProFormText width="md" name='sponsor' label="赛事活动赞助商"  placeholder="请输入赛事活动赞助商" />
                                                  </ProForm.Group>
                                                  <ProForm.Group>
                                                      <ProFormText width="md" name='content' label="赛事活动内容介绍"  placeholder="请输入内容介绍" />
                                                      <ProFormText width="md" name='quota' label="赛事活动名额"  placeholder="请输入赛事活动名额" />
                                                  </ProForm.Group>
                                                  <ProForm.Group>
                                                      <ProFormText width="md" name='registration' label="赛事活动报名费"  placeholder="请输入赛事活动报名费" />
                                                      <ProFormText width="md" name='first' label="一等奖"  placeholder="请输入奖品" />
                                                  </ProForm.Group>
                                                  <ProForm.Group>
                                                      <ProFormText width="md" name='second' label="二等奖"  placeholder="请输入奖品" />
                                                      <ProFormText width="md" name='third' label="三等奖"  placeholder="请输入奖品" />
                                                  </ProForm.Group>
                                                  <ProForm.Group>
                                                      <ProFormSelect width="md" name='state' label="赛事状态" options={jobType2}  />
                                                      <ProFormDateTimePicker width="md" name='rttStartTime' label="报名开始时间" placeholder="请选择时间" />
                                                  </ProForm.Group>
                                                  <ProForm.Group>
                                                      <ProFormDateTimePicker width="md" name='rttEndTime' label="报名截止时间"  placeholder="请选择时间" />
                                                  </ProForm.Group>
                                  </ModalForm>
                ]}
        />

              <ModalForm
                  title="修改赛事信息"
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
                        const resUpdate = await  axios.post('http://127.0.0.1:7001/admin/event/update',{
                              actId:values.actId,
                              theme:values.theme,
                              type:values.type,
                              project:values.project,
                              field:values.field,
                              organizer:values.organizer,
                              organizerphone:values.organizerphone,
                              mode:values.mode,
                              sponsor:values.sponsor,
                              content:values.content,
                              quota:values.quota,
                              registration:values.registration,
                              first:values.first,
                              second:values.second,
                              third:values.third,
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
                                <ProFormText width="md" name="actId" label="当前赛事编号" disabled tooltip="最长为 24 位"  />
                                <ProFormText width="md" name="theme" label="赛事名称" tooltip="最长为 24 位" placeholder="请输入赛事名称" />
                            </ProForm.Group>
                            <ProForm.Group>
                                <ProFormSelect width="md" name="type" label="活动类型" placeholder="请输入活动类型" options={jobType} />
                                <ProFormSelect width="md" name="project" label="赛事活动项目" placeholder="请输入赛事活动项目" options={jobType1} />
                            </ProForm.Group>
                            <ProForm.Group>
                                <ProFormText width="md" name='field' label="赛事活动地址"  placeholder="请输入赛事地址" />
                                <ProFormText width="md" name='organizer' label="举办方"  placeholder="请输入举办方" />
                            </ProForm.Group>
                            <ProForm.Group>
                                <ProFormText width="md" name="organizerphone" label="举办方联系电话" placeholder="请输入举办方联系电话" />
                                <ProFormText width="md" name='mode' label="活动参与方式"  placeholder="请输入活动参与方式" />
                            </ProForm.Group>
                            <ProForm.Group>
                                <ProFormText width="md" name='sponsor' label="赛事活动赞助商"  placeholder="请输入赛事活动赞助商" />
                                <ProFormText width="md" name='content' label="赛事活动内容介绍"  placeholder="请输入内容介绍" />
                            </ProForm.Group>
                            <ProForm.Group>
                                <ProFormText width="md" name='quota' label="赛事活动名额"  placeholder="请输入赛事活动名额" />
                                <ProFormText width="md" name='registration' label="赛事活动报名费"  placeholder="请输入赛事活动报名费" />
                            </ProForm.Group>
                            <ProForm.Group>
                                <ProFormText width="md" name='first' label="一等奖"  placeholder="请输入奖品" />
                                <ProFormText width="md" name='second' label="二等奖"  placeholder="请输入奖品" />
                            </ProForm.Group>
                            <ProForm.Group>
                                <ProFormText width="md" name='third' label="三等奖"  placeholder="请输入奖品" />
                            </ProForm.Group>
              </ModalForm>

        </PageContainer>
    )
}


export default event;
