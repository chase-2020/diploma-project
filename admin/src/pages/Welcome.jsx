import { React, useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Input , Popover, Tabs, Checkbox, Row, Col, Select,Radio, Form, Button,message,Space  } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import styles from './Welcome.less';
import axios from 'axios';
import { history } from 'umi';

import ProForm, {
  ModalForm,
  ProFormText,
  ProFormSelect,
  DrawerForm,
  ProFormDateTimePicker,
} from '@ant-design/pro-form';
import Field from '@ant-design/pro-field';
import {findSort,updateSort,createSort,destroySort,findMorder} from '@/services/ant-design-pro/api'
// import { indexOf } from '@umijs/deps/compiled/lodash';

export default () => {
  const [allArrList, setAllArrList] = useState([]);
  // 弹出状态，默认隐藏窗口false
  const [showEditModal, setShowEditModal] = useState(false);
  const { Option } = Select;
  const [visible,setVisible] = useState(false)
  
  //导航栏过滤
  const [siteType,setSiteType] = useState([])
  const [siteState,setSiteState] = useState([])

  const [typeArr,setTypeArr] = useState([])
  const [typeIndex,setTypeIndex] = useState([])
  const [changdi,setChangdi] = useState(['篮球', '排球', '足球', '网球', '羽毛球', '乒乓球', '游泳'])
  const zm = ['B','C','D','E','F','G','H']
  const { TabPane } = Tabs;

  const getOrderList = async ()=>{
    const res2 = await findMorder({
    });
    console.log("res2--=-=====",res2)
  }
  const storage = window.localStorage;
  const getSiteList = async ()=>{
    const _res = await axios.post('http://127.0.0.1:7001/admin/site/find',{
      qiulei: siteType,
      zhuangtai: siteState,
      mid: storage.mid
    });
    const { success, res } = _res.data;
    console.log('_res', _res);
    const { rows } = res;
    console.log('rows', rows);
    let tI = []
    let allArr = [];
    let arr = [];
    let tArr = [];
    // 场地类型（1:篮球,2:排球,3:足球,4:网球,5:羽毛球,6:乒乓球,7:游泳）
    for (let ii = 1; ii <= 7; ii++) {
      arr = [];
      for (const rowItem of rows) {
        // console.log(rowItem);
        if (rowItem.siteType === ii.toString()) {
          arr.push(rowItem);
          tI.push(rowItem.siteType)
        }
      }

      if(arr.length!==0){
        
        tArr.push(changdi[ii - 1])
        allArr.push({
          title: changdi[ii - 1],
          children: arr,
        });
      }
      if(siteType.length===0){
        setTypeArr(tArr)
        setTypeIndex(tI)
      }
    }
    console.log('allArr==-=-=-=-', allArr);
    setAllArrList(allArr);
  }

  useEffect(() => {
    (async () => {
      await getOrderList();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await getSiteList();
    })();
    console.log(siteType)
    console.log(siteState)
  }, [siteType,siteState]);

  function callback(key) {
    console.log(key);
  }

  const handleChange = (value, checked)=>{
    let newArr = [...siteType];
    if(typeof value === 'number') value = value + ''
    if(checked) {
      newArr.push(value);
      if(value=='A'){
        newArr= []
      }
    }
    else {
      // 取消勾
      newArr.splice(newArr.indexOf(value),1)
    }
    
    setSiteType(newArr); 
  }

  const handleChange1 = (value, checked)=>{
    const newArr1 = [...siteState];
    if(checked) {
      newArr1.push(value);
    }
    else {
      // 取消勾
      newArr1.splice(newArr1.indexOf(value),1)
    }
    setSiteState(newArr1); 
  }

  // const { Option } = Select;
  // function handleChange(value) {
  //   console.log(`selected ${value}`);
  // }

  // const [siteNum11,setsiteNum11] = useState(props.siteNu)

  const Content1 = (props) => {
    const { title1, siteNum, type, val, idIndex,getSiteList } = props;
    // console.log('======woshi content1',props);
    // const onFinish = (values) => {
    //   console.log('Success:', values);
    // };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    return (
      <Form
          className={styles.content1}
          name="basic"
          labelCol={{ span: 8 }}
          layout="horizontal"
          wrapperCol={{ span: 16 }}
          // initialValues={{ remember: true }}
          // onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={val}
          autoComplete="off"
          onFinish = {async(va)=>{
                  console.log("修改的数据",va)
                  setVisible(false)
                  const res1 = await updateSort({
                    merchant: va.merchant,
                    site: va.site,
                    siteType: va.siteType,
                    price:va.price,
                    siteNum: va.siteNum,
                    type: va.type,
                    courtid: va.courtid,
                    plan: va.plan,
                  });
                  const { success } = res1;
                  if (success) {
                    getSiteList()
                    message.success('提交成功');

                    // console.log("res1",res1)
                    // console.log('$$$$$$$$$已点击div：',idIndex);
                    let div = document.getElementById(idIndex);
                    if(div) div.click();
                    
                    
                    return true;
                  } else {
                    message.success('提交失败');
                    return false;
                  }
          }}

          
    >
        <Form.Item
          label="场地编号"
          name="site"
          rules={[{ required: true, message: '请输入场地编号' }]}
        >
          {/* <Input.Password /> */}
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="所属场馆"
          name="courtid"
          rules={[{ required: true, message: '请选择' }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="场地号"
          name="siteNum"
          rules={[{ required: true, message: '请输入场地号' }]}
        >
        <Input />
        </Form.Item>

        <Form.Item label="场地类型" name="siteType">
            <Select defaultValue={props.title1} style={{ width: 266 }}>
                <Option value="1">篮球</Option>
                <Option value="2">排球</Option>
                <Option value="3">足球</Option>
                <Option value="4">网球</Option>
                <Option value="5">羽毛球</Option>
                <Option value="6">乒乓球</Option>
                <Option value="7">游泳</Option>
            </Select>
        </Form.Item>

        <Form.Item label="场地状态" name="type">
            <Select defaultValue={props.type} style={{ width: 266 }}>
                <Option value="0">可预定</Option> 
                <Option value="1">使用中</Option> 
                <Option value="2">空闲(已被预定)</Option> 
            </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button  type="primary" htmlType="submit">
            确认修改
          </Button>
        </Form.Item>
    </Form>
    );
  }

  const PaneCt1  = ()=> {

    return (
      <>
            <Tabs tabPosition="left">
                     <TabPane tab="左1" key="1">1111</TabPane>
                     <TabPane tab="左2" key="2"> 2222</TabPane>
             </Tabs>
      </>
    )
  }

  const Ct = (props)=>{
    const { title, siteNum, type, content1Val, idIndex,getSiteList } = props;
    return (
      <>
            <Tabs >
                <TabPane tab="场地状态" key="1">
                        <Content title={title} siteNum={siteNum} />
                </TabPane>
                <TabPane tab="场地信息修改" key="2">
                        <Content1 val={content1Val} idIndex={idIndex} getSiteList={getSiteList}/>
                </TabPane>
                {/* <TabPane tab="排场" key="3">
                        <div>排场</div>
                </TabPane> */}
            </Tabs>

      </>
    )

  }


  const Content = (props) => {
    console.log('=-=-=-=-=====---', props);
    const { title, siteNum, type } = props;
    return (
      <div className={styles.content}>
              <Button type="primary" size="small" className={styles.paichang} onClick={()=>history.push("/sduser/sort")}>排场</Button>
              <div className={styles.aatop}>
                  <div className={styles.stnum}>{title}{siteNum}号场</div>
                  {/* <Popover visible={visible} placement="right" content={Content1({ ...props, title })} trigger="click" className={styles.xiugai}><button onClick={()=> setVisible(true)}>修改</button></Popover> */}
              </div>
              <div className={styles.aabt}>
                <Tabs defaultActiveKey="1" onChange={callback}>
                  <TabPane tab="周日" key="1" className={styles.aabox}>
                    <div className={styles.aabtx}>
                      <div className={styles.seven}>
                        <div className={styles.sa}>
                          <div className={styles.satop}>上午</div>
                          <div className={styles.sabt}>下午</div>
                        </div>
                        <div className={styles.sb}>
                          <div className={styles.sbtop}>
                            <div className={type === 0 ? styles.sbbox1 : type === 1 ? styles.sbbox2 : styles.sbbox}>9:00-10:00</div>
                            <div className={type === 0 ? styles.sbbox1 : type === 1 ? styles.sbbox2 : styles.sbbox}>10:00-11:00</div>
                            <div className={type === 0 ? styles.sbbox1 : type === 1 ? styles.sbbox2 : styles.sbbox}>11:00-12:00</div>
                          </div>
                          <div className={styles.sbbt}>
                            <div className={type === 0 ? styles.sbbox1 : type === 1 ? styles.sbbox2 : styles.sbbox}>14:00-15:00</div>
                            <div className={type === 0 ? styles.sbbox1 : type === 1 ? styles.sbbox2 : styles.sbbox}>15:00-16:00</div>
                            <div className={type === 0 ? styles.sbbox1 : type === 1 ? styles.sbbox2 : styles.sbbox}>16:00-17:00</div>
                            <div className={type === 0 ? styles.sbbox1 : type === 1 ? styles.sbbox2 : styles.sbbox}>17:00-18:00</div>
                            <div className={type === 0 ? styles.sbbox1 : type === 1 ? styles.sbbox2 : styles.sbbox}>18:00-19:00</div>
                            <div className={type === 0 ? styles.sbbox1 : type === 1 ? styles.sbbox2 : styles.sbbox}>19:00-20:00</div>
                            <div className={type === 0 ? styles.sbbox1 : type === 1 ? styles.sbbox2 : styles.sbbox}>20:00-21:00</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tab="周一" key="2" className={styles.aabox}>
                    <div className={styles.aabtx}>
                      <div className={styles.seven}>
                        <div className={styles.sa}>
                          <div className={styles.satop}>上午</div>
                          <div className={styles.sabt}>下午</div>
                        </div>
                        <div className={styles.sb}>
                          <div className={styles.sbtop}>
                            <div className={styles.sbbox}>9:00-10:00</div>
                            <div className={styles.sbbox}>10:00-11:00</div>
                            <div className={styles.sbbox}>666666666</div>
                          </div>
                          <div className={styles.sbbt}>
                            <div className={styles.sbbox}>14:00-15:00</div>
                            <div className={styles.sbbox}>15:00-16:00</div>
                            <div className={styles.sbbox}>16:00-17:00</div>
                            <div className={styles.sbbox}>17:00-18:00</div>
                            <div className={styles.sbbox}>18:00-19:00</div>
                            <div className={styles.sbbox}>19:00-20:00</div>
                            <div className={styles.sbbox}>20:00-21:00</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tab="周二" key="3" className={styles.aabox}>
                    <div className={styles.aabtx}>
                      <div className={styles.seven}>
                        <div className={styles.sa}>
                          <div className={styles.satop}>上午</div>
                          <div className={styles.sabt}>下午</div>
                        </div>
                        <div className={styles.sb}>
                          <div className={styles.sbtop}>
                            <div className={styles.sbbox}>9:00-10:00</div>
                            <div className={styles.sbbox}>10:00-11:00</div>
                            <div className={styles.sbbox}>777777777</div>
                          </div>
                          <div className={styles.sbbt}>
                            <div className={styles.sbbox}>14:00-15:00</div>
                            <div className={styles.sbbox}>15:00-16:00</div>
                            <div className={styles.sbbox}>16:00-17:00</div>
                            <div className={styles.sbbox}>17:00-18:00</div>
                            <div className={styles.sbbox}>18:00-19:00</div>
                            <div className={styles.sbbox}>19:00-20:00</div>
                            <div className={styles.sbbox}>20:00-21:00</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tab="周三" key="4" className={styles.aabox}>
                    <div className={styles.aabtx}>
                      <div className={styles.seven}>
                        <div className={styles.sa}>
                          <div className={styles.satop}>上午</div>
                          <div className={styles.sabt}>下午</div>
                        </div>
                        <div className={styles.sb}>
                          <div className={styles.sbtop}>
                            <div className={styles.sbbox}>9:00-10:00</div>
                            <div className={styles.sbbox}>10:00-11:00</div>
                            <div className={styles.sbbox}>8888888888</div>
                          </div>
                          <div className={styles.sbbt}>
                            <div className={styles.sbbox}>14:00-15:00</div>
                            <div className={styles.sbbox}>15:00-16:00</div>
                            <div className={styles.sbbox}>16:00-17:00</div>
                            <div className={styles.sbbox}>17:00-18:00</div>
                            <div className={styles.sbbox}>18:00-19:00</div>
                            <div className={styles.sbbox}>19:00-20:00</div>
                            <div className={styles.sbbox}>20:00-21:00</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tab="周四" key="5" className={styles.aabox}>
                    <div className={styles.aabtx}>
                      <div className={styles.seven}>
                        <div className={styles.sa}>
                          <div className={styles.satop}>上午</div>
                          <div className={styles.sabt}>下午</div>
                        </div>
                        <div className={styles.sb}>
                          <div className={styles.sbtop}>
                            <div className={styles.sbbox}>9:00-10:00</div>
                            <div className={styles.sbbox}>10:00-11:00</div>
                            <div className={styles.sbbox}>999999999</div>
                          </div>
                          <div className={styles.sbbt}>
                            <div className={styles.sbbox}>14:00-15:00</div>
                            <div className={styles.sbbox}>15:00-16:00</div>
                            <div className={styles.sbbox}>16:00-17:00</div>
                            <div className={styles.sbbox}>17:00-18:00</div>
                            <div className={styles.sbbox}>18:00-19:00</div>
                            <div className={styles.sbbox}>19:00-20:00</div>
                            <div className={styles.sbbox}>20:00-21:00</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tab="周五" key="6" className={styles.aabox}>
                    <div className={styles.aabtx}>
                      <div className={styles.seven}>
                        <div className={styles.sa}>
                          <div className={styles.satop}>上午</div>
                          <div className={styles.sabt}>下午</div>
                        </div>
                        <div className={styles.sb}>
                          <div className={styles.sbtop}>
                            <div className={styles.sbbox}>9:00-10:00</div>
                            <div className={styles.sbbox}>10:00-11:00</div>
                            <div className={styles.sbbox}>101010101010</div>
                          </div>
                          <div className={styles.sbbt}>
                            <div className={styles.sbbox}>14:00-15:00</div>
                            <div className={styles.sbbox}>15:00-16:00</div>
                            <div className={styles.sbbox}>16:00-17:00</div>
                            <div className={styles.sbbox}>17:00-18:00</div>
                            <div className={styles.sbbox}>18:00-19:00</div>
                            <div className={styles.sbbox}>19:00-20:00</div>
                            <div className={styles.sbbox}>20:00-21:00</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tab="周六" key="7" className={styles.aabox}>
                    <div className={styles.aabtx}>
                      <div className={styles.seven}>
                        <div className={styles.sa}>
                          <div className={styles.satop}>上午</div>
                          <div className={styles.sabt}>下午</div>
                        </div>
                        <div className={styles.sb}>
                          <div className={styles.sbtop}>
                            <div className={styles.sbbox}>9:00-10:00</div>
                            <div className={styles.sbbox}>10:00-11:00</div>
                            <div className={styles.sbbox}>111111111111</div>
                          </div>
                          <div className={styles.sbbt}>
                            <div className={styles.sbbox}>14:00-15:00</div>
                            <div className={styles.sbbox}>15:00-16:00</div>
                            <div className={styles.sbbox}>16:00-17:00</div>
                            <div className={styles.sbbox}>17:00-18:00</div>
                            <div className={styles.sbbox}>18:00-19:00</div>
                            <div className={styles.sbbox}>19:00-20:00</div>
                            <div className={styles.sbbox}>20:00-21:00</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPane>
                </Tabs>
              </div>
      </div>
    );
  };
  function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
  }

  // 没被用到
  const plainOptions = ['全部', '篮球', '足球',"排球","网球","羽毛球","乒乓球","游泳"];
  const plainOptions1 = ['全部', '可预定', '使用中',"空闲(已被预定)"];

  return (


      <div className={styles.zong}>
          <div className={styles.head}>
              <div className={styles.hd1}>
                <div className={styles.hd1top}>场地类型</div>
                <div className={styles.hd1bt}>
                    <Row>
                      <Col span={8} className={styles.box}>
                        {/* target--checked */}
                        <Checkbox value='A' defaultChecked={true} onChange={(ev)=>{
                                handleChange('A',ev.target.checked)
                              }}>
                                全部
                        </Checkbox>
                      </Col>
                      {typeArr.map((r,index)=>{
                          return (
                            <Col span={8} className={styles.box} key={index}>
                              <Checkbox value={zm[zm.indexOf(r)+1]} onChange={(ev)=>{
                                handleChange(changdi.indexOf(r)+1,ev.target.checked)
                              }}>{r}</Checkbox>
                            </Col>
                          )
                      })}
                    </Row>
                </div>
              </div>
              <div className={styles.hd2}>
            <div className={styles.hd1top}>场地状态</div>
            <div className={styles.hd1bt}>
                    <Row>
                      <Col span={8} className={styles.box}>
                        <Checkbox value="A" defaultChecked={true} onChange={(ev)=>{console.log(ev)}}>全部</Checkbox>
                      </Col>
                      <Col span={8} className={styles.box}>
                        <Checkbox value="B" onChange={(ev)=>{handleChange1(0,ev.target.checked)}}>可预定</Checkbox>
                      </Col>
                      <Col span={8} className={styles.box}>
                        <Checkbox value="C" onChange={(ev)=>{handleChange1(1,ev.target.checked)}}>使用中</Checkbox>
                      </Col>
                      <Col span={8} className={styles.box}>
                        <Checkbox value="D" onChange={(ev)=>{handleChange1(2,ev.target.checked)}}>空闲(已被预定)</Checkbox>
                      </Col>
                    </Row>
            </div>
          </div>
          </div>
          <div className={styles.main}>
            {allArrList?.map((rr, index) => {
              return (
                <div className={styles.main1} key={index}>
                      <div className={styles.mtop}>{rr.title}</div>
                      <div className={styles.mbt}>
                            {rr.children.map((r, rIndex) => {
                              return (
                                <Popover autoAdjustOverflow
                                  placement="bottom"
                                  // content={Content({ ...r, title: rr.title })}
                                  content={<Ct title={rr.title} siteNum={r.siteNum} content1Val={{...r}} idIndex={`site_${rIndex}_${index}`} getSiteList={getSiteList}/>}
                                  trigger="click"
                                  // visible={visible}
                                  key={rIndex}
                                >
                                      <div
                                        className=
                                        {r.type === '0' ? styles.mbtbox : r.type === '1' ? styles.mbtbox1 : styles.mbtbox2}
                                        id={`site_${rIndex}_${index}`}
                                      >
                                            <div className={styles.abox1}>{r.siteNum}</div>
                                            <div className={styles.abox2}>
                                                  {r.type == '0' ? '可预定' : r.type == 1 ? '使用中' : '空闲(已被预定)'}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
                                            </div>
                                      </div>
                                </Popover>
                              );
                            })}
                      </div>
                </div>
              );
            })}
          </div>
      </div>



  );
};
