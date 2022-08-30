function bigNum(look){
    var num=[0,0];
    if(isNaN(look-0)||String(look).indexOf("e")!=-1){
        if(typeof(look)=="boolean"){
            num[0]=look-0;
            num[1]=0;
        }else if(look.indexOf("e")==-1){//no e
            num[0]=look-0;
            num[1]=0;
        } else{ // one e if(indexOf("e")==lastIndexOf("e"))
            if(look[0]!="e"){
                num[0]=look.slice(0,look.indexOf("e"))-0;
                num[1]=look.slice(look.indexOf("e")+1,look.length)-0;
            }else{
                num[0]=1;
                num[1]=look.slice(look.indexOf("e")+1,look.length)-0;
            }
            
        }
    }else{
        num[0]=look-0;
        num[1]=0;
    }
    
    return num;
}
function tiaoZ(num,sn){
    var look="";
    var isDown=false;
    while(!isDown){//10e5 to 1e6
        isDown=true;
        if(num[0]==0) num[1]=0;
        else if(num[1]<1000000){
            if(num[0]>0){
                if(num[0]>=10){
                    num[0]/=10;num[1]++;isDown=false;
                }
                if(num[0]<1){
                    num[0]*=10;num[1]--;isDown=false;
                }
            }else{
                if(-num[0]>=10){
                    num[0]/=10;num[1]++;isDown=false;
                }
                if(-num[0]<1){
                    num[0]*=10;num[1]--;isDown=false;
                }
            }
        }
    }
    if(num[1]<1000000){
        if(num[1]>=3||-num[1]>=3){//1.23237e3 to 1.232e3
            look+=num[0].toFixed(sn);
            look+="e";
            look+=num[1]; 
        }else{
            if(num[0]*10**num[1]%1==0){
                look=num[0]*10**num[1];
            }else{
                look=(num[0]*10**num[1]).toFixed(sn);
            }
        }
    }else{
        let s=0;
        for(var i=0;num[1]>10;i++){
            s++;
            num[1]/=10;
        }
        look="e"+num[1].toFixed(sn)+"e"+s;
    }
    return look;
}
function format(look,sn){
    var num1=[bigNum(look)[0],bigNum(look)[1]];
    return tiaoZ(num1,sn);
}
function add(a,b){
    var c=[],cLook="";
    var num1=[bigNum(a)[0],bigNum(a)[1]],num2=[bigNum(b)[0],bigNum(b)[1]];
    if(num1[1]>num2[1]&&num1[1]-num2[1]<300){
        while(num1[1]!=num2[1]){
            num1[0]*=10;num1[1]-=1;
        }
    }
    if(num1[1]<num2[1]&&num2[1]-num1[1]<300){
        while(num1[1]!=num2[1]){
            num2[0]*=10;num2[1]-=1;
        }
    }
    if(num1[1]>num2[1]){//|num1[1]-num2[1]|>300
        c[0]=num1[0];c[1]=num1[1];
    }else if(num1[1]<num2[1]){
        c[0]=num2[0];c[1]=num2[1];
    }else{
        c[0]=num1[0]+num2[0];c[1]=num1[1];
    }
    cLook=tiaoZ(c,3);
    return cLook;
}
function sub(a,b){
    b="-"+b;
    return add(a,b);
}
function mul(a,b){
    var c=[],cLook="";
    var num1=[bigNum(a)[0],bigNum(a)[1]],num2=[bigNum(b)[0],bigNum(b)[1]];
    c[0]=num1[0]*num2[0];
    c[1]=num1[1]+num2[1];
    cLook=tiaoZ(c,3);
    return cLook;
}
function div(a,b){
    var c=[],cLook="";
    var num1=[bigNum(a)[0],bigNum(a)[1]],num2=[bigNum(b)[0],bigNum(b)[1]];
    c[0]=num1[0]/num2[0];
    c[1]=num1[1]-num2[1];
    cLook=tiaoZ(c,3);
    return cLook;
}
function pow(a,b){
    var c=[],cLook="";
    var num1=[bigNum(a)[0],bigNum(a)[1]],num2=[bigNum(b)[0],bigNum(b)[1]];
    num1[1]+=Math.log(num1[0])/Math.log(10);
    num2[1]+=Math.log(num2[0])/Math.log(10);
    num1[1]*=10**num2[1];
    c[0]=10**(num1[1]%1),c[1]=num1[1]-num1[1]%1;
    cLook=tiaoZ(c,3);
    return cLook;
}
function root(a,b){
    var c=[],cLook="";
    var num1=[bigNum(a)[0],bigNum(a)[1]],num2=[bigNum(b)[0],bigNum(b)[1]];
    num1[1]+=Math.log(num1[0])/Math.log(10);
    num2[1]+=Math.log(num2[0])/Math.log(10);
    num1[1]/=10**num2[1];
    c[0]=10**(num1[1]%1),c[1]=num1[1]-num1[1]%1;
    cLook=tiaoZ(c,3);
    return cLook;
}
function log10(a){
    var c=[],cLook="";
    var num1=[bigNum(a)[0],bigNum(a)[1]];
    num1[1]+=Math.log(num1[0])/Math.log(10);
    c[0]=num1[1];
    c[1]=0;
    cLook=tiaoZ(c,3);
    return cLook;
}
function gte(a,b){
    var num1=[bigNum(a)[0],bigNum(a)[1]],num2=[bigNum(b)[0],bigNum(b)[1]];
    var bo=false;
    if(num1[1]>num2[1]) bo=true;
    if(num1[1]==num2[1])
        if(num1[0]>=num2[0]) bo=true;
    return bo;
}
function lte(a,b){
    var num1=[bigNum(a)[0],bigNum(a)[1]],num2=[bigNum(b)[0],bigNum(b)[1]];
    var bo=false;
    if(num1[1]<num2[1]) bo=true;
    if(num1[1]==num2[1])
        if(num1[0]<=num2[0]) bo=true;
    return bo;
}
function gt(a,b){
    return !lte(a,b);
}
function lt(a,b){
    return !gte(a,b);
}
function eq(a,b){
    var num1=[bigNum(a)[0],bigNum(a)[1]],num2=[bigNum(b)[0],bigNum(b)[1]];
    if(num1[1]==num2[1]&&num1[2]==num2[2]) return true;
}
function floor(a){
    var c=[],cLook="";
    var num1=[bigNum(a)[0],bigNum(a)[1]];
    if(log10(a)<=10){
        c[0]=num1[0]*10**num1[1];
        c[0]-=c[0]%1;
        c[1]=0;
    }
    cLook=tiaoZ(c,3);
    return cLook;
}