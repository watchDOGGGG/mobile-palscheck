import React, { useState } from 'react'
import { Button,Form, Input, } from 'antd';
import { Select } from 'antd';

const { Option } = Select;
const { TextArea } = Input;
const localLink = 'http://localhost:4000'
const SeverLink = 'https://still-cover-backend.uc.r.appspot.com'
const FormIni = ()=>{
    const [form] = Form.useForm();
    const [error, setError] = useState()

    //submit form
    const onFinish = async(values) => {
        console.log('Received values of form: ', values);
        const createPage = await fetch(`${SeverLink}/Page/`,{
            method:'POST',
            headers:{"Content-Type":"application/json",token:localStorage.token},
            body: JSON.stringify({
                page_name:values.page_name,
                about:values.about,
                desc:values.desc,
            })
        })
        const response = await createPage.json()
        if(response.created){
            setError(response.created)
        }
      };

    return (
        
        <div>
            <div className="mb4 f-name">
                <span className="f5 b mb2">
                    Let thousands of people get connected with what you offer
                </span>
                <img alt="palscheck" className="br3" src={'https://www.techslize.com/wp-content/uploads/2018/03/online-stores-in-nigeria.jpg'}/>
            </div>
            <Form
            className="mt3 f-name"
                form={form}
                name="register"
                onFinish={onFinish}
                
            >
                <Form.Item
                    name="page_name"
                    label="Page Name"
                    rules={[{ required: true, message: 'Please chose a Page name!' }]}
                >

                    <Input />
                </Form.Item>                
                <Form.Item
                    name="desc"
                    label="Which best describe your page content"
                    rules={[{ required: true, message: 'select a description' }]}
                >

                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Select a description"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="fashion" className="ttc">fashion</Option>
                        <Option value="music" className="ttc">music</Option>
                        <Option value="marketing" className="ttc">marketing</Option>
                        <Option value="video" className="ttc">video</Option>
                        <Option value="collaboration" className="ttc">Collaboration</Option>
                        <Option value="general" className="ttc">General</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="about"
                    label="About"
                    rules={[{ required: true, message: 'About the content of your business page' }]}
                >

                    <TextArea rows={4} />
                </Form.Item>

                <Button type="primary" htmlType="submit" className="w-100">
                    Register
        </Button>
            </Form>
        </div>
    )
}
export default FormIni