import React, { useRef,useEffect } from 'react';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Tag, Space, Menu, message, Descriptions, Popconfirm,Upload } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import request from 'umi-request';
import axios from 'axios'
import dayjs from "dayjs"
import styles from './index.less';
import { Tabs,DatePicker } from 'antd';
import {arrange, siteFindAll, planFindAll, deletePlan, planCreate} from '../../services/apis/sort'

const { TabPane } = Tabs;
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormSelect,
  DrawerForm,
  ProFormDateTimePicker,
} from '@ant-design/pro-form';
import { useState } from 'react';
import Field from '@ant-design/pro-field';
import {findSort,updateSort,createSort,destroySort} from '../../services/ant-design-pro/api'

function sort() {
  // 弹窗刷新页面
  const actionRef = useRef();

  // 创建一个表单指向 目的是为了得到一个 表单实例
  const editFrom = useRef(null);
  const editFromOne = useRef(null);
  // 弹出状态，默认隐藏窗口false

  const  [ showEditModal,setShowEditModal] = useState(false)
  const  [ showPai,setShowPai] = useState(false) //排场对话框
  const  [ showSpecial,setShowSpecial] = useState(false) //排场对话框
  const  [ price,setPrice ] = useState('100')

  const  [ current,setCurrent ] = useState([]) //场地信息当前选中行信息

  const [ planList,setPlanList] = useState([])
  const [ splanList,setSplanList ] = useState([]) //指定日期特别排场价格

  const [ specialTime,setSpecialTime ] = useState('')
  const [ specialList,setSpecialList ] = useState([])  //指定场地特别排场列表
  const [ specialPrice,setSpeciaPrice ] = useState([])  //指定场地特别排场价格

  // 获取场馆封面
  const [getPhoto,setGetphoto]  = useState([])

  // 显示场馆封面图
  const [showCover,setShowCover] = useState([])

  const [uploadImg, setUploadImg] = useState();
  const [cgList, setcgList] = useState();
  const [cgidList, setcgidList] = useState();

  const [color,setColor] = useState([])

  // 常规排场时间价格信息
  const resetTimeArr = ()=>{
    const _temarr = []
    for(let i = 0 ;i < 7 ; i++){

      const _temobj = {
        day:i,
        children:[]
      }
      for(let k = 0 ;k <24; k++){
        const _inObj = {
          fullFee:0,
          halfFee:0
        }
        _temobj.children.push(_inObj)
      }
      _temarr.push(_temobj);
    }
    setPlanList(_temarr);
  }

  //排场全时段价格一键修改
  const fullTime = function (r){
    const pl = [...planList]
    for(const i of pl){
      for(const  a of i.children){
        a.fullFee = r
      }
    }
    // planList = pl
    setPlanList(pl)

    console.log(planList)
    // fullFee
  }

  //排场半小时价格一键修改
  const fullTime1 = function (r){
    const pl = [...planList]
    for(const i of pl){
      for(const  a of i.children){
        a.halfFee = r
      }
    }
    // planList = pl
    setPlanList(pl)

    console.log(planList)
    // fullFee
  }

  //指定日期特别排场价格
  const special = ()=>{
    for(let k = 0 ;k <24; k++){
      const _inObj = {
        fullFee:0,
        halfFee:0
      }
      splanList.push(_inObj)
    }
  }

  //特殊排场
  const sPrice = ()=>{
    const S = []
    for(let i of specialList){
      S.push(JSON.parse(i.plan))
    }
    console.log('1321测试',S)
    setSpeciaPrice(S)
    console.log('特价',specialPrice)
  }

  // 选中特别排场
  const p = [...color]
  const select = (item)=>{
    console.log('color',color)
    if( p.includes(item) ){
      p.splice( p.indexOf(item),1 )
    }else{
      p.push(item)
    };//选中添加到数组里
    setColor(p)

    console.log('color1',p)
  }

  useEffect(()=>{
    console.log('color',color)
  },[color])

  useEffect(()=>{
    resetTimeArr()
    special()
  },[])

  useEffect(()=>{
    sPrice()
    console.log('1211',specialList)
  },[specialList])


  useEffect(()=>{
    console.log('我是useEffect planList',planList)
    console.log('我是useEffect splanList',splanList)
  },[planList,splanList])


	useEffect(()=>{
		setShowCover( [{url:getPhoto}] )
	},[getPhoto])

  useEffect(() => {
    (async () => {
      const _res = await axios.post('http://127.0.0.1:7001/admin/sdUser/find');
      const { success, res } = _res.data;
      if (success) {
        const { rows } = res;
        console.log(res);
        const _temarr = [];
        const _temarr1 = [];
        let index;
        for (const item of rows) {
          _temarr.push({
            value: item.ctid,
            label: item.name,
          });

          if (index == item.courtid) {
            console.log(item.name);
          }
          _temarr1.push({
            text:item.name
          });
          console.log(_temarr1);
          setcgidList(_temarr1);
        }
        setcgList(_temarr);
        setcgidList(_temarr1);
        console.log(cgidList);
      }
    })();
  }, []);

  const columns = [
    {
      title: '场地编号',
      dataIndex: 'site',
      copyable: true, // 是否支持复制
      ellipsis: true, // 是否支持缩略
      align: 'center',
      editable: (text, record, index) => {
        console.log('index', index);
        console.log('record', record);
        console.log('text', text);
        return index !== index;
      },
    },
    {
      title: '所属场馆编号',
      dataIndex: 'courtid',
      copyable: true, // 是否支持复制
      search: true, //是否显示搜索表单，传入对象时为搜索表单的配置
      align: 'center',
      // valueType: 'checkbox',
      // valueType: 'select',
      // valueEnum:{
      //   cgctid
      // },
      // valueEnum:{
      //   1: { text: '排球球训练场'},
      //   2: { text: '羽毛球训练场'},
      //   3: { text: '篮球球训练场' },
      //   4: { text: '足球球训练场'},
      //   5: { text: '游泳训练场'},
      //   15: { text: '乒乓球训练场'},
      //   16: { text: '网球训练场'},
      //   17:{text:'场馆1'}
      // },
    },
    {
      title: '场地状态',
      dataIndex: 'type',
      search: false, //不显示搜索表单
      filters: true, //表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      align: 'center',
      valueType: 'select',
      valueEnum: {
        0: { text: '可选', status: 'Default' },
        1: { text: '不可选', status: 'Processing' },
        2: { text: '已选定', status: 'Processing' },
      },
      render(_, record) {
        const { type } = record;
        let _typestr = '';
        if (type == 0) _typestr = '可选';
        if (type == 1) _typestr = '不可选';
        if (type == 2) _typestr = '已选定';
        return <div>{_typestr}</div>;
      },
    },
    {
      title: '场地类型',
      dataIndex: 'siteType',
      ellipsis: true, // 是否支持缩略
      search: true, //显示搜索表单
      filters: true,
      align: 'center',
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        1: { text: '篮球', status: 'Default' },
        2: { text: '排球', status: 'Processing' },
        3: { text: '足球', status: 'Success' },
        4: { text: '网球', status: 'Error' },
        5: { text: '羽毛球', status: 'Error' },
        6: { text: '乒乓球', status: 'Error' },
        7: { text: '游泳', status: 'Error' },
      },
      render(_, record) {
        const { siteType } = record;
        let _siteTypestr = '';
        if (siteType == 1) _siteTypestr = '篮球';
        if (siteType == 2) _siteTypestr = '排球';
        if (siteType == 3) _siteTypestr = '足球';
        if (siteType == 4) _siteTypestr = '网球';
        if (siteType == 5) _siteTypestr = '羽毛球';
        if (siteType == 6) _siteTypestr = '乒乓球';
        if (siteType == 7) _siteTypestr = '游泳';
        return <div>{_siteTypestr}</div>;
      },
    },
    // {
    //   title: '场地价格',
    //   dataIndex: 'plan',
    //   dataIndex: 'price',
    //   search: false, //不显示搜索表单
    //   align: 'center',
    // },
    {
      title: '场地号',
      dataIndex: 'siteNum',
      search: false, //不显示搜索表单
      align: 'center',
    },

    {
      title: '操作',
      valueType: 'option',
      width: '400px',
      align: 'center',
      render: (text, record, _, action) => [
        <Button
          onClick={() => {
            setShowEditModal(true);
            record.startTime = dayjs(record.startTime).format('YYYY-MM-DD HH:mm:ss');
            if(record.sitePhoto === null ){
              setGetphoto('')
            } else{
              setGetphoto( record.sitePhoto);
            }
            editFrom.current.setFieldsValue(record);
          }}
        >
          编辑
        </Button>,

        <Button onClick={ async ()=>  {
          setShowPai(true);

          record.startTime = dayjs(record.startTime).format('YYYY-MM-DD HH:mm:ss')

          setCurrent(record)
          console.log('选中行',current)
          editFrom.current.setFieldsValue(record)

          const result1 = await siteFindAll( {
            courtid:record.courtid,
            siteNum:record.siteNum,
          });
          // setPlanList(JSON.stringify(result1.data.plan))
          const { success,data } = result1;
          console.log(result1)
          if(success){
            if(data.plan){
              // console.log('has change',data.plan)
              setPlanList(JSON.parse(data.plan))
            } else{
              resetTimeArr()
            }

          }

        } }>排场</Button>,

        <Button onClick={ async ()=>  {
          setShowSpecial(true);

          record.startTime = dayjs(record.startTime).format('YYYY-MM-DD HH:mm:ss')
          setCurrent(record)
          console.log('选中行',record)
          editFrom.current.setFieldsValue(record)

        } }>特殊排场</Button>,


        <Popconfirm
          title="确定要删除吗？"
          okText="是"
          cancelText="否"
          onConfirm={async () => {
            const resTow = await destroySort({
              site: record.site,
            });
            //拿接口返回来的状态(success)值true或者false
            const { success } = resTow;
            if (success) {
              message.success('删除成功');
              actionRef.current.reload();
              return true;
            } else {
              message.success('删除失败');
              return false;
            }
          }}
        >
          <a href="#">删除</a>
        </Popconfirm>,

        <DrawerForm
          width="800px"
          title="全部数据"
          trigger={<a type="primary"> 更多 </a>}
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
            <Descriptions.Item label="场地编号">
              <Field text={record.site} valueType="digit" />
            </Descriptions.Item>
            <Descriptions.Item label="所属场馆编号">
              <Field
                text={record.courtid}
                valueType="text"
              />
            </Descriptions.Item>
            {/* <Descriptions.Item label="所属商家">
              <Field text={record.merchant} valueType="text" />
            </Descriptions.Item> */}
            <Descriptions.Item label="场地状态">
              <Field
                text={record.type}
                valueType="text"
                render={(type, record) => {
                  let _type = '';
                  if (type == 0) _type = '可选';
                  if (type == 1) _type = '不可选';
                  if (type == 2) _type = '已选择';
                  return <div>{_type}</div>;
                }}
              />
            </Descriptions.Item>
            <Descriptions.Item label="场地类型">
              <Field
                text={record.siteType}
                valueType="text"
                render={(siteType, record) => {
                  let _siteType = '';
                  if (siteType == 1) _siteType = '足球';
                  if (siteType == 2) _siteType = '篮球';
                  if (siteType == 3) _siteType = '排球';
                  if (siteType == 4) _siteType = '网球';
                  if (siteType == 5) _siteType = '乒乓球';
                  if (siteType == 6) _siteType = '桌球';
                  if (siteType == 7) _siteType = '游泳';
                  return <div>{_siteType}</div>;
                }}
              />
            </Descriptions.Item>
            <Descriptions.Item label="场地号">
              <Field text={record.siteNum} valueType="text" />
            </Descriptions.Item>
            <Descriptions.Item label="场地图片">
              <Field text={record.sitePhoto} valueType="image" />
            </Descriptions.Item>
            {/* <Descriptions.Item label="场地价格">

              <Field text={record.plan} valueType="money" />

              <Field text={record.price} valueType="money" />

            </Descriptions.Item> */}
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
      value: '0',
      label: '可选',
    },
    {
      value: '1',
      label: '不可选',
    },
    {
      value: '2',
      label: '已选定',
    },
  ];

  const jobType1 = [
    {
      value: '1',
      label: '篮球',
    },
    {
      value: '2',
      label: '排球',
    },
    {
      value: '3',
      label: '足球',
    },
    {
      value: '4',
      label: '网球',
    },
    {
      value: '5',
      label: '羽毛球',
    },
    {
      value: '6',
      label: '乒乓球',
    },
    {
      value: '7',
      label: '游泳',
    },
  ];
  const bain = [];
  const ggg = {};
  const bianType = [
    {
      value: '2',
      label: '羽毛球训练场',
    },
    {
      value: '3',
      label: '篮球球训练场',
    },
    {
      value: '4',
      label: '足球球训练场',
    },
    {
      value: '5',
      label: '游泳训练场',
    },
    {
      value: '15',
      label: '乒乓球训练场',
    },
    {
      value: '16',
      label: '网球训练场',
    },
  ];

  const pTime = [];
  const pTime1 = [];

  for (let i = 0; i < 24; i++){
    pTime.push(`${i}:00-${i+1}:00`)
    pTime1.push(`${i}:00`)
  }

  const pTime2 = ['无选择',...pTime1,'24:00'];
  const week = ['周日','周一','周二','周三','周四','周五','周六']
  const week1 = ['无选择','全部',...week]

  const _datearr=[]
  for(var i=0;i<7;i++){
    const _d = new Date();
    _d.setDate(_d.getDate()+i)
    _datearr.push(`${_d.getMonth()+1}-${_d.getDate()}`)
  }
  console.log(_datearr)


  function onChange(date, dateString) {
    setSpecialTime(dateString)
    console.log(date, dateString);
  }


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
        headerTitle="场地信息"
        //行的 key，一般是行 id
        rowKey="courseId"
        request={async (params) => {
          console.log('params', params);
          const { pageSize, current, siteType, courtid, site, plan } = params;

          const postData = {};
          if (siteType) postData.siteType = siteType;
          if (courtid) postData.courtid = courtid;
          if (site) postData.site = site;
          let storage = window.localStorage;
					postData.mid = storage.mid;
          // if(plan) postData.plan = plan;
          const resOne = await findSort( {
            page: current,
            limit: pageSize,
            ...postData,
          });

          //res接口有多少条数据
          console.log(resOne);
          console.log(resOne.data);
          const { success, rows ,count} = resOne.res;
          const total = count;
          const data = rows;
          return {
            total,
            data,
            success,
          };
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
        toolBarRender={() => [
          <ModalForm
            title="添加场地"
            trigger={
              <Button type="primary">
                <PlusOutlined />
                添加场地
              </Button>
            }
            modalProps={{
              onCancel: () => console.log('取消'),
            }}
            //弹窗刷新
            onVisibleChange={() => {
              actionRef.current.reload();
            }}
            onFinish={async (values) => {

              // console.log('uploadImg', uploadImg.toString());
              if(uploadImg === null ) setUploadImg(' ')

              const resCreate = await createSort({
                merchant: values.merchant,
                site: values.site,
                siteType: values.siteType,
                siteNum: values.siteNum,
                type: values.type,
                courtid: values.courtid,
                plan: values.plan,
                sitePhoto: uploadImg.toString(),
              });
              console.log(resCreate)
							if(resCreate.success==true){
								message.success(resCreate.info);
								console.log('123',123)
								return true
							}
							else {
								message.warning(resCreate.errorMessage);
								return false
							}
            }}
          >
            <ProForm.Group>
							<Upload
							action="http://127.0.0.1:7001/common/upload"
							listType="picture-card"
							maxCount={2}
							onChange={
								async (val) => {
									console.log('我是添加图片的val',val)

                  let res = []
                  for(const item of val.fileList){
                    if(item.response) res.push(item.response.url)
                  }
                  setUploadImg(res)

								}
							}
						>
							{'+ 上传场地单图片'}
						</Upload>
							{/* <ProFormUploadButton
								name="plan"
								label="场馆平面图"
								max={2}
								rules={[{ required: true, message: '必填' }]}
								data={ (file)=>{
									return {
										file:file,
										type:abc
									}
								}}
								fieldProps={{
									name: 'file',
									listType: 'picture-card',
								}}
								action="http://127.0.0.1:7001/common/upload"
								onChange={
									async (val) => {
										console.log('我是添加图片的val',val)
										let res = []
										for(const item of val.fileList){
											if(item.response) res.push(item.response.url)
										}
										setUploadImg(res)
									}
								}
							/> */}
						</ProForm.Group>
            <ProForm.Group>
              <ProFormText
                width="md"
                name="siteNum"
                label="场地号"
                tooltip="最长为 24 位"
                placeholder="请输入场地号"
              />
              <ProFormSelect width="md" name="siteType" label="场地类型" options={jobType1} />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormSelect width="md" name="courtid" label="所属场馆" options={cgList} />
              <ProFormSelect width="md" name="type" label="场地状态" options={jobType} />
            </ProForm.Group>
            <ProForm.Group>
              {/* <ProFormSelect width="md" name="type" label="场地状态" options={jobType} /> */}
              {/* <ProFormText width="md" name="plan" label="场地价格" placeholder="请输入价格" /> */}
            </ProForm.Group>
          </ModalForm>,
        ]}
      />

      <ModalForm
        title="修改场地信息"
        //弹窗是否打开
        visible={showEditModal}
        //通过 formRef 获取到表单实例的引用，通过引用可以调用表单方法实现表单重置，设置表单，获取表单值等功能
        formRef={editFrom}
        modalProps={{
          //取消窗口时触发
          onCancel: () => setShowEditModal(false),
        }}
        //弹窗刷新
        onVisibleChange={() => {
          actionRef.current.reload();
        }}
        onFinish={async (values) => {
          // values.startTime = values.startTime.getTime()
          // console.log(values.startTime)
          // console.log('values',values)
          // console.log('values.sdid111',values.sdid)
          if(getPhoto === null ) setGetphoto('')
          values.startTime = dayjs(values.startTime).valueOf();
          const resUpdate = await updateSort({
            merchant: values.merchant,
            site: values.site,
            plan: values.plan,
            siteNum: values.siteNum,
            stadium: values.stadium,
            type: values.type,
            siteType: values.siteType,
            sitePhoto:getPhoto.toString(),
          });
          // console.log('values.sdid222',values.sdid)
          const { success } = resUpdate;
          if (success) {
            message.success('修改成功');
            //关闭窗口
            setShowEditModal(false);
            return true;
          } else {
            message.success('修改失败');
            return false;
          }
        }}
      >
        <ProForm.Group>
          <Upload
						action="http://127.0.0.1:7001/common/upload"
						listType="picture-card"
						fileList={showCover}
						maxCount={1}
						onChange={
							async (cover) => {
								// console.log('我是修改图片的val',val)
								const { fileList} = cover;
								setShowCover([...fileList])
								for(const item of fileList){
									if(item.response){
										setGetphoto(item.response.url)
									}
								}
							}
						}
					>
						{'+ 场馆封面'}
					</Upload>
				</ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="md"
            name="courtid"
            label="所属场馆"
            disabled
            tooltip="最长为 24 位"
            placeholder="请输入场馆名称"
          />
          <ProFormText width="md" name="site" label="场地编号" tooltip="最长为 24 位" disabled/>
        </ProForm.Group>
        <ProForm.Group>
          {/* <ProFormText width="md" name="merchant" label="所属商家" placeholder="请输入商家名称" /> */}
          <ProFormText width="md" name="plan" label="场地价格" placeholder="请输入价格" />
          <ProFormSelect
            width="md"
            name="siteType"
            label="场地类型"
            placeholder="请选择场地类型"
            options={jobType1}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText width="md" name="siteNum" label="场地号" placeholder="请输入场地号" />
          <ProFormSelect
            width="md"
            name="type"
            label="场地状态"
            placeholder="请选择场地状态"
            options={jobType}
          />
        </ProForm.Group>

      </ModalForm>

      <ModalForm
        title="排场"
        width={1100}
        //弹窗是否打开
        visible={showPai}
        //通过 formRef 获取到表单实例的引用，通过引用可以调用表单方法实现表单重置，设置表单，获取表单值等功能
        formRef={editFrom}
        //取消窗口时触发
        modalProps={{onCancel: () => setShowPai(false)}}
        //弹窗刷新
        onVisibleChange={() => {
          actionRef.current.reload();
        }}

        onFinish={async (values) => {

          console.log('价格',planList);

          const result = await arrange({
            courtid:current.courtid,
            siteNum:current.siteNum,
            plan: JSON.stringify(planList)
          });
          const { success,info} = result;
          if (success) {
            message.success(info);
            return true;
          }else {
            message.success(info);
            return false
          }
        }}

      >
        <div className={styles.paichang}>
          {/*手动排场*/}
          <div className={styles.pTop}>
            <div className={styles.pTime}>
              { pTime.map((r,index) => <div key={index} className={ index%2 === 0 ? styles.tItem:styles.tItem1}>{r}</div> ) }
            </div>
            <div className={styles.pRight}>
              { week.map((r,index) =>(
                <div className={styles.rwcol} key={index}>
                  <div  className={styles.colhd}>  {r} </div>
                  {/* 每个时间时间段的 表单*/}
                  { planList[index]?.children?.map((col,idx)=>(
                    <div className={styles.rItem} key={idx}>
                      <div className={styles.rtype}>
                        <div className={styles.tText}>全时段</div>
                        <input
                          className={styles.price}
                          value={col.fullFee}
                          type="text"
                          onChange={(r)=>{
                            let _pblist = {...planList}
                            _pblist[index].children[idx].fullFee  = r.target.value;
                            setPlanList(_pblist)
                          }}
                        />
                      </div>
                      <div className={styles.rtype}>
                        <div className={styles.tText}>半小时</div>
                        <input className={styles.price}
                               name={`price${index}`}
                               value={col.halfFee}
                               onChange={(r)=>{
                                 let _pblist = {...planList}
                                 _pblist[index].children[idx].halfFee  = r.target.value;
                                 setPlanList(_pblist)
                               }}
                               type="text"/>
                      </div>
                    </div>
                  )) }
                </div>
              )) }

            </div>
          </div>
          {/*快捷排场*/}
          <div className={styles.pBottom}>
            <h1 className={styles.pTitle}>快速排场</h1>
            <div className={styles.pbItem} >
              <div>时间段：</div>
              <ProFormSelect width={100} name="type2"  placeholder="请选择时间" options={pTime2} />
              <div>--</div>
              <ProFormSelect width={100} name="type3"  placeholder="请选择时间" options={pTime2} />
            </div>
            <div className={styles.pbItem}>
              <div>价格：</div>
              <ProForm
                submitter={false}
                onValuesChange={(changeValues) => fullTime(changeValues.sPrice)}
              >
                <ProFormText width={100} name='sPrice' label="全时段" placeholder="请输入价格"  />
              </ProForm>
              <ProForm
                submitter={false}
                onValuesChange={(changeValues) => fullTime1(changeValues.sPrice1)}
              >
                <ProFormText width={100} name='sPrice1' label="半小时" placeholder="请输入价格" />
              </ProForm>

            </div>
          </div>
        </div>
      </ModalForm>

      <ModalForm
        title="特殊排场"
        width={1110}
        //弹窗是否打开
        visible={showSpecial}
        //通过 formRef 获取到表单实例的引用，通过引用可以调用表单方法实现表单重置，设置表单，获取表单值等功能
        formRef={editFrom}
        //取消窗口时触发
        modalProps={{onCancel: () => setShowSpecial(false)}}
        //弹窗刷新
        onVisibleChange={() => {
          actionRef.current.reload();
        }}

        onFinish={async (values) => {

          // console.log('价格',splanList);

          const res = await planCreate( {
            siteid:current.courtid,
            plan: JSON.stringify(splanList),
            time: specialTime,
            planNum:current.siteNum,
          });

          const { success,info} = res;
          if (success) {
            message.success(info);
            console.log('info',info)
            return true;
          }else {

            message.success(info);
            console.log('info',info)
            return false
          }
        }}

      >
        <Tabs defaultActiveKey="1"
              onTabClick={ async ()=>{
                const res = await planFindAll( {
                  siteid:current.courtid,
                  planNum:current.siteNum,
                });

                const { success,info,data} = res;
                if (success) {
                  data.sort(function (a,b){
                    const ab = a.time.replace(/\-/g, "");
                    const ba = b.time.replace(/\-/g, "");
                    return ab - ba
                  })
                  console.log('我是aaa啊',data)
                  setSpecialList(data)
                  return true;
                }else {
                  message.success(info);
                  console.log('info',info)
                  return false
                }
              }}
        >
          <TabPane tab="添加排场" key="1">
            <div className={styles.paichang}>
              {/*选择日期*/}
              <div className={styles.pBottom}>
                <h1 className={styles.pTitle}>日期</h1>
                <DatePicker onChange={onChange} />
              </div>
              {/*添加场馆*/}
              <div className={styles.pTop1}>
                <div className={styles.pPrice1}>
                  {/* 每个时间时间段的 表单*/}
                  { pTime.map((col,idx)=>(
                    <div className={styles.spTime} key={idx}>
                      <div className={ idx%2 === 0 ? styles.sItem:styles.sItem1}>{col}</div>
                      <div className={styles.rItem} >
                        <div className={styles.rtype}>
                          <div className={styles.tText}>全时段</div>
                          <input
                            className={styles.price}
                            value={col.fullFee}
                            type="text"
                            onChange={(r)=>{
                              let _pblist = splanList
                              _pblist[idx].fullFee  = r.target.value;
                              setSplanList(_pblist)
                            }}
                          />
                        </div>
                        <div className={styles.rtype}>
                          <div className={styles.tText}>半小时</div>
                          <input className={styles.price}
                                 name={`price${idx}`}
                                 value={col.halfFee}
                                 onChange={(r)=>{
                                   let _pblist = splanList
                                   _pblist[idx].halfFee  = r.target.value;
                                   setSplanList(_pblist)
                                 }}
                                 type="text"/>
                        </div>
                      </div>
                    </div>
                  )) }
                </div>
              </div>

            </div>


          </TabPane>
          <TabPane tab="管理排场" key="2">
            <div className={styles.delete}>
              <Popconfirm
                placement="topRight"
                title={'你确认要删除吗？'}
                onConfirm={async ()=>{
                  const resTow = await deletePlan( {
                    select: color,
                  })
                  //拿接口返回来的状态(success)值true或者false
                  const { success } = resTow;
                  if (success) {
                    message.success('删除成功');

                    return true;
                  } else {
                    message.success('删除失败');
                    return false
                  }
                }}
                okText="Yes"
                cancelText="No"
              >
                <Button className={styles.shanchu}>删除</Button>
              </Popconfirm>
            </div>
            <div className={styles.special}>

              {/*顶部时间段0-24*/}
              <div className={styles.sTop}>
                <div className={styles.date}>日期</div>
                { pTime.map((r,index) => <div key={index}  className={styles.stime}>{r}</div> ) }
              </div>
              {/*特殊排版主体*/}

              <div className={styles.sBottom}>
                { specialList.map((item,inx)=>
                  <div className={  color.includes(item) ? styles.iItem1:styles.iItem} onClick={()=>select(item)} key={inx} >
                    <div className={styles.date}>{item.time}</div>
                    { specialPrice[inx]?.map((r,index) =>
                      // <div key={index}  className={styles.stime}></div>
                      <div className={styles.rItem} key={index} >
                        <div className={styles.rtype}>
                          <div className={styles.tText}>全时段</div>
                          <div  className={styles.price}>￥{r.fullFee}</div>
                        </div>
                        <div className={styles.rtype}>
                          <div className={styles.tText}>半小时</div>
                          <div  className={styles.price}>￥{r.halfFee}</div>
                        </div>
                      </div>
                    ) }
                  </div>
                )}
              </div>

            </div>
          </TabPane>

        </Tabs>



      </ModalForm>


    </PageContainer>
  )

}

export default sort;
