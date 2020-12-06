<template>
  <div id='login'>
      <div class="login-wrap">
        <ul class='menu-tab'>
          <li :class="{'current':item.current}" v-for='(item,index) in menuTab' :key='index' @click="toggleMenu(item)">{{item.txt}}</li>
        </ul>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="login-form" size="medium">
            <el-form-item prop="username" class="form-item">
              <label for="username"> 邮箱</label>
            <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
            <el-form-item prop="password" class="form-item">
              <label for="password"> 密码</label>
            <el-input id="password" type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item v-show='mode =="register"' prop="password1" class="form-item">
              <label for="password1"> 再次输入密码</label>
            <el-input id="password1" type="password" v-model="ruleForm.password1" autocomplete="off"></el-input>
          </el-form-item>
            <el-form-item prop="code" class="form-item">
              <label for="code">验证码</label>
            <el-row :gutter="10">
              <el-col :span="15">
                <el-input id="code" v-model="ruleForm.code"></el-input>
              </el-col>
              <el-col :span="9">
                <el-button type="success" class="block">获取验证码  </el-button>
              </el-col>
            </el-row>
          </el-form-item>
            <el-form-item>
            <el-button type="danger" class="block top" @click="submitForm('ruleForm')">{{this.mode=='login'?'登录':'注册'}}</el-button>
          </el-form-item>
        </el-form>
      </div>
  </div>
</template>
<script>
import validateUtils from '@/utils/validate.js';
export default {
  data(){
    //验证验证码
    var validateCode = (rule, value, callback) => {
        //过滤非法字符
        this.ruleForm.code = value = validateUtils.validate_inputValue(value,'code')
        if (!value) {
             return callback(new Error('不能为空'));
          }else if(validateUtils.test_code(value)){
              callback(new Error('格式不正确'));
            }else{
              callback()
            }
        };
    //验证邮箱
    var validateUsername = (rule, value, callback) => {
        //过滤非法字符
        this.ruleForm.username = value = validateUtils.validate_inputValue(value,'email');
        if (value === '') {
          callback(new Error('请输入邮箱'));
        } else if(validateUtils.test_email(value) ){
          callback(new Error('邮箱格式错误'));
        } else {
          callback();
        }
      };
    //验证密码
    var validatePassword = (rule, value, callback) => {
        //过滤非法字符
        this.ruleForm.password = value = validateUtils.validate_inputValue(value,'password');
        
        //验证的字段 输入的值 验证后做什么（回调函数）
        if (value === '') {
          callback(new Error('不能为空'));
        } else if (validateUtils.test_password(value) ){
          callback(new Error('密码6-20位!'));
        } else {
          callback()
        }
      };
    //验证重复密码
    var validatePassword1 = (rule, value, callback) => {
        if(this.mode =='login'){
          callback()
          return
        }
        //过滤非法字符
        this.ruleForm.password1 = value = validateUtils.validate_inputValue(value,'password1');
        
        //验证的字段 输入的值 验证后做什么（回调函数）
        // if (value === '') {
        //   callback(new Error('不能为空'));
        // } else if (validateUtils.test_password(value) ){
        //   callback(new Error('密码6-20位!'));
        // } else 
        if( value !==this.ruleForm.password){
          callback(new Error('密码不一致!'));
        }else{
          callback()
        }
      };

    return {
        mode:'login',
        menuTab:[
          {txt:'登录',current:true,type:'login'},
          {txt:'注册',current:false,type:'register'}
        ],
        ruleForm: {
          username: '',
          password: '',
          password1: '',
          code: ''
        },
        rules: {
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          code: [
            { validator: validateCode, trigger: 'blur' }
          ]
        },
        
    }
  },

  methods:{
    toggleMenu(item){
      //item.current
      this.menuTab.map(item => item.current = false)
      item.current = true
      this.mode = item.type
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }


</script>
<style lang="scss" scoped>
#login{
  height: 100%; //基于浏览器的可视区域处理的
  margin-top: 120px;
  background-color:rgb(70, 73, 73);
}
.login-wrap{
  width: 330px;
  margin:0px auto;
  
}
.menu-tab{
  text-align:center;
  margin: 0px auto;
  li{
    display: inline-block;
    width: 88px;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
  }
  .current{
    background-color: rgba(0,0,0,0.2);
  }
}
.login-form{
  margin: 0px auto;
  label{
    display:block;
    color: #fff;
    font-size: 14px;
    margin-bottom: 5px;
  }
  .form-item{
    margin-bottom: 13px;
  }
  .top{
    margin-top:30px;
  }
  .block{
    display: block;
    width: 100%;
  }
}
</style>