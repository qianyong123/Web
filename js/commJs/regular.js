

const chinese=/^[\u4e00-\u9fa5]*$/ //中文
const number=/^[0-9]{4,16}$///全数字
const number2=/^([1-9]|1\d|20)$/  //1到20的正则
const letterNumber=/^[Y][W][0-9]{8}$///犬牌号字母数字
const azNumber=/^[\w]{1,20}$///字母数字
const username=/^[\w]{4,20}$/ //用户名
const password=/^[\w]{6,20}$/ //密码
const phone=/^1[3456789]\d{9}$/ //手机号码
const certificate = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)///身份证
export function regular(type,val,msg){
    switch(type){
        case 'chinese':
            if(!chinese.test(val)){           
                alert('输入有误')
                return false
            }else{              
               return true        
            }
            break;
        case 'number':
            if(!number.test(val)){           
                alert('输入有误')
                return false
            }else{              
               return true        
            }
            break;
        case 'number2':
            if(!number2.test(val)){           
                alert('输入有误')
                return false
            }else{              
               return true        
            }
            break;
         case 'letterNumber':
            if(!letterNumber.test(val)){           
                alert('输入有误')
                return false
            }else{              
               return true        
            }
            break;
        case 'password':
            if(!password.test(val)){           
                alert('输入有误')
                return false
            }else{              
               return true        
            }
            break;
        case 'username':
            if(!username.test(val)){           
                alert('输入有误')
                return false
            }else{              
               return true        
            }
            break;
        case 'phone':
            if(!phone.test(val)){           
                alert('输入有误')
                return false
            }else{              
               return true        
            }
            break;
        case 'azNumber':
            if(!azNumber.test(val)){           
                alert('输入有误')
                return false
            }else{              
               return true        
            }
            break;
        case 'certificate':
            if(!certificate.test(val)){           
                alert('输入有误')
                return false
            }else{              
               return true        
            }
            break;
    }
   

}
